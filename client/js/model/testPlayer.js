//Player = function(param){
	//var self = {
	//	x: 0,
	//	y: 0,
	//	color: 'white',
	//	username: 'Hohoy'
	//}

	//getPositionX = function(){
	//	return self.x;
	//}

	//getColor = function() {
	//	return self.color;
	//}
//	Player.list[0] = self; //şimdilik

//	return self;
//}

Player.list = {};

Player.onConnect = function(socket, username, positionX, positionY, color){
	var player = Player({
		username:username,
		id:socket.id,
		x: positionX,
		y: positionY,
		color: color,
		socket:socket
	});

	console.log(color);

	Player.list[0] = player;
}

Player.showMee = function() {
	for(var i in Player.list) {
		console.log(Player.list[i].color);
	}
}