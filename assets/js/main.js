const Modules = {
	init: function() {
		this.setModuleValues();
		this.renderChart();
		this.renderOutsideData();
	},

	setModuleValues: function() {
		let meters = document.querySelectorAll('.Meter-display');
		for(let i = 0; i < meters.length; i++) {
			let meter = meters[i];
			let display = meter.querySelector('.Meter-display-value');
			let value = Number(display.dataset.value);
			let radius = 47 * 2 * Math.PI;
			let pos = 100 - value;
			let offset = (radius / 100) * pos;

			display.setAttribute('stroke-dasharray', radius);
			display.setAttribute('stroke-dashoffset', offset);
		}
	},

	getChartData: function() {
		const chart = document.querySelector('#Chart');
		const data = {
			labels: chart.dataset.times.split(','),
			temperature: chart.dataset.temperature.split(','),
			humidity: chart.dataset.humidity.split(','),
			water: chart.dataset.water.split(',')
		}
		const mq = window.matchMedia( "(max-width: 800px)" );

		if (mq.matches) {
			data.labels = data.labels.slice(data.labels.length-20, data.labels.length)
			data.temperature = data.temperature.slice(data.temperature.length-20, data.temperature.length)
			data.humidity = data.humidity.slice(data.humidity.length-20, data.humidity.length)
			data.water = data.water.slice(data.water.length-20, data.water.length)
		}

		return data;
	},

	renderChart: function() {
		const chart = document.querySelector('#Chart');
		const data = this.getChartData();
		const ctx = document.getElementById("Chart").getContext('2d');
		new Chart.Line('Chart', {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {min : 0, max: 100}
					}]
				}
			},
			data: {
				labels: data.labels,
				datasets: [{
					label: 'Air Temp',
					data: data.temperature,
					backgroundColor: 'transparent',
					borderColor: '#00e8a6',
					borderWidth: 1
				},
				{
					label: 'Air Humidity',
					data: data.humidity,
					backgroundColor: 'transparent',
					borderColor: '#b466ff',
					borderWidth: 1
				},
				{
					label: 'Water temp',
					data: data.water,
					backgroundColor: 'transparent',
					borderColor: '#4090fd',
					borderWidth: 1
				}]
			}
		});
	},

	renderOutsideData: function() {
		const endpoint = 'https://api.apixu.com/v1/current.json?key=333b732ec2314a45a09162013180811&q=Bury+St+Edmunds';
		const airTemperaturePanel = document.querySelector('.Panel--airTemperature');
		const airHumididtyPanel = document.querySelector('.Panel--airHumidity');

		fetch(endpoint)
			.then(data => data.json())
			.then(data => {
				const temp = data.current.temp_c;
				const humidity = data.current.humidity;
				airTemperaturePanel.querySelector('.Meter-title').innerHTML += '<small>'+temp+' outside</small>';
				airHumididtyPanel.querySelector('.Meter-title').innerHTML += '<small>'+humidity+' outside</small>';
			})
	}
}

Modules.init();
