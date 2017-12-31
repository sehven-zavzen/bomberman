//TODO: page onload -> check if game creator joins to room

/*self.id = param.id;
self.gameName = param.gameName;
self.creatorId = param.creatorId;
self.creatorName = param.creatorName; //Belki: Gerekmeyebilir, simdilik kalsın
self.bombPower = param.bombPower;
self.bombCount = param.bombCount;
self.allDestructible = param.allDestructible;*/

socket = io();

var gameId, gameName, creatorId, creatorName;
var lblGameName, readyButton, readyBoolean;
var userId;

$(window).on('load', function(){

	lblGameName = $('#lblGameName')[0];
	readyButton = $('#readyButton')[0];

	readyBoolean = false;

	var params = get_params(location.search);
	gameId = params['id'];
	userId = params['uId'];	
	
	socket.emit('joinAndRequestGameInfo', {gameId: gameId, userId: userId});

	socket.on('responseGameInfo', function(game) {
		lblGameName.innerHTML = "Game Name: " + game.gameName;
		
		if (userId == undefined) { //TODO: null mı, undefined mı ??? Check
			userId = game.creatorId;
		}

		console.log(game.gameName);
		console.log(game.creatorId);
		console.log(game.creatorName);
	
		refreshUserList(game);
	});
});

function refreshUserList(game) {
	var table = document.getElementById("userList");
	var rowCount = table.rows.length;
	for(var i = rowCount - 1; i > 0; i--)
	{   
	   table.deleteRow(i);
	}

	var uList = game.playersInGame;

	for (var i in uList) {
		var user = uList[i];

	    var row = table.insertRow(table.length);
	    row.className = 'clickable';
	    var id = row.insertCell(0);
	    var username = row.insertCell(1);
	    /*var roomName = row.insertCell(2);
	    var playerCount = row.insertCell(3);*/
	    id.innerHTML = user.id;
	    id.className = "hideThis";
	    username.innerHTML = user.username;
	    username.className = "UserTableCell";
	    /*roomName.innerHTML = user.gameName;
	    roomName.className = "CJLTableCell";
	    playerCount.innerHTML = "1/5"; //TODO: join roomlarda update edilecek cell
	    playerCount.className = "CJLTableCell";*/
	}

	console.log(game.playersInGame);
}

socket.on('responseUsersInGame', function(list){
	//TODO: list in userList
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