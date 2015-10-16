/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/

// when the DOM content has been loaded...
$(function() {
    "use strict";
    $("a").attr("target", "_blank");
    $("article").hide().fadeIn(1000);
    $("#toggle-article").click(function()  {
       $("article").fadeToggle();
    });

    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';
    // test executes first because asynchronous. The webpage reloads when the data is back
    $.getJSON(url)
        // callback function; when the data has returned from the server...
        .then(function(data) {
            console.log(data);
            var temperature = data.main.temp;
            $("#temp").text(Math.round(temperature));

        });

    console.log("test");
});

