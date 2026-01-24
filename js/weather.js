// WEATHER.JS — for location.html only
document.addEventListener('DOMContentLoaded', () => { //Ensures page content has loaded before loading js
	/*defines all variables that use a similar name from html pages at start to make page cleaner*/
    const weatherInfo = document.getElementById("weather-info");
    const precipitationContainer = document.getElementById("precipitation-container");
    const buttonsContainer = document.getElementById("day-buttons");
    const toggle = document.getElementById('toggle-dark');
    const container = document.getElementById("wide-img-container");
    const sideTab = document.getElementById("side-tab");
    const sideToggle = document.getElementById("side-toggle");

    if (!weatherInfo) return;

    // Locations and coordinates
    const locationCoords = {
        London: { lat: 51.5072, lon: -0.1276 },
        Edinburgh: { lat: 55.9533, lon: -3.1883 },
        Cardiff: { lat: 51.4816, lon: -3.1791 },
        Leeds: { lat: 53.8008, lon: -1.5491 },
        Bristol: { lat: 51.4545, lon: -2.5879 },
        Plymouth: { lat: 50.3755, lon: -4.1427 },
        Belfast: { lat: 54.5973, lon: -5.9301 },
        Glasgow: { lat: 55.8642, lon: -4.2518 },
        Inverness: { lat: 57.4778, lon: -4.2247 },
        Liverpool: { lat: 53.4084, lon: -2.9916 },
        Birmingham: { lat: 52.4862, lon: -1.8904 },
        Cork: { lat: 51.8985, lon: -8.4756 },
        Dublin: { lat: 53.3498, lon: -6.2603 },
        Newcastle: { lat: 54.9783, lon: -1.6178 },
        Hull: { lat: 53.7676, lon: -0.3274 },
        Lerwick: { lat: 60.1550, lon: -1.1450 },
        Stornoway: { lat: 58.2090, lon: -6.3860 },
        Isle_Of_Man: { lat: 54.2361, lon: -4.5481 },
        Nottingham: { lat: 52.9548, lon: -1.1581 },
        Dover: { lat: 51.1290, lon: 1.3080 },
        Cambridge: { lat: 52.2053, lon: 0.1218 },
        Aberdeen: { lat: 57.1497, lon: -2.0943 },
        Norwich: { lat: 52.6309, lon: 1.2974 },
        Harpenden: { lat: 51.8185, lon: 0.3590 },
        Luton: { lat: 51.8787, lon: 0.4200 },
        St_Albans: { lat: 51.7509, lon: 0.3398 },
        Ware: { lat: 51.8104, lon: 0.0282 },
        Sheffield: { lat: 53.3811, lon: -1.4701 },
        Doncaster: { lat: 53.5228, lon: -1.1323 },
        Thorne: { lat: 53.6104, lon: -0.9614 },
        Blackpool: { lat: 53.8167, lon: -3.0370 },
        Brighton: { lat: 50.8278, lon: -0.1528 },
        Cromer: { lat: 52.93145, lon: 1.301866 },
        Hunstanton: { lat: 52.938611, lon: 0.490833 },
        Holt: { lat: 52.9, lon: 1.09 },
        Sherringham: { lat: 52.9433, lon: 1.3243 },
        Cornwall: { lat: 50.5039, lon: -4.4699 },
        Devon: { lat: 50.7184, lon: -3.5339 },
        Great_Yarmouth: { lat: 52.60822, lon: 1.72716 },
        Weybourne: { lat: 52.9450, lon: 1.2100 },
        Milton_Keynes: { lat: 52.0406, lon: -0.7594 },
        Dunstable: { lat: 51.8837, lon: -0.5180 },
        Hatfield: { lat: 51.7537, lon: -0.2241 },
        Welwyn_Garden_City: { lat: 51.8030, lon: -0.2096 },
        Radlett: { lat: 51.7167, lon: -0.3180 },
        London_Colney: { lat: 51.7631, lon: -0.2680 },
        Hendon: { lat: 51.5843, lon: -0.1919 },
        Hemel_Hempstead: { lat: 51.7553, lon: -0.3397 },
        Hathersage: { lat: 53.3328, lon: -1.6500 },
    };

    const params = new URLSearchParams(window.location.search);
    const rawPlace = params.get("place");
    const dayIndex = parseInt(params.get("day") || "0", 10);

    if (!rawPlace) { /*if there is no location (specified with ? at end of URL) after URL then display this error*/
        weatherInfo.innerHTML = "<p>No location provided.</p>";
        return;
    }

    const place = Object.keys(locationCoords).find(
        key => key.toLowerCase().replace(/_/g, '') === rawPlace.toLowerCase().replace(/_/g, '')
    );

    if (!place) { /*if there is no matching location to the one provided then this error message shows up*/
        weatherInfo.innerHTML = "<p>Location does not exist.</p>";
        return;
    }

    const weatherCodes = { /*converts weather codes into real information*/
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
        55: "Dense drizzle", 56: "Light freezing drizzle", 57: "Dense freezing drizzle",
        61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
        66: "Light freezing rain", 67: "Heavy freezing rain",
        71: "Slight snowfall", 73: "Moderate snowfall", 75: "Heavy snowfall",
        77: "Snow grains", 80: "Slight rain showers", 81: "Moderate rain showers",
        82: "Violent rain showers", 85: "Slight snow showers", 86: "Heavy snow showers",
        95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
    };

    const rainCodes = [51,53,55,56,57,61,63,65,66,67,80,81,82]; /*weather codes involving rain*/
    const snowCodes = [71,73,75,77,85,86]; /*weather codes involving snow*/

    const { lat, lon } = locationCoords[place];

    // Fetch weather - url is designed to allow weather information to be taken hourly, as well as daily
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=8&timezone=auto`)
        .then(res => res.json())
        .then(data => {
			
            let code, humidity, wind; /*declares 9but does not assign) new variables that can be used later*/
            if (dayIndex === 0) {
                // TODAY
                code = data.current_weather?.weathercode;

                const now = new Date();
                const nowStr = now.toISOString().slice(0, 13) + ":00";
                const timeIndex = data.hourly.time.findIndex(t => t.startsWith(nowStr));

                humidity = timeIndex >= 0 ? data.hourly.relativehumidity_2m[timeIndex] : "N/A";
                wind = timeIndex >= 0 ? data.hourly.windspeed_10m[timeIndex] : data.current_weather?.windspeed ?? "N/A";

                weatherInfo.innerHTML = `
                    <h2>${place.replace(/_/g, ' ')}</h2>
					<h3>Now</h3>
                    <p>Temperature: ${data.current_weather?.temperature ?? "N/A"}°C</p>
                    <p>Wind Speed: ${wind} km/h</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Weather: ${weatherCodes[code] || "Unknown"}</p>
                `;
            } else {
                // FUTURE DAY
                const date = data.daily.time[dayIndex];
                const dayDate = new Date(date);

                code = data.daily.weathercode[dayIndex];

                const dayStr = dayDate.toISOString().slice(0, 10) + "T12:00";
                const hourIndex = data.hourly.time.findIndex(t => t.startsWith(dayStr));

                humidity = hourIndex >= 0 ? data.hourly.relativehumidity_2m[hourIndex] : "N/A";
                wind = hourIndex >= 0 ? data.hourly.windspeed_10m[hourIndex] : "N/A";

                weatherInfo.innerHTML = `
                    <h2>${place.replace(/_/g, ' ')}</h2>
                    <h3>${dayDate.toDateString()}</h3>
                    <p>Max: ${data.daily.temperature_2m_max[dayIndex]}°C</p>
                    <p>Min: ${data.daily.temperature_2m_min[dayIndex]}°C</p>
                    <p>Wind Speed: ${wind} km/h</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Weather: ${weatherCodes[code] || "Unknown"}</p>
                `;
            }

            createWeatherEffects(code);
			renderHourly(data, dayIndex);

        });

    // Weather effects
    function createWeatherEffects(code) {
        precipitationContainer.innerHTML = "";
        if (rainCodes.includes(code)) createRain();
        if (snowCodes.includes(code)) createSnow();
    }

    function createRain() {
        for (let i = 0; i < 300; i++) {
            const drop = document.createElement("div");
            drop.classList.add("drop");
            drop.style.left = Math.random() * 100 + "vw";
            drop.style.animationDuration = (0.4 + Math.random() * 0.8) + "s";
            drop.style.animationDelay = Math.random() * 2 + "s";
            drop.style.opacity = 0.2 + Math.random() * 0.5;
            precipitationContainer.appendChild(drop);
        }
    }
	
    function createSnow() {
        for (let i = 0; i < 165; i++) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            const size = 8 + Math.random() * 6;
            snowflake.style.width = size + "px";
            snowflake.style.height = size + "px";
            snowflake.style.left = Math.random() * 100 + "vw";
            snowflake.style.opacity = 0.4 + Math.random();
            snowflake.style.animationDuration = (6 + Math.random() * 4) + "s";
            snowflake.style.animationDelay = Math.random() * 8 + "s";
            precipitationContainer.appendChild(snowflake);
        }
    }

    // Side panel day buttons
    if (buttonsContainer) {
        buttonsContainer.innerHTML = "";

        const todayBtn = document.createElement("button");
        todayBtn.textContent = "Today";
        if (dayIndex === 0) todayBtn.classList.add("active-day");
        todayBtn.onclick = () => window.location.href = `location.html?place=${rawPlace}&day=0`;
        buttonsContainer.appendChild(todayBtn);

        for (let i = 1; i <= 7; i++) {
            const btn = document.createElement("button");
            const date = new Date();
            date.setDate(date.getDate() + i);

            btn.textContent = date.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short"
            });

            if (i === dayIndex) btn.classList.add("active-day");
			
            btn.onclick = () => window.location.href = `location.html?place=${rawPlace}&day=${i}`;
            buttonsContainer.appendChild(btn);
        }
    }

    // Wide image
    if (container && rawPlace) {
        const placeSlug = rawPlace.toLowerCase().replace(/\s+/g, "").replace(/_/g, "");
        container.innerHTML = `<img src="images/${placeSlug}-wide.png" alt="${rawPlace} wide image" style="width:100%; height:auto;">`;
    }

    // Side tab toggle + auto-open
    if (sideToggle && sideTab) {
        sideToggle.addEventListener("click", () => {
            sideTab.classList.toggle("open");
            sideToggle.textContent = sideTab.classList.contains("open") ? "❯" : "❮";
        });
    }
	
	function renderHourly(data, dayIndex) {
		const container = document.getElementById("hourly-forecast");
		if (!container) return;

		container.innerHTML = "";

		// Determine which 24 hours to show
		const start = dayIndex * 24;
		const end = start + 24;

		for (let i = start; i < end; i++) {
			const time = new Date(data.hourly.time[i]);
			const hour = time.getHours().toString().padStart(2, "0");

			const temp = data.hourly.temperature_2m[i];
			const humidity = data.hourly.relativehumidity_2m[i];
			const wind = data.hourly.windspeed_10m[i];
			const code = data.hourly.weathercode[i];

			const block = document.createElement("div");
			block.className = "hour-block";

			block.innerHTML = `
				<p><strong>${hour}:00</strong></p>
				<p>${temp}°C</p>
				<p>${weatherCodes[code] || "?"}</p>
				<p>${wind} km/h</p>
				<p>${humidity}%</p>
			`;

			container.appendChild(block);
		}
	}

});

