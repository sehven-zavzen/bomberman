var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
 
//TODO: Olmazsa aç
serv.listen(process.env.PORT || 3000);
//app.set('port', (process.env.PORT || 3000));

require('./client/js/controller/playerController');

console.log('Server started!');
 
var SOCKET_LIST = {};
var PLAYER_LIST = {}; //TODO: refactor - baska dosyalara al
var BOMB_LIST = {}; //TODO: refactor - baska dosyalara al
 
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){

	socket.on('restartScene', function() {

		SOCKET_LIST = {};
		PLAYER_LIST = {};
		BOMB_LIST = {};

		io.sockets.emit('clearScene');
	});

	socket.on('generateMaze', function () {
		init();
		loop();
	});

	var player = null;
	var bomb = null;

	socket.on('createPlayer', function(data) {
		//TODO: send positionX and positionY, random socket id of new player
		var id = Math.random();

		var arrPosMap = calculateStartPosition();
		var arrPosCanvas = [arrPosMap[1] * pathWidth, arrPosMap[0] * pathWidth];

		//console.log(arrPosCanvas);
		//console.log(arrPosMap);

		var playerObjData = {id: id, posCanvas: arrPosCanvas, color: data.color, map: map, posMap: arrPosMap};
		player = Player.onPlayerConnect(io, playerObjData);
		
    	SOCKET_LIST[id] = socket;
		PLAYER_LIST[id] = player;

		//disable chosen player button for other clients
		socket.broadcast.emit('disableChosenPlayer', data.playerButtonId);

	});

    socket.on('keyPress',function(data){
	    if(data.inputId === 'left')
	        player.pressingLeft = data.state;
	    else if(data.inputId === 'right')
	        player.pressingRight = data.state;
	    else if(data.inputId === 'up')
	        player.pressingUp = data.state;
	    else if(data.inputId === 'down')
	        player.pressingDown = data.state;
	    else if(data.inputId === 'bomb') {
	    	if (data.state) {
	    		var idBomb = Math.random();
		    	bomb = Player.putBomb(io, player);
		    	BOMB_LIST[idBomb] = bomb;

		    	console.log(BOMB_LIST);	
	    	}
	    }
	    else if(data.inputId === 'map')
	        player.showMap = data.state;
    });

    socket.on('disconnect',function(){
    	if (player) {
			delete SOCKET_LIST[player.id];
	        delete PLAYER_LIST[player.id];
    	}
    });
   
});

setInterval(function(){
    var pack = [];
    for(var i in PLAYER_LIST){
        var player = PLAYER_LIST[i];
        var oldPositionX = player.positionX;
        var oldPositionY = player.positionY;

        player.updatePosition();
        pack.push({
        	color: player.color,
            oldPositionX: oldPositionX,
            oldPositionY: oldPositionY,
            positionX: player.positionX,
            positionY: player.positionY
        });    
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        io.sockets.emit('movePlayers',pack);
    }
    for(var i in BOMB_LIST){
        io.sockets.emit('updateBomb', BOMB_LIST);
    }
},1000/25);




function calculateStartPosition() {
	
	//TODO LATER: 4 ten fazla player için map i kontrol eden bir for loop gerekiyor

	for (var i = 0; i < checkPositions.length; i++) {
		var posXY = checkPositions[i];

		var arrPosXY = posXY.split(",");
		//console.log(map);

		//TODO: bozdum - herkes aynı yerden başlıyor
		if (map[arrPosXY[0]][arrPosXY[1]] == true) {
			//map[arrPosXY[0]][arrPosXY[1]] = false; - playerın ilk dogdugu yeri false yapıyordu
			return arrPosXY;
		}
	}
}




































/*
	CALCULATING MAZE VARIABLES and SENDING - START
*/

//TODO: later this can be on other js file - probably

pathWidth = 20       //Width of the Maze Path
wall = 20             //Width of the Walls between Paths
outerWall = 0        //Width of the Outer most wall
width = 20           //Number paths fitted horisontally
height = 10          //Number paths fitted vertically
delay = 1            //Delay between algorithm cycles
x = width/2|0        //Horisontal starting position
y = height/2|0       //Vertical starting position

wallColor = 'black'   //Color of the walls
pathColor = 'white'//Color of the path

map = []; //TODO: CHECK THIS: Could create problems

mapWidthMax = (width - 1) * 2;
mapHeightMax = (height - 1) * 2;

var checkPositions = ['0,0',  mapHeightMax + ',0',  '0,' + mapWidthMax, mapHeightMax + ',' + mapWidthMax];

randomGen = function(){
	seed = Math.random()*100000|0; //Seed for random numbers
	if(seed===undefined)var seed=performance.now()
	return function(){
    seed = (seed * 9301 + 49297) % 233280
		return seed/233280
	}
}

init = function(){
	offset = pathWidth/2+outerWall;
	map = [];

	canvasWidth = outerWall*2+width*(pathWidth+wall)-wall;
	canvasHeight = outerWall*2+height*(pathWidth+wall)-wall;
	
	random = randomGen();

	var canvasObj = {width: canvasWidth, height: canvasHeight, wallColor: wallColor};
	io.sockets.emit('initMazeGeneratePartOne', canvasObj);

	canvasObj = {pathColor: pathColor, lineCap: 'square', lineWidth: pathWidth};
	io.sockets.emit('initMazeGeneratePartTwo', canvasObj);

	for(var i=0;i<height*2;i++){
		map[i] = [];
		for(var j=0;j<width*2;j++){
		  map[i][j] = false;
		}
	}
	map[y*2][x*2] = true;
	route = [[x,y]];

	var moveX = x*(pathWidth+wall)+offset;
	var moveY = y*(pathWidth+wall)+offset;
	canvasObj = {moveX: moveX, moveY: moveY};

	io.sockets.emit('initMazeGeneratePartThree', canvasObj);
}
 
loop = function(){
	x = route[route.length-1][0]|0;
	y = route[route.length-1][1]|0;

	var directions = [[1,0],[-1,0],[0,1],[0,-1]], alternatives = [];

	for(var i=0;i<directions.length;i++){
		if(map[(directions[i][1]+y)*2]!=undefined&&
		   map[(directions[i][1]+y)*2][(directions[i][0]+x)*2]===false){
		  	alternatives.push(directions[i]);
		}
	}

	if(alternatives.length===0){
		route.pop();
		if(route.length>0){

			var moveX = route[route.length-1][0]*(pathWidth+wall)+offset;
			var moveY = route[route.length-1][1]*(pathWidth+wall)+offset;
			canvasObj = {moveX: moveX, moveY: moveY};
			io.sockets.emit('loopMazeGeneratePartOne', canvasObj);

			timer = setTimeout(loop,delay);
		}
		return;
	}

	direction = alternatives[random()*alternatives.length|0];
	route.push([direction[0]+x,direction[1]+y]);

	var lineToX = (direction[0]+x)*(pathWidth+wall)+offset;
	var lineToY = (direction[1]+y)*(pathWidth+wall)+offset;
	canvasObj = {lineToX: lineToX, lineToY: lineToY};
	io.sockets.emit('loopMazeGeneratePartTwo', canvasObj);

	map[(direction[1]+y)*2][(direction[0]+x)*2] = true;
	map[direction[1]+y*2][direction[0]+x*2] = true;

	io.sockets.emit('loopMazeGeneratePartThree');
	
	timer = setTimeout(loop,delay);
}

/*
	CALCULATING MAZE VARIABLES and SENDING - END
*/