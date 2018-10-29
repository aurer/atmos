const fs = require('fs');

class Water {
	static async getTemperature() {
		let id = fs.readdirSync('/sys/bus/w1/devices').find(f => f.match(/^28/));
		if (!id) return 0;
		let reading = fs.readFileSync(`/sys/bus/w1/devices/${id}/w1_slave`).toString();
		let temp = reading.match(/t=([\d]+)/);
		if (!temp) return 0;
		return temp[1] / 1000;
	}

	static async mockTemperature() {
		return 20.00;
	}
}

module.exports = Water;