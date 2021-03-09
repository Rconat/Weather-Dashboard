var currentDay = moment().format('MMMM Do YYYY')
var currentTime = moment().format('h:mm a')
var currentCity = JSON.parse(localStorage.savedCities)[0]
const apiKey = 'c9ef626d3d26fe5016c7a097d15877da'
var recentCities = JSON.parse(localStorage.savedCities)

// Page Load
$(document).ready(function () {
    
    // if there is no localstorage push
    if (currentCity === undefined) {
        
        recentCities.push("Chicago")
        
        localStorage.setItem('savedCities', JSON.stringify(recentCities))
        console.log(recentCities)
    } else {
        var recentCities = localStorage.savedCities
        console.log(recentCities)
        console.log(currentCity)
    }

    // Populate side bar with recent cities
    var i;
    console.log(JSON.parse(localStorage.savedCities).length)
    if ((JSON.parse(localStorage.savedCities).length) <= 10) {
        for (i = 0; i < JSON.parse(localStorage.savedCities).length; i++) {
            $('#savedCities').append(
                `<li class=recentCity id='${[i+1]}'>
                    ${JSON.parse(localStorage.savedCities)[i]}
                </li>`
            )
        }
    } else {
        for (i = 0; i < 10; i++) {
            $('#savedCities').append(
                `<li class=recentCity id='${[i+1]}'>
                    ${JSON.parse(localStorage.savedCities)[i]}
                </li>`
            )
        }
    }
    
    var currentWeatherCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + currentCity + '&units=imperial' + '&appid=' + apiKey

    var fiveDayCall = 'http://api.openweathermap.org/data/2.5/forecast?q=' + currentCity + '&units=imperial' + "&appid=" + apiKey

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
            $('#currentUV').text(resultUV.value)
        });
    });

    // API call for 5 day forecast
    $.ajax({
        url: fiveDayCall,
        method: 'GET',
        dataType: "jsonp",
        cors: true,
        contentType: "application/json",
    }).then(function (fiveDayResult) {

        // populate five day forecast days
        $('#fiveDay1Date').text((moment().day(moment().day())._d).toString().slice(0, 10))
        $('#fiveDay2Date').text((moment().day(moment().day()+1)._d).toString().slice(0, 10))
        $('#fiveDay3Date').text((moment().day(moment().day()+2)._d).toString().slice(0, 10))
        $('#fiveDay4Date').text((moment().day(moment().day()+3)._d).toString().slice(0, 10))
        $('#fiveDay5Date').text((moment().day(moment().day()+4)._d).toString().slice(0, 10))

        // populate five day forecast conditions
        $('#fiveDay1Condition').text(fiveDayResult.list[0].weather[0].main)
        $('#fiveDay2Condition').text(fiveDayResult.list[1].weather[0].main)
        $('#fiveDay3Condition').text(fiveDayResult.list[2].weather[0].main)
        $('#fiveDay4Condition').text(fiveDayResult.list[3].weather[0].main)
        $('#fiveDay5Condition').text(fiveDayResult.list[4].weather[0].main)

        // populate five day forecast temp
        $('#fiveDay1Temp').text(fiveDayResult.list[0].main.temp + "\u00B0 F")
        $('#fiveDay2Temp').text(fiveDayResult.list[1].main.temp + "\u00B0 F")
        $('#fiveDay3Temp').text(fiveDayResult.list[2].main.temp + "\u00B0 F")
        $('#fiveDay4Temp').text(fiveDayResult.list[3].main.temp + "\u00B0 F")
        $('#fiveDay5Temp').text(fiveDayResult.list[4].main.temp + "\u00B0 F")

        // populate five day forecast Humidity
        $('#fiveDay1Humidity').text(fiveDayResult.list[0].main.humidity + "%")
        $('#fiveDay2Humidity').text(fiveDayResult.list[1].main.humidity + "%")
        $('#fiveDay3Humidity').text(fiveDayResult.list[2].main.humidity + "%")
        $('#fiveDay4Humidity').text(fiveDayResult.list[3].main.humidity + "%")
        $('#fiveDay5Humidity').text(fiveDayResult.list[4].main.humidity + "%")

    })
    
});


// On click search button function
$("form").submit(function(event){
    // event.preventDefault();
    var searchedCity = $("input").val()

    // add city to the local storage to keep it saved
    console.log(recentCities, searchedCity)
    recentCities.unshift(searchedCity)
    console.log(recentCities)

    localStorage.setItem('savedCities', JSON.stringify(recentCities))
    console.log(JSON.parse(localStorage.savedCities))

})

$('#savedCities').on('click', '.recentCity', function(){
    console.log($(this).text().trim())
    var searchedCity = $(this).text().trim()
    recentCities.unshift(searchedCity)
    localStorage.setItem('savedCities', JSON.stringify(recentCities))
    location.reload();
})