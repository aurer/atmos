async function getReadings() {
        return await fetch("/sensors").then(r => r.json());
}

async function updateReadings() {
        const readings = await getReadings();
        document.querySelector('.air .value').innerText = readings.air;
        document.querySelector('.water .value').innerText = readings.water;
        document.querySelector('.humidity .value').innerText = readings.humidity;
        document.querySelector('.co2 .value').innerText = readings.co2;
        document.querySelector('.level').dataset.level = readings.water_level;
        document.querySelector('.level .value').innerText = (readings.water_level == "0" ? 'LOW' : 'OK');
}

setInterval(updateReadings, 4000);

async function capture() {
        return await fetch("/capture");
}

const img = document.querySelector('#image');
img.addEventListener("click", (e) => {
        e.preventDefault();
				const img = e.target
				img.classList.add('loading')
        capture().then(() => {
                const img = document.querySelector("img")
                const timestamp = new Date().getTime();
                const src = '/static/capture.jpg#' + timestamp;
                img.src = src;
        }).finally(() => {
        	img.classList.remove('loading')
        })
})
