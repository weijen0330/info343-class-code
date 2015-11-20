/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // result --> whether user approves it or not
    function askPermission() {
        Notification.requestPermission(function(result) {
            if ('granted' === result) {
                showNotification('Thanks! Bro', ':D' );
            }
        });
    }

    function showNotification(title, body) {
        var note =  new Notification(title, {body: body, icon: 'img/notification.png'});
        // dismiss notification after 3 seconds

        function dismissAlert() {
            note.close();
        }
        // window.setTimeout(note.close.bind(note), 3000) also works
        // bind tells which note object to close
        window.setTimeout(dismissAlert, 3000);


    }

    var triggerBtn = document.getElementById('trigger');

    triggerBtn.addEventListener('click', function() {

        // swith on notification's permission if...
        switch(Notification.permission) {
            case 'granted' :
                showNotification('Hello', 'triggered at' + new Date().toLocaleTimeString());
                break;
            case 'denied' :
                alert('Please enable notifications!');
                break;
            default:
                askPermission();
        }
    })
});
