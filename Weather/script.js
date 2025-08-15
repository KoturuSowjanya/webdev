async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const weatherBox = document.getElementById("weatherBox");
  const appContainer = document.getElementById("appContainer");
  const apiKey = "39b8f41453d87c78858871f17d578e26"; // Replace with your OpenWeatherMap API Key

  if (!location) {
    alert("Please enter a location.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Location not found");

    const data = await res.json();
    const { name, sys, weather, main, wind } = data;

    // Show weather
    weatherBox.style.display = "block";
    weatherBox.innerHTML = `
      <h2>${name}, ${sys.country}</h2>
      <p>🌡 Temperature: ${main.temp}°C</p>
      <p>🌥 Condition: ${weather[0].description}</p>
      <p>💧 Humidity: ${main.humidity}%</p>
      <p>🌬 Wind: ${wind.speed} m/s</p>
    `;

    // Change background
    const condition = weather[0].main.toLowerCase();
    appContainer.className = "app-container";

    if (condition.includes("cloud")) {
      appContainer.classList.add("cloudy");
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      appContainer.classList.add("rainy");
    } else if (condition.includes("clear") || condition.includes("sun")) {
      appContainer.classList.add("sunny");
    }

  } catch (error) {
    weatherBox.style.display = "block";
    weatherBox.innerHTML = `<p>${error.message}</p>`;
    appContainer.className = "app-container"; // Reset
  }
}
