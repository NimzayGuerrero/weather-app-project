let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendsday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${hour}:${minutes}`;

function showCityName(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let searchTemperature = document.querySelector("#temp-today");
  searchTemperature.innerHTML = Math.round(response.data.main.temp);
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].main;
}

function selectCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-today");
  temp.innerHTML = "30°";
}

function selectFarenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-today");
  temp.innerHTML = "86°";
}

let celciusUnit = document.querySelector("#celcius-link");
celciusUnit.addEventListener("click", selectCelcius);

let farenheitUnit = document.querySelector("#farenheit-link");
farenheitUnit.addEventListener("click", selectFarenheit);

function newCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city").value;
  let apiKey = "72f6b6bd8863dceb4a1a585d7987f335";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrlSearch = `${apiEndpoint}q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlSearch).then(showCityName);
}

let city = document.querySelector("form");
city.addEventListener("submit", newCity);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "72f6b6bd8863dceb4a1a585d7987f335";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrlCurrent = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(currentCityTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function currentCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCityName = response.data.name;
  let currentTemperature = document.querySelector("#temp-today");
  let currentCity = document.querySelector("h2");
  currentTemperature.innerHTML = `${temperature}°`;
  currentCity.innerHTML = currentCityName;
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentLocation);