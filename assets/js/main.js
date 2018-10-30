const Modules = {
	init: function() {
		this.setModuleValues();
		this.renderChart();
	},

	setModuleValues: function() {
		let modules = document.querySelectorAll('.Module');
		for(let i = 0; i < modules.length; i++) {
			let module = modules[i];
			let chart = module.querySelector('.Module-chart .value');
			let value = Number(module.dataset.value);

			let radius = 47 * 2 * Math.PI;
			let pos = 100 - value;

			let offset = (radius / 100) * pos;

			chart.setAttribute('stroke-dasharray', radius);
			chart.setAttribute('stroke-dashoffset', radius);
			setTimeout(function() {
				chart.setAttribute('stroke-dashoffset', offset);
			}, 200);
		}
	},

	renderChart: function() {
		let labels = times.map(label => {
			let time = new Date(label);
			return time.getHours() + ':' + time.getMinutes();
		});
		let temperatures = values.map(value => value.temperature);
		let humidities = values.map(value => value.humidity);
		let waters = values.map(value => value.water);
		console.log(waters);

		var ctx = document.getElementById("Chart").getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'line',
			responsive: true,
			maintainAspectRatio: false,
			data: {
				labels: labels,
				datasets: [{
					label: 'Temperature',
					data: temperatures,
					backgroundColor: 'transparent',
					borderColor: '#ff6384',
					borderWidth: 1
				},
				{
					label: 'Humidity',
					data: humidities,
					backgroundColor: 'transparent',
					borderColor: '#f9ab41',
					borderWidth: 1
				},
				{
					label: 'Water',
					data: waters,
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
