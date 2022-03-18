let weatherform = document.querySelector('.weatherForm')
let apiURL = "https://api.weatherapi.com/v1/forecast.json?key=d132cd6234a44a599e1124638221203&days=7&q="
let apiDataContainer = document.querySelector('.apiData')
let loader = document.querySelector('.loader')

weatherform.addEventListener('submit', (event) => {
    showLoader()
    let userCity = document.querySelector('.city').value
    let userApiURL = apiURL + userCity

    fetch(userApiURL)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                return showError()
            }
            
        })
        .then((dataFromApi) => {

            hideLoader()
            //console.log(dataFromApi.current.condition.text)
            let view = ''
            view += `<div class="mainInfo">`

            //icon
            view += `<div class="icon">`
            view += `<img src="${dataFromApi.current.condition.icon}" alt="${dataFromApi.current.condition.text}">`
            view += `</div>`

            //degrees
            view += `<div class="degrees">`
            view += `${dataFromApi.current.temp_c}<span><sup>o</sup>C</span>`
            view += `</div>`

            view += `<div class="info">
                    <p>The amount of rainfall: ${dataFromApi.current.precip_mm}mm </p>
                    <p>Humidity: ${dataFromApi.current.humidity}%</p>
                    <p>Wind: ${dataFromApi.current.wind_kph}km/h</p>
                </div>`;


            view += `</div>`


            // forecast

            view += `<div class="days">`
            view += `<h3 class="forecastTitle">Forecast</h3>`
            //day
            view += `<div class="forecastDay">`
            
            
            dataFromApi.forecast.forecastday.forEach((day) => {
                
                view += `<div class="dayContainer">`
                view += `<div class="date">${day.date}</div>`
                view += `<div class="icon"><img src="${day.day.condition.icon}" alt="weatherIcon"></div>`
                view += `<div class="avgTemp">${day.day.avgtemp_c}<span><sup>o</sup>C</span></div>`    
                view += `</div>`

            })
            
            view += `</div>`
            
            // closing off 'days' div
            view += `</div>`


            

            apiDataContainer.innerHTML = view
        })
    
    event.preventDefault()
})

let showLoader = () => {
    loader.style.display = 'block'
}

let hideLoader = () => {
    loader.style.display = 'none'
}

let showError = () => {
    apiDataContainer.innerHTML=`<div class="error">Your city was not found or we have network problems.</div>`
}

let getLocation = () => {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError) 
}

let geoSuccess = (pos) => {
    const lat = pos.coords.latitude
    const lng = pos.coords.longitude
    console.log('Your current position:')
    console.log(lat)
    console.log(lng)

    // Searching by coordinates works fine with our weather api
    document.querySelector('.city').value = (lat.toString() + ' ' + lng.toString())
    document.querySelector('.city').focus()    
}

let geoError = () => {
    alert("Cannot get your location right now. Type in city manually.")
}


let localisator = document.querySelector('.fa-location-crosshairs')
localisator.addEventListener('click', (e) => {
    getLocation()
})

