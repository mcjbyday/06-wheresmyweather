// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city 
// AND THEN that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// TO DO 06
// three api calls:
// correct weather info ; UV index ;  forecast

// once you make API call, you'll get latitude and longitude info. 
// UV API requires correct weather info

// separate API call for forecast

// use city information as an argument for API call functions function with argument. pass to API call. use as query parameter

// --- after API calls are successful --- 
// achieve display for wind speed, temperature, UV index, humidity
// use ICON Url for displaying ICONS for weather


// var badRequestUrl = 'https://api.github.com/unicorns';
// var redirectUrl = './404.html';
// pass city?

// get city name from user form 
// put into local storage?
// var cityName = prompt("Provide a city name");
// var cityName = "Chicago";
// var cityCodeRequest = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+key;
// one call you get the lat and long before you pass

//geocoding api


// var weatherInfoRequest = " api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + key;

// open weather  api key
let key = "7ae7dba060e77b33b1fb1687f4a2e16b";
// OMDB api key
let OMDbkey = "7a459757";

// array of strings in local storage .. keep track of the last 10 only

var latlongEl = document.createElement('h1');
var bigCityEl = document.createElement('h1');
var bigWeatherEl = document.createElement('h1');
var movieEl = document.createElement('h1');
var congressEl = document.createElement('img');

// geocoding API fetch
fetch(`https://api.openweathermap.org/geo/1.0/direct?q=Chicago&appid=${key}`)
.then(response => response.json())
.then(latlongData => {
    
    console.log(latlongData);
    latlongEl.textContent = latlongData[0].lat + " " + latlongData[0].lon;
    bigCityEl.textContent = "it is I... ya boy from " + latlongData[0].name;
    // forecasting API fetch, using geo data as parameter to pass
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlongData[0].lat}&lon=${latlongData[0].lon}&appid=${key}`)
})
.then(response => response.json())
.then(cityData => {

    console.log(cityData);

    bigWeatherEl.textContent = "we outhere getting some: " + cityData.list[0].weather[0].main;

});




 fetch(`https://www.omdbapi.com/?apikey=${OMDbkey}&t=clerks`)
 .then(response => response.json())
 .then(data => {
     console.log(data);
    movieEl.textContent = data.Title + " released on " + data.Released;
 })


 fetch(`https://www.loc.gov/item/92522692?fo=json`)
 .then(response => response.json())
 .then(data => {
     console.log(data.item.image_url);
    congressEl.src = data.item.image_url;
 })


document.body.appendChild(latlongEl);
document.body.appendChild(bigCityEl);
document.body.appendChild(bigWeatherEl);


document.body.appendChild(movieEl);
document.body.appendChild(congressEl);



// fetch(weatherInfoRequest).then(function(response) {
//   // Use a conditional to check the response status.
//   console.log(response.status);
//     // Then write the conditional based on that response.status value
//     if (response.status === 403 || response.status === 404) {
//       window.location.replace(redirectUrl);
//     });

