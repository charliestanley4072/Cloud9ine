// --------------------------------
// WEATHER.JS — for location.html only
// --------------------------------


const params = new URLSearchParams(window.location.search);
const place = params.get('place');


const locations = {
    London: '<h2>London</h2><p>Weather in London:</p>',
    Edinburgh: '<h2>Edinburgh</h2><p>Weather in Edinburgh:</p>',
    Cardiff: '<h2>Cardiff</h2><p>Weather in Cardiff:</p>',
    Leeds: '<h2>Leeds</h2><p>Weather in Leeds:</p>',
    Bristol: '<h2>Bristol</h2><p>Weather in Bristol:</p>',
    Plymouth: '<h2>Plymouth</h2><p>Weather in Plymouth:</p>',
	Lerwick: '<h2>Lerwick</h2><p>Weather in Lerwick:</p>',
	Stornoway: '<h2>Stornoway</h2><p>Weather in Stornoway:</p>',
	Aberdeen: '<h2>Aberdeen</h2><p>Weather in Aberdeen:</p>',
	Glasgow: '<h2>Glasgow</h2><p>Weather in Glasgow:</p>',
	Inverness: '<h2>Inverness</h2><p>Weather in Inverness:</p>',
	Newcastle: '<h2>Newcastle</h2><p>Weather in Newcastle:</p>',
	Belfast: '<h2>Belfast</h2><p>Weather in Belfast:</p>',
	Hull: '<h2>Hull</h2><p>Weather in Hull:</p>',
	Dublin: '<h2>Dublin</h2><p>Weather in Dublin:</p>',
	Cork: '<h2>Cork</h2><p>Weather in Cork:</p>',
	Liverpool: '<h2>Liverpool</h2><p>Weather in Liverpool:</p>',
	IsleOfMan: '<h2>Isle of Man</h2><p>Weather in the Isle of Man:</p>',
	Nottingham: '<h2>Nottingham</h2><p>Weather in Nottingham:</p>',
	Dover: '<h2>Dover</h2><p>Weather in Dover:</p>',
	Cambridge: '<h2>Cambridge</h2><p>Weather in Cambridge:</p>',
	Norwich: '<h2>Norwich</h2><p>Weather in Norwich:</p>',
	Midwich: '<h2>Midwich</h2><p>Weather in Midwich:</p>'
};


const titles = {
    London: 'Weather - London',
    Edinburgh: 'Weather - Edinburgh',
    Cardiff: 'Weather - Cardiff',
    Leeds: 'Weather - Leeds',
    Bristol: 'Weather - Bristol',
    Plymouth: 'Weather - Plymouth',
	Lerwick: 'Weather - Lerwick',
	Stornoway: 'Weather - Stornoway',
	Aberdeen: 'Weather - Aberdeen',
	Glasgow: 'Weather - Glasgow',
	Inverness: 'Weather - Inverness',
	Newcastle: 'Weather - Newcastle',
	Belfast: 'Weather - Belfast',
	Hull: 'Weather - Hull',
	Dublin: 'Weather - Dublin',
	Cork: 'Weather - Cork',
	Liverpool: 'Weather - Liverpool',
	IsleOfMan: 'Weather - Isle of Man',
	Nottingham: 'Weather - Nottingham',
	Dover: 'Weather - Dover',
	Cambridge: 'Weather - Cambridge',
	Norwich: 'Weather - Norwich',
	Midwich: 'Weather - Midwich'
};


const weatherInfo = document.getElementById('weather-info');

if (weatherInfo) {
    weatherInfo.innerHTML = locations[place] || '<p>No location selected.</p>';
    document.title = titles[place] || "Weather";
}


document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-dark');

    if (!toggle) {
        console.error('Toggle element not found!');
        return;
    }

    toggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', toggle.checked);
    });
});

/*fetch("https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current_weather=true")
  .then(res => res.json())
  .then(data => {
      console.log(data);
      document.getElementById("weather-info").innerHTML = `
          <h2>London</h2>
          <p>Temperature: ${data.current_weather.temperature}°C</p>
          <p>Wind: ${data.current_weather.windspeed} km/h</p>
          <p>Weather Code: ${data.current_weather.weathercode}</p>
      `;
  });*/
  
  
function createRain() {
    const rainContainer = document.getElementById("rain-container");

    for (let i = 0; i < 300; i++) {
        const drop = document.createElement("div");
        drop.classList.add("drop");
        drop.style.left = Math.random() * 100 + "vw";        // random horizontal position
        drop.style.animationDuration = 0.4 + Math.random() * 0.8 + "s";          // random speed
		drop.style.opacity = Math.random();         // random transparency
        rainContainer.appendChild(drop);
    }
}
createRain();
