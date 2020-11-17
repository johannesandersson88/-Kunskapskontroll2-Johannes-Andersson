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
            const country = data.sys.country;
            const status = data.weather[0].description;
            const temp = data.main.temp;
            const windSpeed = data.wind.speed;
            const moist = data.main.humidity;
            const icon = data.weather[0].icon;

            changeCityHead(city, country, status, temp, windSpeed, moist, icon);
            makeCityList(city, temp, windSpeed, moist);
            hotOrNot(temp);
            //Funktion för att skapa en knapp för jämförelse. 

        }
    ).catch(
        function (error) {
            alert(error);
        }
    )
});

function changeCityHead(ci, cty, st, te, ws, mst, i) {
    let changeLocation = document.querySelector('.location');
    changeLocation.innerHTML = ci + ', ' + cty;

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
    changeIcon.src = `https://openweathermap.org/img/wn/${iconID}@2x.png`

};

function makeCityList(ci, te, ws, mst) {
    let newList = document.querySelector('.city-comparison');

    let ul = document.createElement('ul');

    let h3 = document.createElement('h3');
    ul.appendChild(h3);
    h3.innerHTML = ci;

    let liTemp = document.createElement('li');
    ul.appendChild(liTemp);
    liTemp.innerHTML = te + '°';

    let liWind = document.createElement('li');
    ul.appendChild(liWind);
    liWind.innerHTML = ws + ' m/s';

    let liMoist = document.createElement('li');
    ul.appendChild(liMoist);
    liMoist.innerHTML = mst + ' %';

    newList.append(ul);


    ul.style.listStyle = 'none';
    ul.style.textAlign = 'center';
    ul.style.color = '#fff';
    h3.style.borderBottom = '1px solid #fff';
    h3.style.fontSize = '25px';
    h3.style.marginBottom = '10px';

    liTemp.style.fontSize = '20px';
    liTemp.style.padding = '5px';
    liWind.style.fontSize = '20px';
    liWind.style.padding = '5px';
    liMoist.style.fontSize = '20px';
    liMoist.style.padding = '5px';
};


function hotOrNot(te) {
    let changeTemp = document.querySelector('.tempCheck');

    if (te >= 20) {
        changeTemp.style.color = 'yellow';
        changeTemp.innerHTML = `<i class="fas fa-cocktail"></i>`;
    } else if (te > 10) {
        changeTemp.style.color = 'green';
        changeTemp.innerHTML = `<i class="fas fa-futbol"></i>`;
    } else {
        changeTemp.style.color = 'blue';
        changeTemp.innerHTML = `<i class="fas fa-snowman"></i>`;
    }

}
