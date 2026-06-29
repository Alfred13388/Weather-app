
const API_KEY = "e6c780c42a80d62ae429109d99a5a472"; 

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const currentWeather = document.getElementById("currentWeather");
const forecast = document.getElementById("forecast");
const error = document.getElementById("error");

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        error.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    error.textContent = "";
    currentWeather.innerHTML = "";
    forecast.innerHTML = "";

    try {
        // Current Weather
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
            throw new Error("City not found");
        }

        const weatherData = await weatherResponse.json();

        displayCurrentWeather(weatherData);

        // 5-Day Forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);

    } catch (err) {
        error.textContent = err.message;
    }
}

function displayCurrentWeather(data) {
    currentWeather.innerHTML = `
        <h2>${data.name}</h2>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>☁ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
    `;
}

function displayForecast(data) {
    const dailyForecasts = data.list.filter(item =>
        item.dt_txt.includes("00:00:00")
    );
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

        dailyForecasts.slice(0, 5).forEach(day => {
  const card = document.createElement("div");
  card.classList.add("forecast-card");

  const dayNumber = new Date(day.dt_txt).getDay();
  const dayName = days[dayNumber];

  const dateName = new Date(day.dt_txt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  card.innerHTML = `
    <h4>${dayName}</h4>
    <small class="date">${dateName}</small>
    <p>${day.main.temp}°C</p>
    <p>${day.weather[0].main}</p>
  `;
 
  forecast.appendChild(card);
    
    });
};

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");


    
});
