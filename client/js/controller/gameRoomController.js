var socket = io();

var gameId, gameName, creatorId, creatorName;
var lblGameName, readyButton, readyBoolean, lampLabel;
var userId;

$(window).on('load', function(){

	lblGameName = $('#lblGameName')[0];
	readyButton = $('#readyButton')[0];
	lampLabel = $('#lampLabel');

	readyBoolean = false;

	var params = get_params(location.search);
	gameId = params['id'];
	userId = params['uId'];	
	
	socket.emit('joinAndRequestGameInfo', {gameId: gameId, userId: userId});

	socket.on('responseGameInfo', function(game) {
		var game = new GAME(game); //Grrr have to use for game object functions

		lblGameName.innerHTML = "Game Name: " + game.gameName;
		
		if (userId == undefined) {
			userId = game.creatorId;
		}
		
		gameName = game.gameName;
		setPageProps(game.getPlayerName(userId), gameName);
		socket.emit('joinRoom', game.gameName);
		
		//TODO: set readies and game props for newly joined players
	
		refreshUserList(game);
	});

	moveElementRightAndLeft('lampLabel', 3000, 90, 'forever');
});

function refreshUserList(game) {
	var table = document.getElementById("userList");
	var rowCount = table.rows.length;
	for(var i = rowCount - 1; i > -1; i--) {   
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

	    id.innerHTML = user.id;
	    id.className = "hideThis";
		
		lamp.appendChild(lampImg);
		lamp.className = "UserTableImgCell";

		userIcon.appendChild(icon);
	    userIcon.className = "UserTableImgCell";

	    username.innerHTML = user.username;
	    username.className = "UserTableCell";
	}

	console.log(game.playersInGame);
}

function setReady() {
	if (!readyBoolean) {
		readyButton.src = '/client/img/readyLamp.png';
		readyBoolean = true;
		stopAnimation('lampLabel');
		lampLabel.css('margin-left', '');
	} else {
		readyButton.src = '/client/img/notReadyLamp.png';
		readyBoolean = false;
		moveElementRightAndLeft('lampLabel', 3000, 90, 'forever');
	}

	hideShowElement('lampLabel', readyBoolean);

	var readyObj = {
		gameName: gameName,
		ready: readyBoolean,
		userId: userId
	}

	socket.emit('sendReadyValue', readyObj);
}


$(document).ready(function() {
	socket.on('responseReadyValue', function(data) {
		var table = document.getElementById("userList");

		for (var i = 0, row; row = table.rows[i]; i++) {
		   var col = row.cells[0];

		   if (col.innerHTML == data.userId) {
		   		if (data.ready) {
		   			row.cells[1].querySelector('img').src = '/client/img/small_readyLamp.png';
		   		} else {
		   			row.cells[1].querySelector('img').src = '/client/img/small_notReadyLamp.png';
		   		}

		   		break;
		   }
		}
	});

});

