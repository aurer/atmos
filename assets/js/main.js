const Modules = {
	init: function() {
		this.setModuleValues();
		this.renderChart();
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

	renderChart: function() {
		const chart = document.querySelector('#Chart');
		const labels = chart.dataset.times.split(',');
		const temperature = chart.dataset.temperature.split(',');
		const humidity = chart.dataset.humidity.split(',');
		const water = chart.dataset.water.split(',');

		const ctx = document.getElementById("Chart").getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'line',
			responsive: true,
			maintainAspectRatio: false,
			data: {
				labels: labels,
				datasets: [{
					label: 'Air Temperature',
					data: temperature,
					backgroundColor: 'transparent',
					borderColor: '#00e8a6',
					borderWidth: 1
				},
				{
					label: 'Air Humidity',
					data: humidity,
					backgroundColor: 'transparent',
					borderColor: '#b466ff',
					borderWidth: 1
				},
				{
					label: 'Water temperature',
					data: water,
					backgroundColor: 'transparent',
					borderColor: '#4090fd',
					borderWidth: 1
				}]
			},
				options: {
				scales: {
					yAxes: [{
						ticks: {min : 0, max: 100}
					}]
				}
			}
		});
	}
}

Modules.init();
