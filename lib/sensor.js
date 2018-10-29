class Sensor {
	static async getValues() {
		const dht = require('node-dht-sensor');
		return new Promise((resolve, reject) => {
			dht.read(22, 2, (err, temp, hum) => {
				if (err) return reject(err);
				resolve({
					temperature: temp.toFixed(1),
					humidity: hum.toFixed(1)
				})
			})
		})
	}

	static async mockValues() {
		let temperature = randomInt(40, 60);
		let humidity = randomInt(40, 80);
		return new Promise((resolve, reject) => {
			resolve({temperature, humidity})
		})
	}
}

function randomInt(min, max, precision=1) {
	return Number(Math.random()*(max-min+1)+min).toFixed(precision);
}

module.exports = Sensor;
