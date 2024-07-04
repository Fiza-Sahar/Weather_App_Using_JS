
/**
 * API key for OpenWeatherMap API
 */
const apiKey = "f5f690fb5ac5cfddbc6367e5cf2d4422";

/**
 * Base URL for OpenWeatherMap API
 */
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Get HTML elements
const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");
const weatherIcon = document.querySelector(".weather-icon");

/**
 * Asynchronous function to check the weather for a given city
 * @param {string} city - City name to check the weather for
 */
async function checkWeather(city) {
  try {
    // Fetch weather data from API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404) {
      // Display error message and hide weather container
      errorContainer.style.display = "block";
      weatherContainer.style.display = "none";
      return; // Exit function if there's a 404 error
    }

    // Hide error message and display weather container
    errorContainer.style.display = "none";
    weatherContainer.style.display = "block";

    // Parse JSON response
    const data = await response.json();
    console.log("API response:", data); // Log API response for debugging

    // Update DOM with weather data
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";

    // Set weather icon based on weather condition
    setWeatherIcon(data.weather[0].main);
  } catch (error) {
    console.error("Error fetching the weather data:", error);
    // Handle any other errors as needed
  }
}

/**
 * Sets the weather icon based on the weather condition
 * @param {string} weatherCondition - Weather condition (e.g. "Clouds", "Clear", etc.)
 */
function setWeatherIcon(weatherCondition) {
  switch (weatherCondition.toLowerCase()) {
    case "clouds":
      weatherIcon.src = "./Assets/images/clouds.png";
      break;
    case "clear":
      weatherIcon.src = "./Assets/images/clear.png";
      break;
    // ...
  }
}

// Add event listener to search button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Initial call with a default city
checkWeather("New York");