const express = require('express')
const path = require('path')
const cron = require('node-cron')
const config = require('./config.json')
const Sensor = require('./lib/sensor')
const Weather = require('./lib/weather')
const DB = require('./lib/db')
const app = express()
const db = new DB(config)

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

// Run cron job
cron.schedule('*/15 * * * *', async () => {
	let data = config.mock ? await Sensor.mockValues() : await Sensor.getValues();
	let weather = await Weather.getValues();
	weather = JSON.parse(weather);
	db.query(`insert into readings (temperature,humidity,water,weather_temperature, weather_humidity, timestamp) values (${data.temperature}, ${data.humidity}, ${data.water}, ${weather.current.temp_c}, ${weather.current.humidity}, now())`, (err, result) => {
		console.log(`CRON: Record values - ${data.temperature}, ${data.humidity}, ${data.water}, ${weather.current.temp_c}, ${weather.current.humidity},`)
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
			water,
			weather_temperature,
			weather_humidity
		FROM readings
		WHERE
			timestamp BETWEEN DATE_SUB(NOW(), INTERVAL 12 HOUR) AND NOW()
		ORDER BY timestamp ASC`;
	db.query(query, (err, readings) => {
		if (err) {
			console.log(err)
			res.render('charts', {data, readings:[]})
		}
		res.render('charts', {data, readings})
	})
})

module.exports = app
