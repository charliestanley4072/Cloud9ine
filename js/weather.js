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
    Plymouth: '<h2>Plymouth</h2><p>Weather in Plymouth:</p>'
};


const titles = {
    London: 'Weather - London',
    Edinburgh: 'Weather - Edinburgh',
    Cardiff: 'Weather - Cardiff',
    Leeds: 'Weather - Leeds',
    Bristol: 'Weather - Bristol',
    Plymouth: 'Weather - Plymouth'
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
