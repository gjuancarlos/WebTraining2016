/// <reference path="jquery-3.1.1.js" />

var watchId = 0;

$(document).ready(function () {
    getLocation();
})

function getLocation() {
    if (supportsGeoLocation()) {
        watchId = navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        showMessage("Geolocation is not supported");
    }
}

function supportsGeoLocation()
{
    return 'geolocation' in navigator;
}

function showMessage(message) {
    $('#message').html(message);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showMessage("Permission denied");
            break;
        case error.POSITION_UNAVAILABLE:
            showMessage("Position unavailable");
            break;
        case error.TIMEOUT:
            showMessage("Timeout");
            break;
        case error.UNKNOWN_ERROR:
            showMessage("Unknown error");
            break;
    };
}

function showPosition(position) {
    var mapcanvas = document.getElementById('map');
    var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var options = {
        zoom: 13,
        center: coords,
        mapTypeControl: false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(mapcanvas, options);
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "You are here!"
    })
}

