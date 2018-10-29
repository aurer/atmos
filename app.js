const express = require('express')
const path = require('path')
const config = require('./config.json')
const Sensor = require('./lib/sensor')
const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
	let data = config.mock ? await Sensor.mockValues() : await Sensor.getValues();
	res.render('index', {data});
})

module.exports = app;
