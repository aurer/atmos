const express = require('express')
const fs = require('fs')
const path = require('path')
const sensor = require('./lib/sensor')
const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
	const sass = require('sass');
	let result = sass.renderSync({file: './assets/scss/main.scss'});
	fs.writeFile('./public/app.css', result.css);
	let data = await Sensor.getValues();
	res.render('index', {data});
})

module.exports = app;
