//Player objesi bu sınıftan kullaniliyor


/*
	DIKKAT
	MAP arrayi ters

	map[player.mapPositionY, player.mapPositionX]

*/


playerList = {};

Player = function(param) {
	var self = this;
	self.playerNo = param.playerNo;
	self.id = param.id;
	self.socket = param.socket;
	self.positionX = param.posCanvas[0];
	self.positionY = param.posCanvas[1];
	self.map = param.map;
	self.mapPositionX = param.posMap[1];
	self.mapPositionY = param.posMap[0];
	self.itemList = [];
	self.color = param.color;
	self.bombPower = 3;
	self.bombCount = 3; //How many bombs a player can put
	self.playerButtonId = param.playerButtonId;

	self.maxSpd = 20;
	self.pressingRight = false;
    self.pressingLeft = false;
    self.pressingUp = false;
    self.pressingDown = false;

    self.showMap = false;
    self.putBomb = false;

	self.getColor = function() {
		return self.color; 
	};

	self.getMapPositionX = function() {
		return self.mapPositionX;
	}

	self.setMapPositionX = function(newPosX) {
		self.mapPositionX = newPosX;
	}

	self.getMapPositionY = function() {
		return self.mapPositionY;
	} 
	
	self.setMapPositionY = function(newPosY) {
		self.mapPositionY = newPosY;
	}

	self.increaseBombCount = function() {
		self.bombCount++;
	}

	self.decreaseBombCount = function() {
		self.bombCount--;
	}

	//MAP ICINDE TERS BIR MANTIK VAR - DIKKAT
	self.updatePosition = function() {
		var map = self.map;

        if(self.pressingRight) {
        	console.log('right');
        	var newMapPosX = parseInt(self.mapPositionX) + 1;
        	//console.log(newMapPosX);
        	if (map[self.mapPositionY][newMapPosX] == true) {
        		self.positionX += self.maxSpd;
        		
        		clearPreviousSquare(map, self);

        		map[self.mapPositionY][newMapPosX] = self.playerNo;
        		self.mapPositionX = newMapPosX;
            }
        }
        if(self.pressingLeft) {
        	console.log('left');
        	var newMapPosX = parseInt(self.mapPositionX) - 1;
        	if (newMapPosX >= 0 && map[self.mapPositionY][newMapPosX] == true) {
        		self.positionX -= self.maxSpd;
        		
				clearPreviousSquare(map, self);

        		map[self.mapPositionY][newMapPosX] = self.playerNo;
        		self.mapPositionX = newMapPosX;
        	}        	
        }
        if(self.pressingUp) {
        	console.log('up');
        	var newMapPosY = parseInt(self.mapPositionY) - 1;
        	if (newMapPosY >= 0 && map[newMapPosY][self.mapPositionX] == true) {
        		self.positionY -= self.maxSpd;

        		clearPreviousSquare(map, self);
        		
        		map[newMapPosY][self.mapPositionX] = self.playerNo;
            	self.mapPositionY = newMapPosY;	
        	}
        }
        if(self.pressingDown) {
        	console.log('down');
        	var newMapPosY = parseInt(self.mapPositionY) + 1;
        	if (map[newMapPosY][self.mapPositionX] == true) {
        		self.positionY += self.maxSpd;

        		clearPreviousSquare(map, self);
        		
        		map[newMapPosY][self.mapPositionX] = self.playerNo;
                self.mapPositionY = newMapPosY;
            }
        }
        if (self.showMap) {
			console.log('map bu ' + map[0].length + ' -- ' + map[1].length);
			for (var i = 0; i < 20; i++) {
				var row = '';
				for (var j = 0; j < map[1].length; j++) {
					row = row + ', ' + map[i][j];	
				}
				console.log(i + '.ROW' + row);
			}
        }

    }

    return self;
};

function clearPreviousSquare(map, player) {
	if (map[player.mapPositionY][player.mapPositionX] != 'B') {
		map[player.mapPositionY][player.mapPositionX] = true;	
	}
	return map;
}


Player.onPlayerConnect = function(io, playerObj){
	var player = new Player(playerObj);
	
	io.sockets.emit('drawPlayer', player);

	return player;
}


Player.putBomb = function(io, playerObj, idBomb){

	if (playerObj.bombCount == 0) {
		return null;
	}

	var mapBombPosX = playerObj.mapPositionX;
	var mapBombPosY = playerObj.mapPositionY;

	var bombPosX = playerObj.positionX;
	var bombPosY = playerObj.positionY;

	var bombData = {id:idBomb, playerId:playerObj.id, positionX: bombPosX, positionY: bombPosY, 
					mapPositionX: mapBombPosX, mapPositionY: mapBombPosY,
					power: playerObj.bombPower};

	var bomb = new Bomb(bombData);
	
	io.sockets.emit('drawBomb', bomb);

	playerObj.decreaseBombCount();

	return bomb;
}



Bomb = function(param) { 
	var self = this;
	self.id = param.id;
	self.playerId = param.playerId;
	self.power = param.power;
	self.positionX = param.positionX;
	self.positionY = param.positionY;
	self.mapPositionX = param.mapPositionX;
	self.mapPositionY = param.mapPositionY;
	self.color = 'pink';
	self.width = 10;
	self.height = 10;
	self.time = 3;
	self.remove = false;

	self.updateTime = function(io) {
		self.time -= 0.05;
		
		if (self.time < 0) {
			self.remove = true;
		}
		return self;
	}

	return self;
}

Wall = function(param) {
	var self = this;
	self.type = 'wall';

	self.mapPositionX = param.mapPositionX;
	self.mapPositionY = param.mapPositionY;
	self.positionX = param.mapPositionX * 20;
	self.positionY = param.mapPositionY * 20;;

	self.specialItem = 'none';

	return self;
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//COMMUNICATE WITH SERVER
function createPlayer(color, playerButtonId) {
	socket.emit('createPlayer', {color: color, playerButtonId: playerButtonId});
};


