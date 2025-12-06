const weatherInfo = document.getElementById('weather-info');

const params = new URLSearchParams(window.location.search);
const place = params.get('place');

const locations = {
	London: '<h2>London</h2><p>Weather in London:</p>',
	Edinburgh: '<h2>Edinburgh</h2><p>Weather in Edinburgh:</p>',
	Cardiff: '<h2>Cardiff</h2><p>Weather in Cardiff:</p>',
	Leeds: '<h2>Leeds</h2><p>Weather in Leeds:</p>',
	Bristol: '<h2>Bristol</h2><p>Weather in Bristol:</p>',
	Plymouth: '<h2>Plymouth</h2><p>Weather in Plymouth:</p>'
};


const titles = {
	London: 'Weather - London',
	Edinburgh: 'Weather - Edinburgh',
	Cardiff: 'Weather - Cardiff',
	Leeds: 'Weather - Leeds',
	Bristol: 'Weather - Bristol',
	Plymouth: 'Weathre - Plymouth'
};

weatherInfo.innerHTML = locations[place] || '<p>No location selected.</p>';
document.title = titles[place];

function showSuggestions() {
	const input = document.getElementById("search").value.toLowerCase();
	const box = document.getElementById("suggestions");
	
	box.innerHTML = "";

	if (!input) return;

	const matches = Object.keys(locations).filter(loc => loc.toLowerCase().startsWith(input)
	);

	matches.forEach(loc => {
		const div = document.createElement("div");
		div.className = "suggestion";
		div.textContent = loc;
	
		div.onclick = () => {
		window.location.href = "location.html?place=" + encodeURIComponent(loc)
		};
	
		box.appendChild(div);
	});
}
		
