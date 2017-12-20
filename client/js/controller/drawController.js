//Bu dosya client

//Genellikle draw, bazen serverla iletişime geçilen file

socket = io();

socket.on('clearScene', function(data) {
    canvas = document.querySelector('#gameArea');
    ctx = canvas.getContext('2d');

    //Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Enable all player buttons
    var playerButtons = document.getElementsByClassName('player-button-class');
    for (var i = 0; i < playerButtons.length; i++) {
        playerButtons[i].disabled = false;
    }
});

socket.on('drawPlayer', function(data) {
    canvas = document.querySelector('#gameArea');
    ctx = canvas.getContext('2d');

	ctx.fillStyle = data.color;
	ctx.fillRect(data.positionX, data.positionY, 20, 20);
});

socket.on('disableChosenPlayer', function(playerButtonId) {
    var playerButtonId = document.getElementById(playerButtonId);

    if (playerButtonId) {
        playerButtonId.disabled = true;
        //playerButtonId.style.background='#000000';
    }
});

socket.on('movePlayers',function(data) {
    if (typeof ctx != 'undefined') {
        for(var i = 0 ; i < data.length; i++) {

            ctx.clearRect(data[i].oldPositionX, data[i].oldPositionY, 20, 20);

            ctx.fillStyle = data[i].color;
            ctx.fillRect(data[i].positionX,data[i].positionY, 20, 20);
        }
    }
});

socket.on('drawBomb', function(data) {
    if (typeof ctx != 'undefined') {
        console.log("Bomb put");

        //TODO: bombayı burda çizdir

        denekAnim(data.positionX, data.positionY);

        /*ctx.fillStyle = data.color;
        ctx.fillRect(data.positionX + (data.width / 2), data.positionY + (data.height / 2), data.width, data.height);*/
    }
});

socket.on('updateDrawBomb',function(bombList) {
    if (typeof ctx != 'undefined') {
        for(var i in bombList) {
            ctx.fillStyle = bombList[i].color;
            ctx.fillRect(bombList[i].positionX + 5, bombList[i].positionY + 5, 10, 10);
        }
    }
});

socket.on('explodeBomb', function(data) {
    if (typeof ctx != 'undefined') {
        ctx.clearRect(data.bomb.positionX, data.bomb.positionY, 20, 20);

        for (var i in data.walls) {
            var wall = data.walls[i];
            ctx.clearRect(wall.positionX, wall.positionY, 20, 20);
        }
    }
})

document.onkeydown = function(event){
    if(event.keyCode === 68)    //d
        socket.emit('keyPress',{inputId:'right',state:true});
    else if(event.keyCode === 83)   //s
        socket.emit('keyPress',{inputId:'down',state:true});
    else if(event.keyCode === 65) //a
        socket.emit('keyPress',{inputId:'left',state:true});
    else if(event.keyCode === 87) // w
        socket.emit('keyPress',{inputId:'up',state:true});
    else if(event.keyCode === 66) // b -> bomb
        socket.emit('keyPress',{inputId:'bomb',state:true});
    else if(event.keyCode === 77) // m -> mapi goster
        socket.emit('keyPress',{inputId:'map',state:true});
       
}

document.onkeyup = function(event){    
    if(event.keyCode === 68)    //d
        socket.emit('keyPress',{inputId:'right',state:false});
    else if(event.keyCode === 83)   //s
        socket.emit('keyPress',{inputId:'down',state:false});
    else if(event.keyCode === 65) //a
        socket.emit('keyPress',{inputId:'left',state:false});
    else if(event.keyCode === 87) // w
        socket.emit('keyPress',{inputId:'up',state:false});
     else if(event.keyCode === 66) // b -> bomb
        socket.emit('keyPress',{inputId:'bomb',state:false});
    else if(event.keyCode === 77) // m -> mapi goster
        socket.emit('keyPress',{inputId:'map',state:false});
}