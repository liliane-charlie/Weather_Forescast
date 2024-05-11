function updateWeather(response) {
  let temperatureElement = document.getElementById("weatherAppValue");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.getElementById("description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windElement.innerHTML = `${response.data.wind.speed} Km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="weatherAppIcon"/>`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function replaceCity(city) {
  let apiKey = "caca0doba0159abf7a94f3bbcctdd303";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}
function handlesearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchFormInput");
  let cityElement = document.querySelector("#weatherAppCity");
  cityElement.innerHTML = searchInput.value;
  replaceCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "caca0doba0159abf7a94f3bbcctdd303";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class ="weather_forecast_day">
            <div class ="weather_forecast_date">${formatDay(day.time)}</div>
           <img src="${
             day.condition.icon_url
           }" class ="weather_forecast_icon"/> 
            <div class="weather_forecast_temperature">
              <div class="weather_forecast_temperature_max"> <strong> ${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div class="weather_forecast_temperature_min"> <strong> ${Math.round(
                day.temperature.minimum
              )}°</strong></div>
            </div>
          </div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handlesearch);
displayForecast();
