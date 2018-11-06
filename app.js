const express = require('express')
const path = require('path')
const cron = require('node-cron')
const config = require('./config.json')
const Sensor = require('./lib/sensor')
const DB = require('./lib/db')
const app = express()
const db = new DB(config)

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

// Run cron job
cron.schedule('*/15 * * * *', async () => {
	let data = config.mock ? await Sensor.mockValues() : await Sensor.getValues()
	db.query(`insert into readings (temperature,humidity,water,timestamp) values (${data.temperature}, ${data.humidity}, ${data.water}, now())`, (err, result, fields) => {
		console.log(`CRON: Record values - ${data.temperature}, ${data.humidity}, ${data.water}`)
	})
})

// Routes
app.get('/', async (req, res) => {
	let data = config.mock ? await Sensor.mockValues() : await Sensor.getValues()
	let query = `
		SELECT
			CONCAT(hour(timestamp), ':', minute(timestamp)) as time,
			temperature,
			humidity,
			water
		FROM readings
		WHERE
			timestamp BETWEEN DATE_SUB(NOW(), INTERVAL 12 HOUR) AND NOW()
		ORDER BY timestamp ASC;
	`;
	db.query(query, (err, readings) => {
		if (err) {
			console.log(err)
			res.render('charts', {data, readings:[]})
		}
		res.render('charts', {data, readings})
	})
})

module.exports = app
