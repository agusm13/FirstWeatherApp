
function dateFunc(currentDate) {0
  let date = new Date(currentDate);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  let minutes = date.getMinutes();
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
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function dateDisplay(currentDay) {
  let forecastDate = new Date(currentDay * 1000);
  let nextDay = forecastDate.getDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[nextDay];
}
//let h2 = document.querySelector("h2");
//h2.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cities = document.querySelector("#city");
  let searchInputElement = document.querySelector("#search-input");
  cities.innerHTML = searchInput.value;
  searchCity(searchInputElement.value);
}

function searchCity(city) {
  let apiKey = "0fbc736f2359584075fc6a76570cf171";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}

let Form = document.querySelector("#search-form");
Form.addEventListener("submit", search);

function currentTemp(response) {
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#weather-icon");
  let tempElement = document.querySelector("#temperature");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let windSpeedElement = document.querySelector("#wind-speed");

  celsiusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  dateElement.innerHTML = dateDisplay(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  tempElement.innerHTML = Math.round(celsiusTemp);
  maxTempElement.innerHTML = Math.round(response.data.main.max_temp);
  minTempElement.innerHTML = Math.round(response.data.main.min_temp);
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}
function getForecast(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0fbc736f2359584075fc6a76570cf171";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayCurrentForecast);
}

//navigator.geolocation.getCurrentPosition(getForecast);

function forecastDis(timestamps) {
  let forecastDate = new Date(timestamps * 1000);
  let nextDay = forecastDate.getDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[nextDay];
}

function displayCurrentForecast(response) {
  let forecastInfo = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastInfo.forEach(function (currentForecast, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2"><h3>${dateDisplay(currentForecast.dt)}
      </h3>
      <ul>
        <li>
          <img class="forecast-icon" src="https://openweathermap.org/img/wn/${
            currentForecast.weather[0].icon
          }@2x.png" alt="${
          currentForecast.weather[0].description
        }" width="40"></li>
          <li class="forecast-max-temp">${Math.round(
            currentForecast.temp.max
          )} ºC</li>
              <li class="forecast-min-temp">${Math.round(
                currentForecast.temp.min
              )} ºC</li>
      </ul>
     </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function celTempDisplay(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  //fahrenheitLink.classList.remove("active");
}

/*function farTempDisplay(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let farTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}*/
let celsiusTemp = null;
let form = document.querySelector("#search-engine");
form.addEventListener("submit", search);
// let fahrenheitLink = document.querySelector("#fahrenheit-converter");
// fahrenheitLink.addEventListener("click", farTempDisplay);
let celsiusLink = document.querySelector("#celsius-converter");
celsiusLink.addEventListener("click", celTempDisplay);
searchCity("San Francisco");

//displayCurrentForecast();
