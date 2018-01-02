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
		var game = new GAME(game); //Grrr to use game object functions

		lblGameName.innerHTML = "Game Name: " + game.gameName;
		
		if (userId == undefined) { //TODO: null mı, undefined mı ??? Check
			userId = game.creatorId;
		}
		/*document.getElementById('currentRoom').innerHTML = game.gameName;*/ //TODO: sonra aç
		socket.emit('joinRoom', game.gameName);

		setPageProps(game.getPlayerName(userId), game.gameName);

		/*document.getElementById('currentRoom').innerHTML = 'general_room';*/
		console.log(game.gameName);
		console.log(game.creatorId);
		console.log(game.creatorName);
	
		refreshUserList(game);
	});
});

function refreshUserList(game) {
	var table = document.getElementById("userList");
	var rowCount = table.rows.length;
	for(var i = rowCount - 1; i > 0; i--) {   
	   table.deleteRow(i);
	}

	var uList = game.playersInGame;

	for (var i in uList) {
		var user = uList[i];

		var lampImg = document.createElement('img');
		lampImg.src = '/client/img/small_notReadyLamp.png';
		lampImg.className = "UserTableImg";

		var icon = document.createElement('img');
		icon.src = '/client/img/playerIcons/' + user.userIcon;
		icon.className = "UserTableImg";

	    var row = table.insertRow(table.length);
	    row.className = 'clickable';
	    var id = row.insertCell(0);
	    var lamp = row.insertCell(1);
	    var userIcon = row.insertCell(2);
	    var username = row.insertCell(3);
	    /*var roomName = row.insertCell(2);
	    var playerCount = row.insertCell(3);*/
	    id.innerHTML = user.id;
	    id.className = "hideThis";
		
		lamp.appendChild(lampImg);
		lamp.className = "UserTableImgCell";

		userIcon.appendChild(icon);
	    userIcon.className = "UserTableImgCell";

	    username.innerHTML = user.username;
	    username.className = "UserTableCell";
	    /*roomName.innerHTML = user.gameName;
	    roomName.className = "CJLTableCell";
	    playerCount.innerHTML = "1/5"; //TODO: join roomlarda update edilecek cell
	    playerCount.className = "CJLTableCell";*/
	}

	console.log(game.playersInGame);
}

/*socket.on('responseUsersInGame', function(list){
	//TODO: list in userList
});*/

function setReady() {
	if (!readyBoolean) {
		readyButton.src = '/client/img/readyLamp.png';
		readyBoolean = true; 
	} else {
		readyButton.src = '/client/img/notReadyLamp.png';
		readyBoolean = false;
	}

	//TODO: send server readyBoolean and userId
}

//TODO: socket.on  from server with readyBoolean and userId to update user list