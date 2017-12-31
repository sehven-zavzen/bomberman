socket = io();

var userObj, username, userId, gameNameModal, gameName;

//sayfa yenilendiğinde ve user ilk giriste redirect yaptıgı icin user listi cekiyor
$(window).on('load', function(){
 	gameNameModal = $("#gameNameModal")[0];
 	gameName = $("#gameName");

	socket.emit('requestToGetGeneralRoomUserList');
	socket.emit('requestToGetGameList');

	var params = get_params(location.search);
	userId = params['id'];

	socket.emit('requestUserInfo', userId);

//TODO: Refactor app.js - just return user obj or player obj
	socket.on('responseUserInfo', function(userInfo) {
		userObj = userInfo;
		username = userInfo.username;
		document.getElementById('userIcon').src = '/client/img/playerIcons/' + getGoodSizeOfIcon(userInfo.userIcon, 'medium');
		document.getElementById('username').innerHTML = userInfo.username;
		document.getElementById('currentRoom').innerHTML = userInfo.currentRoom;
	});
});

//herhangi bir user join yaptığında refresh liste
socket.on('refreshGeneralRoomUserList', function(userList) {
	var elSel = document.getElementById('userList');

	for (var i in userList) {
		user = userList[i]; 

		//TODO: Could be perfomance issues, ilerde düzeltilebilir
		var item, boolFind = false;

		for(var j = 0; j < elSel.length; j++) {
			item = elSel[j];
			if (item.value == user.userId) {
				boolFind = true;
				break;
			}
		}

		if (!boolFind) {
			var elOptNew = document.createElement('option');
		    elOptNew.value = user.userId;
		    elOptNew.innerHTML = '&#127775; ' + user.username; //TODO: yildiz yerine sectigi icon gelseydi iyiydi ama düz select componenti yapamiyormus bu islemi
		    elOptNew.userIcon = user.userIcon; 

		    if (elSel.length == 0) {
		    	elSel.add(elOptNew, null);
		    } else {
		    	var elOptOld = elSel.options[0];  
			    try {
			      elSel.add(elOptNew, elOptOld); // standards compliant; doesn't work in IE
			    }
			    catch(ex) {
			      elSel.add(elOptNew, elSel.selectedIndex); // IE only
			    }
		    }
		}
	}
		
	console.log(userList)
});

socket.on('refreshGameList', function(gList) {

	for (var i in gList) {
		var game = gList[i];

		var table = document.getElementById("gameList");
	    var row = table.insertRow(table.length);
	    row.className = 'clickable';
	    var id = row.insertCell(0);
	    var creator = row.insertCell(1);
	    var roomName = row.insertCell(2);
	    var playerCount = row.insertCell(3);
	    id.innerHTML = game.id;
	    id.className = "hideThis";
	    creator.innerHTML = game.creatorName;
	    creator.className = "CJLTableCell";
	    roomName.innerHTML = game.gameName;
	    roomName.className = "CJLTableCell";
	    playerCount.innerHTML = "1/5"; //TODO: join roomlarda update edilecek cell
	    playerCount.className = "CJLTableCell";
	}

});

function openGameNameModal() {
    gameNameModal.style.display = "block";	
}

function closeGameNameModal() {
	gameName.val('');
    gameNameModal.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == gameNameModal) {
    	gameName.val('');
        gameNameModal.style.display = "none";
    }
}

function createGame() {
	var gName = gameName.val();

	gameName.val('');
 	gameNameModal.style.display = "none";

 	var gameData = {gameName: gName, creatorId: userId, creatorName: username};
 	var gameObject = new GAME(gameData);

 	console.log(gameObject);
 	
	socket.emit('createAGameRoom', gameObject);

	socket.on('creatorJoinsToGameRoom', function(gameObject) {
		window.open('gameRoom?id=' + gameObject.id, '_self');
	});
}

$(document).ready(function() {
	$('#gameList').on('click', 'tr.clickable', function() {
	    $(this).addClass('CJLTableRowSelected').siblings().removeClass('CJLTableRowSelected');
	});

	$('#gameList').on('dblclick', 'tr.clickable', function() { 
   		var gameId = $(this).find('td:first').html();
   		joinGame(gameId);
	});
});

function joinGame(gameId) {
	window.open('gameRoom?id=' + gameId+ '&uId=' + userId, '_self');
}


//TODO: sil bunu - cöp
function geriGit() {
	window.open('/', '_self');
}