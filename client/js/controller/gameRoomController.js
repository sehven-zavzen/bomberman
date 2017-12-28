//TODO: page onload -> check if game creator joins to room

/*self.id = param.id;
self.gameName = param.gameName;
self.creatorId = param.creatorId;
self.creatorName = param.creatorName; //Belki: Gerekmeyebilir, simdilik kalsın
self.bombPower = param.bombPower;
self.bombCount = param.bombCount;
self.allDestructible = param.allDestructible;*/

socket = io();

var gameName, creatorId, creatorName;
var lblGameName;
var readyButton;
var readyBoolean;

$(window).on('load', function(){

	lblGameName = $('#lblGameName')[0];
	readyButton = $('#readyButton')[0];

	readyBoolean = false;

	var params = get_params(location.search);
	var gameId = params['id'];

	socket.emit('requestGameInfo', gameId);

	socket.on('responseGameInfo', function(gameData) {

		lblGameName.innerHTML = "Game Name: " + gameData.gameName;
		console.log(gameData.gameName);
		console.log(gameData.creatorId);
		console.log(gameData.creatorName);
	});

});


function setReady() {
	if (!readyBoolean) {
		readyButton.src = '/client/img/readyLamp.png';
		readyBoolean = true;
	} else {
		readyButton.src = '/client/img/notReadyLamp.png';
		readyBoolean = false;
	}
}