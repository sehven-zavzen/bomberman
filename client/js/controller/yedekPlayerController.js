self.updatePosition = function(){
		var map = self.map;
		//console.log(map[0]);
		//TODO: map içinde bir kontrol yapmak gerekiyor - gidebiliyor mu, öyleyse hareket edebilsin
        if(self.pressingRight) {
        	console.log('right');
        	var newMapPosX = parseInt(self.mapPositionX) + 1;
        	console.log('--------------------------');
        	console.log(map[newMapPosX][self.mapPositionY]);
        	//console.log(newMapPosX);
        	if (map[newMapPosX][self.mapPositionY] == true) {
        		self.positionX += self.maxSpd;
            	self.mapPositionX = newMapPosX;
            }
        }
        if(self.pressingLeft) {
        	console.log('left');
        	var newMapPosX = parseInt(self.mapPositionX) - 1;
        	if (map[newMapPosX][self.mapPositionY] == true) {
        		self.positionX -= self.maxSpd;
        		self.mapPositionX = newMapPosX;
        	}        	
        }
        if(self.pressingUp) {
        	console.log('up');
        	var newMapPosY = parseInt(self.mapPositionY) - 1;
        	if (map[self.mapPositionX][newMapPosY] == true) {
        		self.positionY -= self.maxSpd;
            	self.mapPositionY = newMapPosY;	
        	}
        }
        if(self.pressingDown) {
        	console.log('down');
        	var newMapPosY = parseInt(self.mapPositionY) + 1;
        	if (map[self.mapPositionX][newMapPosY] == true) {
        		self.positionY += self.maxSpd;
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