// --------------------------------
// WEATHER.JS — for location.html only
// --------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const weatherInfo = document.getElementById("weather-info");
    const precipitationContainer = document.getElementById("precipitation-container");

    if (!weatherInfo) return; // Only runs on location.html

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
        IsleOfMan: { lat: 54.2361, lon: -4.5481 },
        Nottingham: { lat: 52.9548, lon: -1.1581 },
        Dover: { lat: 51.1290, lon: 1.3080 },
        Cambridge: { lat: 52.2053, lon: 0.1218 },
        Aberdeen: { lat: 57.1497, lon: -2.0943 },
        Norwich: { lat: 52.6309, lon: 1.2974 },
		Harpenden: {lat: 51.8185, lon: 0.3590 }
    };

    const params = new URLSearchParams(window.location.search);
    const rawPlace = params.get("place");

    if (!rawPlace) {
        weatherInfo.innerHTML = "<p>No location provided.</p>";
        return;
    }

    const place = Object.keys(locationCoords).find(
        key => key.toLowerCase() === rawPlace.replace(/\s+/g, "").toLowerCase()
    );

    if (!place) {
        weatherInfo.innerHTML = "<p>Location does not exist.</p>";
        return;
    }

    const weatherCodes = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
        55: "Dense drizzle", 56: "Light freezing drizzle", 57: "Dense freezing drizzle",
        61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
        66: "Light freezing rain", 67: "Heavy freezing rain",
        71: "Slight snow fall", 73: "Moderate snow fall", 75: "Heavy snow fall",
        77: "Snow grains", 80: "Slight rain showers", 81: "Moderate rain showers",
        82: "Violent rain showers", 85: "Slight snow showers", 86: "Heavy snow showers",
        95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
    };

    const { lat, lon } = locationCoords[place];

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`)
        .then(res => res.json())
        .then(data => {
            const code = data.current_weather?.weathercode;

            const now = new Date();
            const nowStr = now.toISOString().slice(0, 13) + ":00"; // e.g., "2025-12-29T14:00"
            const timeIndex = data.hourly.time.findIndex(t => t.startsWith(nowStr));
            const humidity = timeIndex >= 0 ? data.hourly.relativehumidity_2m[timeIndex] : "N/A";

            weatherInfo.innerHTML = `
                <h2>${place}</h2>
                <p>Temperature: ${data.current_weather?.temperature ?? "N/A"}°C</p>
                <p>Wind: ${data.current_weather?.windspeed ?? "N/A"} km/h</p>
                <p>Humidity: ${humidity}%</p>
                <p>Weather: ${weatherCodes[code] || "Unknown"}</p>
            `;
            document.title = `Weather - ${place}`;

            // Weather-dependent effects
            const rainCodes = [51,53,55,56,57,61,63,65,66,67,80,81,82];
            const snowCodes = [71,73,75,77,85,86];

            if (rainCodes.includes(code)) createRain();
            if (snowCodes.includes(code)) createSnow();
        })
		


    // Rain effect
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


    // Snow effect
    function createSnow() {
        for (let i = 0; i < 120; i++) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            const size = 3 + Math.random() * 4;
            snowflake.style.width = size + "px";
            snowflake.style.height = size + "px";
            snowflake.style.left = Math.random() * 100 + "vw";
            snowflake.style.opacity = Math.random(); // 0–1
            snowflake.style.animationDuration = (6 + Math.random() * 4) + "s";
            snowflake.style.animationDelay = Math.random() * 8 + "s";
            precipitationContainer.appendChild(snowflake);
        }
    }

    // -----------------------------
    // Dark mode toggle
    // -----------------------------
    const toggle = document.getElementById('toggle-dark');
    if (toggle) {
        toggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode', toggle.checked);
        });
    }
});
