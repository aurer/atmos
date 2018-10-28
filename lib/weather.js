const request = require('request-promise');

const key = '672d41a6523540b14a7ac62232b62b31';
const cityId = '2654186';
const endpoint = 'https://samples.openweathermap.org/data/2.5/';

class Weather {
	static async get() {
		return request(`${endpoint}weather?id=${cityId}&appid=${key}`);
	}
}

module.exports = Weather;
