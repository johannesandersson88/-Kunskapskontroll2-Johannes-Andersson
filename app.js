// Min personliga API key
const apiKey = '8080185354e3479dfc40e61fc766810c';


// Hämta lista på städer vid input

let getCity = document.querySelector('.city');
console.log(getCity)

getCity.addEventListener('submit', function (event) {
    event.preventDefault();

    let cityInput = document.querySelector('#city-search');
    const citySearch = cityInput.value;

    const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&lang=sv&units=metric&appid=${apiKey}`;
    console.log(cityURL)

    cityInput.value = '';
    fetch(cityURL).then(
        function (response) {

            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                throw 'Staden kunde inte hittas, prova en annan'
            }
        }
    ).then(
        function (data) {
            console.log(data)

            // Hämtar informationen från API beroende på stad.
            const city = data.name;
            const status = data.weather[0].description;
            const temp = data.main.temp;
            const windSpeed = data.wind.speed;
            const moist = data.main.humidity;
            const icon = data.weather[0].icon;

            changeCityHead(city, status, temp, windSpeed, moist, icon)
        }
    ).catch(
        function (error) {
            alert(error);
        }
    )
});

function changeCityHead(ci, st, te, ws, mst, i) {
    let changeLocation = document.querySelector('.location');
    changeLocation.innerHTML = ci;

    let changeStatus = document.querySelector('.status');
    changeStatus.innerHTML = st;
    changeStatus.style.textTransform = 'capitalize';

    let changeTemperatur = document.querySelector('.temp');
    changeTemperatur.innerHTML = te + '°';

    let changeWindSpeed = document.querySelector('.wind');
    changeWindSpeed.innerHTML = ws + ' m/s';

    let changeMoist = document.querySelector('.moist');
    changeMoist.innerHTML = mst + ' %';

    changeIcon = document.querySelector('.img');
    const iconID = i;
    changeIcon.src = `https://openweathermap.org/img/wn/${iconID}.png`

}
