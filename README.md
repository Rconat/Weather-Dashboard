# Weather-Dashboard
## Description 

The purpose of this project is to create a Weather Dashboard that can be used by anyone. The Weather Dashboard must be able to search for a city and return the current weather as well as provide the user with a 5-day forecast. Once the user searches for a new city the city is saved to a recent cities section on the side of the webpage which can be used to switch easily between past locations. These recent cities will be saved to local storage to be accessed later. The emphasis on the application is on functionality and easy user UI/UX. 


The webpage is hosted on [GitHub](https://rconat.github.io/Weather-Dashboard/).

You can find the repo on [GitHub](https://github.com/Rconat/Weather-Dashboard).

![Website Layout](/assets/main.png)

## Table of Contents

* [List of Files](#List-of-Files)
* [Usage](#usage)

## List of Files

<ul>
    <li>index.html</li>
    <li>style.css</li>
    <li>script.js</li>
    <li>README.md</li>
    <li>main.png</li>
</ul>

## Open Weather Map API

For this applicaiton I have made use of the openweathermap API. This API makes available all current weather data for any location around the globe. The data comes back as a JSON object which is then manipulated in the JavaScript to be used by the application and grab the appropriate data back to the user.

## Usage 

This application is available to any user who wishes to get current weather for any location as well as a 5-day forecast for any location. The user must first search for a city in the left hand panel. Once the user searches for a city the application makes an API call to the openweathermap.org API. The application then populates all the necessary information to the DOM to be viewed by the user. 

---

[![Read the Docs](https://readthedocs.org/projects/yt2mp3/badge/?version=latest)](https://yt2mp3.readthedocs.io/en/latest/?badge=latest)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat)]()