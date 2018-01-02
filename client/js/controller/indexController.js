//BELKI: sonra degistirebilirim
var currentIcon = '';
socket = io();

$(window).on('load', function(){

    // We are listening to the window.load event, so we can be sure
    // that the images in the slideshow are loaded properly.

    // Testing wether the current browser supports the canvas element:
    var supportCanvas = 'getContext' in document.createElement('canvas');

    // The canvas manipulations of the images are CPU intensive,
    // this is why we are using setTimeout to make them asynchronous
    // and improve the responsiveness of the page.

    var slides = $('#slideshow li'),
        current = 0,
        slideshow = {width:0,height:0};

    setTimeout(function(){

        if(supportCanvas){
            $('#slideshow img').each(function(){

                if(!slideshow.width){
                    // Saving the dimensions of the first image:
                    slideshow.width = this.width;
                    slideshow.height = this.height;
                }

                // Rendering the modified versions of the images:
                createCanvasOverlay(this);
            });
        }

        $('#slideshow .arrow').click(function(){
            var li            = slides.eq(current),
                canvas        = li.find('canvas'),
                nextIndex    = 0;

            // Depending on whether this is the next or previous
            // arrow, calculate the index of the next slide accordingly.

            if($(this).hasClass('next')){
                nextIndex = current >= slides.length-1 ? 0 : current+1;
            }
            else {
                nextIndex = current <= 0 ? slides.length-1 : current-1;
            }

            var next = slides.eq(nextIndex);

            setCurrentIcon(next[0].getElementsByTagName('img')[0].id);

            if(supportCanvas){

                // This browser supports canvas, fade it into view:

                canvas.fadeIn(function(){

                    // Show the next slide below the current one:
                    next.show();
                    current = nextIndex;

                    // Fade the current slide out of view:
                    li.fadeOut(function(){
                        li.removeClass('slideActive');
                        canvas.hide();
                        next.addClass('slideActive');
                    });
                });
            }
            else {

                // This browser does not support canvas.
                // Use the plain version of the slideshow.

                current=nextIndex;
                next.addClass('slideActive').show();
                li.removeClass('slideActive').hide();
            }
        });

    },100);

    // This function takes an image and renders
    // a version of it similar to the Overlay blending
    // mode in Photoshop.
    var idxForFirstImage = 0;
    
    function createCanvasOverlay(image){

        if (idxForFirstImage == 0) {
            setCurrentIcon(image.id);
            idxForFirstImage++;
        }

        var canvas            = document.createElement('canvas'),
            canvasContext    = canvas.getContext("2d");

        // Make it the same size as the image
        canvas.width = slideshow.width;
        canvas.height = slideshow.height;

        // Drawing the default version of the image on the canvas:
        canvasContext.drawImage(image,0,0);

        // Taking the image data and storing it in the imageData array:
        var imageData    = canvasContext.getImageData(0,0,canvas.width,canvas.height),
            data        = imageData.data;

        // Loop through all the pixels in the imageData array, and modify
        // the red, green, and blue color values.

        for(var i = 0,z=data.length;i<z;i++){

            // The values for red, green and blue are consecutive elements
            // in the imageData array. We modify the three of them at once:

            data[i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) :
                        (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
            data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) :
                        (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
            data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) :
                        (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));

            // After the RGB channels comes the alpha value, which we leave the same.
            ++i;
        }

        // Putting the modified imageData back on the canvas.
        canvasContext.putImageData(imageData,0,0,0,0,imageData.width,imageData.height);

        // Inserting the canvas in the DOM, before the image:
        image.parentNode.insertBefore(canvas,image);
    }

});

function setCurrentIcon(str) {
    currentIcon = str;
}

function enterToCreateJoinListRoom() {
    var userId = 0;

    var username = $("#username").val();

    if (!validateUsername(username)) {
        return;
    }


    var user = {userIcon: currentIcon, username: username};
    $("#username").val('');

    socket.emit('enterAsAUser', user);
    
    socket.on('sendBackUserId', function(data) {
        userId = data.userId;

        var link = 'joinCreateListRoom?id=' + userId;
        window.open(link, '_self');
    });
}

document.onkeydown = function(event) {
    if (event.which === 13) {
        event.preventDefault();
        enterToCreateJoinListRoom();
    }
}

//TODO: ilerde register - login - db geldiğinde check et
//TODO: simdilik username is empty - username.length > 3  ve  SOCKET_LIST te var mı kontrol et
function validateUsername(username) {
    var validate = true;
    var name = username.trim();

    if (name == '') {
        alert("Username can't be empty!");
        validate = false;
    } else {
        if (name.length < 3) {
            alert("Username length should be longer than 2 characters!");
            validate = false;
        } else {
            //TODO: check if exist in SOCKET_LIST
        }
    }

    return validate;
}