const fs = require('fs');
const Water = require('./water');

class Sensor {
	static async getValues() {
		const dht = require('node-dht-sensor');
		return new Promise((resolve, reject) => {
			dht.read(22, 2, async (err, temp, hum) => {
				if (err) return reject(err);
				let water = await Water.getTemperature();
				resolve({
					temperature: temp.toFixed(1),
					humidity: hum.toFixed(1),
					water: water
				})
			})
		})
	}

	static async mockValues() {
		let temperature = randomInt(40, 60);
		let humidity = randomInt(40, 80);
		let water = randomInt(15, 23);
		return new Promise((resolve, reject) => {
			resolve({temperature, humidity, water})
		})
	}
}

function randomInt(min, max, precision=1) {
	return Number(Math.random()*(max-min+1)+min).toFixed(precision);
}

async function getWaterTemperature() {
	let files = await fs.readDir();
}

module.exports = Sensor;
