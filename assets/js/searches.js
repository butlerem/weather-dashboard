//array for local storage
var citiesArray = [];
var recentCities = document.querySelector('#recent-searches');

//retrieving from local storage
var retrieveLocalStorage = function () {
    var LocalStorageRetrieve = JSON.parse(localStorage.getItem('city'));

    if (LocalStorageRetrieve) {
        recentCities.textContent = ''
        for (let i = 0; i < LocalStorageRetrieve.length; i++) {
            var makeButton = buttonCreation(LocalStorageRetrieve[i].city);
            makeButton.setAttribute('class', 'btn btn-secondary m-2 city-button')
            recentCities.appendChild(makeButton);
        }
    } else {
        recentCities.innerHTML = "Your recent searches will show here!"
    }
};
var loadLocalStorage = function () {
    if (localStorage.getItem('city')) {
        var LocalStorageRetrieve = JSON.parse(localStorage.getItem('city'));

        for (let i = 0; i < LocalStorageRetrieve.length; i++) {
            var cityCaptureObj = {
                city: LocalStorageRetrieve[i].city
            };
            
            citiesArray.push(cityCaptureObj);
        }
        retrieveLocalStorage();
    } else {
        recentCities.innerHTML = "Your recent searches will show here!"
    }
};
var getButtonValue = function (value) {
    var buttonValue = value.innerHTML;
    locationApiCall(buttonValue);
};

loadLocalStorage();
locationApiCall('Tampa');

var buttonCreation = function (content) {
    var citybtn = document.createElement('button');
    citybtn.textContent = content;
    citybtn.onclick = function () { getButtonValue(this); };
    return citybtn
};
