var currentCity = 'Chicago'
var recentCities = ['Chicago']
var apiKey = 'c9ef626d3d26fe5016c7a097d15877da'

document.getElementById('searchBtn').addEventListener("click", newCitySearch)

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} - current weather
var currentWeatherCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + currentCity + '&appid=' + apiKey
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} - 5 day forecast
var fiveDayCall = 'https://www.api.openweathermap.org/data/2.5/forecast?q=' + currentCity + "&appid=" + apiKey

// API call on page load

// On click search button function
function newCitySearch() {
    var searchText = document.getElementById ('citySearchForm').innerText
    currentCity = searchText
    e.preventDefault()
    console.log(currentCity)
}