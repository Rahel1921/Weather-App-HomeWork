function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  let iconElement = document.querySelector("#icons");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celTemp = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celTemp);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "27c1088608a4e6aab19c47ba35fcbd2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "27c1088608a4e6aab19c47ba35fcbd2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let celTemp = null;
let Form = document.querySelector("#form");
Form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showInFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  cel.classList.remove("active");
  far.classList.add("active");
  let farTemp = (celTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farTemp);
}

function showInCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  cel.classList.add("active");
  far.classList.remove("active");
  tempElement.innerHTML = Math.round(celTemp);
}

let far = document.querySelector("#far");
far.addEventListener("click", showInFahrenheit);
let cel = document.querySelector("#cel");
cel.addEventListener("click", showInCelsius);
searchCity("Ethiopia");
