// Min personliga API key
const apiKey = '8080185354e3479dfc40e61fc766810c';


// Väljer input och submitknappen för att kunna använda dom.
let getCity = document.querySelector('.city');


// Vad som händer när du antingen trycker enter elle submit. 
getCity.addEventListener('submit', function (event) {

    // Om inte funktionen funkar, ska inte normala åtgärder utföras utan min egen kod.
    event.preventDefault();


    // Hämtar texten som användare skriver in i fältet 'Välj en stad'.
    let cityInput = document.querySelector('#city-search');
    const citySearch = cityInput.value;

    // Vilken destination vi hämtar information ifrån. CitySearch är värdet från användaren, lang är svenska, units ger oss allt i metric, dvs svenska termer, apiKey är unik.
    const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&lang=sv&units=metric&appid=${apiKey}`;

    // Tar bort texten användaren skrivit in efter! man har gjort en submit.
    cityInput.value = '';


    // Hämtar informationen och gör om den till JSON. 
    fetch(cityURL).then(
        function (response) {

            // Om vi får tillbaka ett positivt svar från APIn. 
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                // Felmeddelande om staden ej hittas
                throw 'Staden kunde inte hittas, prova en annan!'
            }
        }
    ).then(
        function (data) {
            // Hämtar informationen från API beroende på stad.
            const city = data.name; // Stadens Namn.
            const country = data.sys.country; // Vilket land staden ligger i.
            const status = data.weather[0].description; // Väderbeskrivning.
            const temp = data.main.temp;    // Temperatur. 
            const windSpeed = data.wind.speed;  // Vindhastighet.
            const moist = data.main.humidity;   // Luftfuktighet.
            const icon = data.weather[0].icon; // Vilken icon det aktuella vädret har.


            // Kallar på funktionerna där vi trycker in Datan från APIn vi får tillbaka. 
            changeCityHead(city, country, status, temp, windSpeed, moist, icon);

            // Kallar på funktionen där vi skapar en mindre lista för jämförelse. 
            makeCityList(city, temp, windSpeed, moist);

            // Kallar funktionen som ändrar ikon och färg på ikonen beroende på vilken temperatur som ges tillbaka. 
            hotOrNot(temp);


        }
    ).catch(

        //Funktion för felmeddelande, en alert som låser hela sidan och måste tryckas på för att fortsätta. 
        function (error) {
            alert(error);
        }
    )
});


// Funktion för att ändra värdena på dom statiska elementen som redan finns där.  
function changeCityHead(ci, cty, st, te, ws, mst, i) {

    // Stad plus land 
    let changeLocation = document.querySelector('.location');
    changeLocation.innerHTML = ci + ', ' + cty;

    // Vädrets status, i Capitalize för datan från APIn är lowercase. 
    let changeStatus = document.querySelector('.status');
    changeStatus.innerHTML = st;
    changeStatus.style.textTransform = 'capitalize';

    // Temperatur plus enhetsbetäckning
    let changeTemperatur = document.querySelector('.temp');
    changeTemperatur.innerHTML = te + '°';

    // Vindhastighet plus enhetsbetäckning
    let changeWindSpeed = document.querySelector('.wind');
    changeWindSpeed.innerHTML = ws + ' m/s';

    // Luftfuktighet plus enhetsbetäckning
    let changeMoist = document.querySelector('.moist');
    changeMoist.innerHTML = mst + ' %';

    // Ny ikon, där vi ändrar URL till det värde vi får från API. 
    changeIcon = document.querySelector('.img');
    const iconID = i;
    changeIcon.src = `https://openweathermap.org/img/wn/${iconID}@2x.png`

};

// Lista för att kunna jämföra städer och spara alla sökningar man gjort. 
function makeCityList(ci, te, ws, mst) {

    // Väljer var listan ska hamna på sidan 
    let newList = document.querySelector('.city-comparison');

    // Skapar en lista
    let ul = document.createElement('ul');

    // Skapar en Rubrik för stadens namn, samt lägger in det i listan och ändrar till datan från API.
    let h3 = document.createElement('h3');
    ul.appendChild(h3);
    h3.innerHTML = ci;

    // Skapar ett list-element för stadens temperatur, samt lägger in det i listan och ändrar till datan från API.
    let liTemp = document.createElement('li');
    ul.appendChild(liTemp);
    liTemp.innerHTML = te + '°';

    // Skapar ett list-element för stadens vindhastighet, samt lägger in det i listan och ändrar till datan från API. 
    let liWind = document.createElement('li');
    ul.appendChild(liWind);
    liWind.innerHTML = ws + ' m/s';

    // Skapar ett list-element för stadens luftfuktighet, samt lägger in det i listan och ändrar till datan från API. 
    let liMoist = document.createElement('li');
    ul.appendChild(liMoist);
    liMoist.innerHTML = mst + ' %';

    // Trycker in hela listelementet på den plats vi valde först. 
    newList.append(ul);

    // CSS style på listan och list-elementen. 
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

    XMLHttpRequest = 10;
};

// Funktion för att ändra ikon och färg på ikon utifrån datan från API. 
function hotOrNot(te) {

    // Väljer den statiska ikonen som redan finns. 
    let changeTemp = document.querySelector('.tempCheck');

    // Väljer tre olika span av temperaturer, med tillhörande färg och ikon. 
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

};
