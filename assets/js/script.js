// use bootsrtap card elements for display of the weather data (// achieve display for wind speed, temperature, UV index, humidity)
// use bootstrap to get list elements .. https://getbootstrap.com/docs/5.1/components/list-group/
// local storage of city names entered (last 10)
// image icons // var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
// error handling pass... 

// open weather  api key. no .env since this key is freely available
let key = "7ae7dba060e77b33b1fb1687f4a2e16b";

 

// placeholder until bootstrap elements are defined
var bigCityEl = document.querySelector('.card-title');
var bigWeatherEl = document.createElement('h1');

var currentCityTemp = document.getElementById("#current_city_temp");
var currentCityWind = document.getElementById("#current_city_wind");
var currentCityHumid = document.getElementById("#current_city_humidity");
var currentCityUVI = document.getElementById("#current_city_UVI");
var currentWeatherIcon = document.querySelector(".current_weather_icon");

// get city name from user form
// var userCityInputEl = document.createElement('input');
var userCityInputEl = document.querySelector('.form-control');
// hook into button it clicking when a keyup equals enter in the form field
var searchButton = document.querySelector('.btn');

searchButton.addEventListener('click', function() {
    // console.log(userCityInputEl.value)
    var inputText = userCityInputEl.value;
    getWeather(inputText);
});    


userCityInputEl.addEventListener("keyup", e => {
    // console.log(e.keyCode);
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("search_btn").click();
    }    
    // console.log(e);
    // console.log(userCityInputEl.value);
});    


function getWeather(cityname) {
    // console.log(cityname);
    // geocoding API fetch
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${key}`)
    .then(response => response.json())
    .then(latlongData => {
        
        // console.log(latlongData);
        // latlongEl.textContent = latlongData[0].lat + " " + latlongData[0].lon;
        bigCityEl.textContent = latlongData[0].name;
        // forecasting API fetch, using geo data as parameter to pass
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlongData[0].lat}&lon=${latlongData[0].lon}&appid=${key}`)
    })
    .then(response => response.json())
    .then(cityData => {
        // console.log(cityData);
        // currentWeatherIcon.style = `https://openweathermap.org/img/w/${cityData.list[0].weather[0].main}.png`;
        // bigWeatherEl.textContent = cityData.list[0].weather[0].main;
        
    });

}

// function getForecast(cityname) {
//     // EITHER
//     // fetch(`https://FOO.COM/api/${latlongData[0].lat}&lon=${latlongData[0].lon}&appid=${key}`)
//     // OR
//     fetch(`https://FOO.COM/api/${cityname}&appid=${key}`)
//     .then(response => response.json())
//     .then(forecastData => {
//         // console.log(forecastData);
//         // update display elements...
//     });
// }

// card element forecast generation prototype/pseudocode
var forecastContainerEl = $('.forecast_card_container');

for (i = 0; i < 5; i++) {
    var forecastCard = $(`<div class="card text-white bg-dark mb-3" style="min-width: 12rem; max-width: 12rem;"><div class="card-body"><h5 class="card-title">Card number ${i}</h5><p class="card-text">Lorem ipsum dolor sit amet.</p><p class="card-text">Lorem ipsum dolor sit amet.</p><p class="card-text">Lorem ipsum dolor sit amet.</p><p class="card-text">Lorem ipsum dolor sit amet.</p></div></div>`);
    forecastContainerEl.append(forecastCard);
}

// prior searches list item generation prototype/pseudocode
// local storage prior searches list item 
var pastSearchContainerEl = $('.list-group');
for (i = 0; i < 5; i++) {
    var pastSearchItemEl = $(`<a href="#" class="list-group-item list-group-item-action list-group-item-dark" >A simple dark list group item number ${i}</a>`);
    //style="min-width: 8rem;"
    pastSearchContainerEl.append(pastSearchItemEl);
}


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

//  view last 10 cities searched .. i.e store inputs into local storage?
// array of strings in local storage .. keep track of the last 10 only

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
// DONE pass city?





// fetch(weatherInfoRequest).then(function(response) {
//   // Use a conditional to check the response status.
//   console.log(response.status);
//     // Then write the conditional based on that response.status value
//     if (response.status === 403 || response.status === 404) {
//       window.location.replace(redirectUrl);
//     });




//  fetch(`https://www.omdbapi.com/?apikey=${OMDbkey}&t=clerks`)
//  .then(response => response.json())
//  .then(data => {
//      console.log(data);
//     movieEl.textContent = data.Title + " released on " + data.Released;
//  })


//  fetch(`https://www.loc.gov/item/92522692?fo=json`)
//  .then(response => response.json())
//  .then(data => {
//      console.log(data.item.image_url);
//     congressEl.src = data.item.image_url;
//  })
