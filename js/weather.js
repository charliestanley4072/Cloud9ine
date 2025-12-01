const weatherInfo = document.getElementById('weather-info');

const params = new URLSearchParams(window.location.search);
const place = params.get('place');

const locations = {
	London: '<h2>London</h2><p>Weather in London:</p>',
	Edinburgh: '<h2>Edinburgh</h2><p>Weather in Edinburgh:</p>',
	Cardiff: '<h2>Cardiff</h2><p>Weather in Cardiff:</p>'
};

const titles = {
	London: 'Weather - London:',
	Edinburgh: 'Weather - Edinburgh',
	Cardiff: 'Weather - Cardiff'
};

weatherInfo.innerHTML = locations[place] || '<p>No location selected.</p>';
document.title = titles[place];

