let weatherform = document.querySelector('.weatherForm')
let apiURL = "https://api.weatherapi.com/v1/forecast.json?key=d132cd6234a44a599e1124638221203&days=7&q="
let apiDataContainer = document.querySelector('.apiData')
let loader = document.querySelector('.loader')

weatherform.addEventListener('submit', (event) => {
    showLoader()
    let userCity = document.querySelector('.city').value
    let userApiURL = apiURL + userCity

    fetch(userApiURL)
    .then(response => response.json())
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

            view += `<div class="days">`
            dataFromApi.forecast.forecastday.forEach((day) => {
                
                //day
            view += `<div class="day">`
            view += `<div class="date">${day.date}</div>`
            view += `<div class="icon"><img src="${day.day.condition.icon}" alt="weatherIcon"</div>`
            view += `<div class="avgTemp">${day.day.avgtemp_c}<span><sup>o</sup>C</span></div>`    
            view += `</div>`

            })

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