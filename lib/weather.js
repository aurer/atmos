const request = require('request-promise');
const endpoint = 'https://api.apixu.com/v1/current.json?key=333b732ec2314a45a09162013180811&q=Bury+St+Edmunds';

class Weather {
	static async getValues() {
		return request(endpoint);
	}
}

module.exports = Weather;
