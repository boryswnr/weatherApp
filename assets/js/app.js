const weatherform = document.querySelector(".weatherForm");
const apiURL =
    "https://api.weatherapi.com/v1/forecast.json?key=d132cd6234a44a599e1124638221203&days=7&q=";
const apiDataContainer = document.querySelector(".apiData");
const loader = document.querySelector(".loader");
let hour;
const time = new Date();
const hourNow = time.getHours();
weatherform.addEventListener("submit", (event) => getWeatherForecast(event));

const adjustBG = (h) => {
    const nightBg = document.querySelector(".night");
    const dayBg = document.querySelector(".day");
    if (18 > h && h > 6) {
        nightBg.style.display = "none";
        dayBg.style.display = "block";
    } else {
        nightBg.style.display = "block";
        dayBg.style.display = "none";
    }
};

adjustBG(hourNow);

const getWeatherForecast = (e) => {
    showLoader();
    const userCity = document.querySelector(".city").value;
    const userApiURL = apiURL + userCity;

    fetch(userApiURL)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                return showError();
            }
        })
        .then((dataFromApi) => {
            hideLoader();
            //console.log(dataFromApi.current.condition.text)
            let view = "";
            view += `<div class="mainInfo">`;

            //icon
            view += `<div class="icon">`;
            view += `<img src="${dataFromApi.current.condition.icon}" alt="${dataFromApi.current.condition.text}">`;
            view += `</div>`;

            //degrees
            view += `<div class="degrees">`;
            view += `${dataFromApi.current.temp_c}<span><sup>o</sup>C</span>`;
            view += `</div>`;

            view += `<div class="info">
                    <p>The amount of rainfall: ${dataFromApi.current.precip_mm}mm </p>
                    <p>Humidity: ${dataFromApi.current.humidity}%</p>
                    <p>Wind: ${dataFromApi.current.wind_kph}km/h</p>
                </div>`;

            view += `</div>`;

            // forecast
            view += `<div class="days">`;
            view += `<h3 class="forecastTitle">Forecast</h3>`;
            //day
            view += `<div class="forecastDay">`;

            dataFromApi.forecast.forecastday.forEach((day) => {
                view += `<div class="dayContainer">`;
                view += `<div class="date">${day.date}</div>`;
                view += `<div class="icon"><img src="${day.day.condition.icon}" alt="weatherIcon"></div>`;
                view += `<div class="avgTemp">${day.day.avgtemp_c}<span><sup>o</sup>C</span></div>`;
                view += `</div>`;
            });

            view += `</div>`;

            // closing off 'days' div
            view += `</div>`;

            apiDataContainer.innerHTML = view;
            // take local time from API data, extract hour string
            hour = dataFromApi.location.localtime.split(" ")[1];
            // take hour:minute, extract hour and turn it to number
            hour = +hour.split(":")[0];

            adjustBG(hour);
        });

    e.preventDefault();
};

const showLoader = () => {
    loader.style.display = "block";
};

const hideLoader = () => {
    loader.style.display = "none";
};

const showError = () => {
    apiDataContainer.innerHTML = `<div class="error">Your city was not found or we have network problems.</div>`;
};

const getLocation = () => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const searchMyPosition = async (e) => {
    showLoader();
    const position = await getLocation();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = latitude + " " + longitude;
    document.querySelector(".city").value = coords;
    await getWeatherForecast(e);
};

const localisator = document.querySelector(".fa-location-crosshairs");
localisator.addEventListener("click", async (e) => {
    searchMyPosition(e);
    // getTimeOnStart();
});
