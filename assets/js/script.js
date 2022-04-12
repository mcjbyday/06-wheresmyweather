// TO DO
// achieve display for wind speed, temperature, UV index, humidity)
// local storage of city names entered (last 10)

// DONE
// use bootsrtap card elements for display of the weather data (// 
// use bootstrap to get list elements .. https://getbootstrap.com/docs/5.1/components/list-group/
// image icons // var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
// error handling pass... 

// open weather  api key. no .env since this key is freely available
let key = "7ae7dba060e77b33b1fb1687f4a2e16b";
 
// select relevant page tags for DOM content injection
var bigCityEl = $('#current_city_name');
var bigCurrentDate = $('#current_date');
var iconEl = $('#icon_span');
var currentCityTemp = $("#current_city_temp");
var currentCityWind = $("#current_city_wind");
var currentCityHumid = $("#current_city_humidity");
var currentCityUVI = $("#current_city_UVI");
var currentWeatherIcon = $(".current_weather_icon");
var forecastContainerEl = $('.forecast_card_container');

// get city name from user form
var userCityInputEl = $('#city_input');
// hook into button it clicking when a keyup equals enter in the form field
var searchButton = $('.btn');

// event listeners for button click or search
searchButton.on("click", weatherSearch);    

userCityInputEl.keydown( e => {
    if (e.keyCode === 13) {
        weatherSearch();
    } 
});    



// LOCAL STORAGE
// get local user storage data in order to append and/or render searches
var userSearchHistory = JSON.parse(localStorage.getItem("userSearchHistory"));

// if (userSearchHistory === null) {
//     Storage.clear();
// }
// else if (userSearchHistory[0].searchedCityName !== null) {
//     storeCitySearch(userSearchHistory[0].searchedCityName);
//     getWeather(userSearchHistory[0].searchedCityName);
//     getForecast(userSearchHistory[0].searchedCityName);
// }



// list to which past searches will be added
var searchListContainerEl = $(".list-group");
initializeSearchHistory();

// check local storage to see if there's some data to grab and display
function initializeSearchHistory() {
    // check local storage to see if there's some data to grab and display
    // if there is something, display it If not, go on with rendering.
    if (userSearchHistory !== null) {
        displaySearchHistory();
    }
    else {
        var placeholderSearchItemEl = $(`<a href="#" class="list-group-item list-group-item-action list-group-item-dark text-center" >Prior city searches will appear here...</a>`);
        searchListContainerEl.append(placeholderSearchItemEl);
    }
}
    

// inject / display the score list into HTML
function displaySearchHistory() {
    // sort the searches from most recent to farthest back in time
    if (userSearchHistory.length > 5) {
        var iterateLength = 5;
    }
    else if (userSearchHistory.length <= 5 && userSearchHistory.length > 0) {
        var iterateLength = userSearchHistory.length;
    }
    else if (userSearchHistory.length === null) {
        return;
    }
    // console.log(userSearchHistory);
    for (var i = 0; i < iterateLength; i++) {
        // declare the particular list item from the todos array
        var city = userSearchHistory[i].searchedCityName;
        // for that list item make the list item in the DOM

        var pastSearchItemEl = $(`<a href="#" class="list-group-item list-group-item-action list-group-item-dark text-center col-3" >${city}</a>`);
        // populate its text as array value
        searchListContainerEl.append(pastSearchItemEl);
    }
}

function storeCitySearch(searchedCity) {
    if (userSearchHistory === null) {
        userSearchHistory = [{
            searchedCityName: searchedCity
        }];
    }
    else {
        userSearchHistory.unshift({searchedCityName: searchedCity});
    }
    // console.log(userSearchHistory);
    // store userSearchHistory item in local storage as strings 
    localStorage.setItem("userSearchHistory", JSON.stringify(userSearchHistory));
}


function weatherSearch() {
    // console.log(userCityInputEl.val())
    var inputText = userCityInputEl.val();
    // console.log(inputText);
    storeCitySearch(inputText);
    clearCards();
    getWeather(inputText);
    getForecast(inputText);
}

function clearCards() {
    $(".five-day").remove();
}

// RETRIEVE GEOLOCATION DATA AND CITY FORECAST DATA
function getWeather(cityname) {
    // console.log(cityname);
    // geocoding API fetch
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${key}`)
    .then(response => response.json())
    .then(latlongData => {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latlongData[0].lat}&lon=${latlongData[0].lon}&appid=${key}`)
    })
    .then(response => response.json())
    .then(forecastData => {
        // console.log("forecast API");
        // console.log(forecastData);
        // var days = 6;
        // console.log(moment.unix(forecastData.list[days].dt).format("MM/DD/YYYY"));
        for (i = 0; i < 5; i++) {
            var dt = moment.unix(forecastData.list[days].dt).format("MM/DD/YYYY");
            var forecastCard = $(`<div class="card text-white bg-dark mb-3 five-day" style="min-width: 12rem; max-width: 12rem;"><div class="card-body"><h5 class="card-title">${dt}</h5><p class="card-text">ICON</p><p class="card-text">Temp: ${forecastData.list[days].main.temp} F</p><p class="card-text">Wind: ${forecastData.list[days].wind.speed} MPH</p><p class="card-text">Humidity: ${forecastData.list[days].main.humidity} %</p></div></div>`);
            forecastContainerEl.append(forecastCard);
            days += 8;
        }
    });
}
// RETRIEVE REMAINING CITY WEATHER STATUS ICON AND FORECAST
function getForecast(cityname) {
    // geocoding API fetch
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${key}`)
    .then(response => response.json())
    .then(latlongData2 => {
        var shortLat = (latlongData2[0].lat).toFixed(2);
        var shortLon = (latlongData2[0].lon).toFixed(2);
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${shortLat}&lon=${shortLon}&exclude=hourly,daily&units=imperial&appid=${key}`)
    })
    .then(response => response.json())
    .then(weatherData => {
        // TO DO
        // console.log(forecastData.weather[0].icon);
        console.log("this is weather");
        console.log(weatherData);
        currentCityTemp.text(weatherData.current.temp + "F");
        currentCityWind.text(weatherData.current.wind_speed + " MPH");
        currentCityHumid.text(weatherData.current.humidity + "%");
        bigCityEl.text(cityname);
        var imageSrc = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`;
        iconEl.attr("src", imageSrc);
        bigCurrentDate.text(moment.unix(weatherData.current.dt).format("MM/DD/YYYY"));
        currentCityUVI.text("UV Index: " + weatherData.current.uvi)
    });
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