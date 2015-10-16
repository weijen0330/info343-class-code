/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/

$(function() {
    "use strict";
    function createMap(loc, zoom) {
        var map = L.map('map').setView(loc, zoom);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // the bindPopUp contains an html element!
        L.circleMarker(loc).addTo(map).bindPopup('Hello');
    }

    // testing. Making sure browser knows how to do that. ps.navigator just exists, like document

    if (navigator.geolocation) {
        // getCurrentPosition is asynchronous. No then() because older implementation
        navigator.geolocation.getCurrentPosition(function(pos) {
            createMap([pos.coords.latitude, pos.coords.longitude], 15);
        });
    } else {
        createMap([47.6097, -122.3331], 12);
    }
});