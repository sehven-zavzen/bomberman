var socket = io();

/*
var ctx = document.getElementById("ctx").getContext("2d");
    ctx.font = '30px Arial';
       
socket.on('newPositions',function(data){
    ctx.clearRect(0,0,500,500);
    for(var i = 0 ; i < data.length; i++)
        ctx.fillText(data[i].number,data[i].x,data[i].y);      
});
*/

function generateMaze() {
	socket.emit('generateMaze');
};

socket.on('initMazeGeneratePartOne', function (data) {	
	canvas = document.querySelector('#gameArea');
	ctx = canvas.getContext('2d');
	canvas.width = data.width;
	canvas.height = data.height;
	ctx.fillStyle = data.wallColor;
	ctx.fillRect(0,0,canvas.width,canvas.height);

});

socket.on('initMazeGeneratePartTwo', function (data) {	
	ctx.strokeStyle = data.pathColor;
	ctx.lineCap = data.lineCap;
	ctx.lineWidth = data.lineWidth;
	ctx.beginPath();
});

socket.on('initMazeGeneratePartTwo', function (data) {	
	ctx.moveTo(data.moveX, data.moveY);
});

socket.on('loopMazeGeneratePartOne', function (data) {	
	ctx.moveTo(data.moveX, data.moveY);
});

socket.on('loopMazeGeneratePartTwo', function (data) {	
	ctx.lineTo(data.lineToX, data.lineToY);
});

socket.on('loopMazeGeneratePartThree', function (data) {	
	ctx.stroke();
});

socket.on('addStonesToMaze', function(data) {
    ctx.fillStyle = data.color;
    var mp = data.map;
    console.log(mp);
    
    for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 40; j++) {
			if (mp[i][j] == 'S') {
				ctx.clearRect(j * 20, i * 20, 20, 20);
				ctx.fillRect(j * 20, i * 20, 20, 20);
			}
		}
	}
});

