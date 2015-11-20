
document.addEventListener('DOMContentLoaded', function() {
    'use strict';


    // So many navigator because this is super new. The others are for Edge, FireFox, and Safari
    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;

    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var videoStream;
    var mouseIsDown = false;
    var snapshot = document.querySelector('img');

    navigator.getUserMedia({video : true}, function(stream) {
        videoStream = stream; // know we got the video
        video.src = window.URL.createObjectURL(stream);

    // if user does not give permission or the device doesn't have a camera
    }, function(err) {
        console.error(err);
    });

    video.addEventListener('click', function() {
        if (videoStream) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            ctx.drawImage(video, 0, 0);
        }

    });

    var mouseIsDown = false;
    var colorInp = document.querySelector('#line-color-inp');

    canvas.addEventListener('mousedown', function(evt) {
        mouseIsDown = true;
        ctx.lineWidth = 100;
        ctx.beginPath();
        ctx.moveTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
    });

    canvas.addEventListener('mousemove', function(evt) {
        if (mouseIsDown) {
            ctx.lineTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function(evt) {
        mouseIsDown = false;
        ctx.lineTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
        ctx.stroke();
    });

    colorInp.addEventListener('change', function(evt) {
        ctx.strokeStyle = colorInp.value;
    })

    canvas.addEventListener('mouseup', function(evt) {
        mouseIsDown = false;
    })

    document.querySelector('#btnSnapshot').addEventListener('click', function() {
        document.querySelector('img').src = canvas.toDataURL();
    })



});

