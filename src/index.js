let currentDate = new Date();
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cities = document.querySelector("#city");
  let searchInput = document.querySelector("#search-input");
  cities.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
function searchCity(city) {
  let apiKey = "0fbc736f2359584075fc6a76570cf171";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}

let Form = document.querySelector("#search-form");
Form.addEventListener("submit", search);

function currentTemperature(response) {
  let cities = document.querySelector("#city");
  cities.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let span = document.querySelector(".temp");
  span.innerHTML = `${temperature}°C`;
}
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0fbc736f2359584075fc6a76570cf171";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}
navigator.geolocation.getCurrentPosition(showLocation);
