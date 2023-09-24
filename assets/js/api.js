var API_KEY = "822a2a6723192913b092c229b1d57bd7";
var part = 'alerts,minutely';

var locationCatch = function (event) {
    event.preventDefault();
    var cityCapture = document.querySelector('#city-capture').value.trim();
    if (cityCapture === '') {
        alert('Search Field is Blank!');
    } else {
        var cityCaptureObj = { city: cityCapture };
        citiesArray.push(cityCaptureObj);
        localStorage.setItem('city', JSON.stringify(citiesArray));
        locationApiCall(cityCapture)
        retrieveLocalStorage();
    }
}

//fetch function city name
var locationApiCall = function (cityname) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(function (response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon
            apiCall(lat, lon, cityname)
        })
        .catch(err => alert("404 Not Found"))
};

//fetch function based of lat lon
var apiCall = function (lat, lon, cityname) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIkey}&units=imperial`

    fetch(apiUrl)
        .then(response => response.json())
        .then(function (response) {
            //generates current weather
            generateCurrent(response, cityname);
            //generates five day weather
            getFiveDays(response);
        });
};
document.querySelector('#city-search').addEventListener('submit', locationCatch)