var APPID = "4e322d563e8c4e2c1d666efd75a0805b";
var loc;
var icon;


function update(weather) {
    icon.src = "img/" + weather.code + ".jpg";
}

window.onload = function () {
    loc = document.getElementById("location");
    icon = document.getElementById("icon");

    if(navigator.geolocation){
    var showPosition = function(position){
        updateByGeo(position.coords.latitude, position.coords.longitude);
    }
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    var zip = window.prompt("Could not discover your location. What is your zip code?");
    updateByZip(zip);
    }

}


function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "lat=" + lat +
    "&lon=" + lon +
    "&APPID=" + APPID;
    sendRequest(url);    
}


function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
        var weather = {};
        weather.code = data.weather[0].id;
        weather.location = data.name;   
        update(weather);
    }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}


