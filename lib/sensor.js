const sensor = require('node-dht-sensor');

class Sensor {
	static async getValues() {
		return new Promise((resolve, reject) => {
			sensor.read(22, 2, (err, temp, hum) => {
				if (err) return reject(err);
				resolve({
					temperature: temp.toFixed(1),
					humidity: hum.toFixed(1)
				})
			})
		})
	}
}

module.exports = Sensor;
