const Modules = {
	init: function() {
		this.setModuleValues();
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
			console.log(value);
		}
	}
}

Modules.init();
