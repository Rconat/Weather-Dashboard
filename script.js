var currentDay = moment().format('MMMM Do YYYY')
var currentTime = moment().format('h:mm a')
var currentCity = 'Chicago'
var recentCities = ['Chicago']
var apiKey = 'c9ef626d3d26fe5016c7a097d15877da'

document.getElementById('searchBtn').addEventListener("click", newCitySearch)

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} - current weather
var currentWeatherCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + currentCity + '&units=imperial' + '&appid=' + apiKey
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} - 5 day forecast
var fiveDayCall = 'http://api.openweathermap.org/data/2.5/forecast?q=' + currentCity + "&appid=" + apiKey

// Page Load
$(document).ready(function () {
    // API call for current weather    
    $.ajax({
        url: currentWeatherCall,
        method: 'GET',
        dataType: "jsonp",
        cors: true,
        contentType: "application/json",
    }).then(function (result) {

        // input response data into the DOM
        $('#currentCityText').text(result.name);
        $('#currentDate').text(currentDay);
        $('#currentTime').text(currentTime);
        $('#currentTemp').text(result.main.temp + "\u00B0 F");
        $('#currentWindSpeed').text(result.wind.speed + " mph");
        $('#currentHumidity').text(result.main.humidity + "%");

        //variable for the weather icon
        const icon = result.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

        // appending weather icon to the DOM
        $('#currentCondition').append(
            `<img id="weatherIcon" src=${iconUrl}>`
        )
        
        // URL for UV ajax call
        const uvCallURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + result.coord.lat + '&lon=' + result.coord.lon + '&units=imperial' + '&appid=' + apiKey
        
        // ajax call for UV info
        $.ajax({
            url: uvCallURL,
            method: 'GET'
        }).then(function (resultUV) {
            console.log(resultUV)
            $('#currentUV').text(resultUV.value)
        });
    });
});



// On click search button function
function newCitySearch() {
    var searchText = document.getElementById ('citySearchForm').innerText
    currentCity = searchText
    console.log(currentCity)

    // add city to the local storage to keep it saved
    localStorage.setItem("selectedCity", currentCity)
    localStorage.setItem("savedCities", recentCities)
}