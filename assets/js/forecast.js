var checkUVIndex = function (uvindex, uvIndexLiEl) {
    if (uvindex < 3) {
        uvIndexLiEl.setAttribute('class', 'bg-success')
    } else if (3 < uvindex && uvindex < 6) {
        uvIndexLiEl.setAttribute('class', 'bg-warning')
    } else {
        uvIndexLiEl.setAttribute('class', 'bg-danger')
    }
    return uvIndexLiEl
};
const date = new Date()
var day = date.getDate()
var month = date.getMonth() + 1;
var year = date.getFullYear();

var TimeCheck = function () {
    const currentDate = `(${month}/${day}/${year})`
    return currentDate;
};

var FutureCheck = function (i) {
    const futureDay = day + i + 1
    const futureDate = `(${month}/${futureDay}/${year})`
    return futureDate;
}

var generateCurrent = function (weather, cityname) {
    var current = weather.current;
    var headingEl = document.querySelector('#location');
    headingEl.textContent = cityname + " " + TimeCheck();
    var temp = current.temp;
    var wind = current.wind_speed;
    var humidity = current.humidity;
    var uvIndex = current.uvi;

    var uvIndexLiEl = document.createElement('li')
    uvIndexLiEl.textContent = `UV Index: ${uvIndex}`
    var currentConditions = document.querySelector('#current-conditions')

    currentConditions.innerHTML = `
    <li> Temperature: ${temp} \u00B0F  </li>
    <li> Wind: ${wind} MPH </li>
    <li> Humidity: ${humidity} %</li>
    `
    currentConditions.appendChild(uvIndexLiEl)
    checkUVIndex(uvIndex, uvIndexLiEl)
};
var generateImage = function (WeatherConditions) {
    var WeatherImage = document.createElement('img');
    if (199 < WeatherConditions && WeatherConditions < 233) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png')
    } else if (299 < WeatherConditions && WeatherConditions < 322) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png')
    } else if (499 < WeatherConditions && WeatherConditions < 532) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png')
    } else if (599 < WeatherConditions && WeatherConditions < 623) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png')
    } else if (700 < WeatherConditions && WeatherConditions < 782) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png')
    } else if (WeatherConditions == 800) {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png')
    } else {
        WeatherImage.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png')
    }
    return WeatherImage;
};

//generates the next five day forecast
var getFiveDays = function (weather) {
    //saves array of objects (7 day forecast) to a varriable
    var daily = weather.daily

    //selects container where five days will go 
    var fiveDay = document.querySelector('#five-day')

    fiveDay.innerHTML = ''
    //creates five div cards to contain weather information
    for (let i = 0; i < daily.length - 3; i++) {
        //formating for the next five dates
        var dateHeadingContent = FutureCheck(i);
        var dailyWeatherConditions = daily[i].weather[0].id;
        var dailyTemp = daily[i].temp.day;
        var dailyWind = daily[i].wind_speed;
        var dailyHummidity = daily[i].humidity;

        var dayDivEl = document.createElement('div');
        var dateHeadingEl = document.createElement('h3');
        var ulEl = document.createElement('ul');
        var daytempLiEl = document.createElement('li');
        var daywindLiEl = document.createElement('li');
        var dayhummidityiEl = document.createElement('li');

        var dailyIcon = generateImage(dailyWeatherConditions);

        dayDivEl.setAttribute('class', 'card col-auto bg-info m-1 border border-dark');
        dateHeadingEl.setAttribute('class', 'card-text text-white');
        daytempLiEl.setAttribute('class', 'card-text text-white');
        daywindLiEl.setAttribute('class', 'card-text text-white');
        dayhummidityiEl.setAttribute('class', 'card-text text-white');
        dailyIcon.setAttribute('class', 'card-img-top')

        dateHeadingEl.textContent = dateHeadingContent;
        daytempLiEl.textContent = `Temperature: ${dailyTemp} \u00B0F`;
        daywindLiEl.textContent = `Wind: ${dailyWind} MPH`;
        dayhummidityiEl.textContent = `Humidity: ${dailyHummidity} %`;

        dayDivEl.appendChild(dateHeadingEl);
        dayDivEl.appendChild(dailyIcon);
        dayDivEl.appendChild(ulEl)
        ulEl.appendChild(daytempLiEl);
        ulEl.appendChild(daywindLiEl);
        ulEl.appendChild(dayhummidityiEl);
        fiveDay.appendChild(dayDivEl);
    };
};