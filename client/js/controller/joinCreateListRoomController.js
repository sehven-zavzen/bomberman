socket = io();

var username;
var userid;
var gameNameModal;
var gameName;
//sayfa yenilendiğinde ve user ilk giriste redirect yaptıgı icin user listi cekiyor
$(window).on('load', function(){

 	gameNameModal = $("#gameNameModal")[0];
 	gameName = $("#gameName");

	socket.emit('requestToGetGeneralRoomUserList');

	var params = get_params(location.search);
	var userIcon = params['i'];
	var currentRoom = params['r'];
	username = params['n'];
	userid = params['id'];


	document.getElementById('userIcon').src = '/client/img/playerIcons/' + userIcon;
	document.getElementById('username').innerHTML = username;
	document.getElementById('currentRoom').innerHTML = currentRoom;

	//Burda socket join olayını yapmak lazım tekrar :(
	socket.emit('joinRoom', currentRoom);

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
		    elOptNew.innerHTML = '&#127775; ' + user.username; //TODO: yildiz yerine sectigi icon gelseydi iyiydi ama düz select componenti yapamiyormus
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
		
	console.log(userList);

});

socket.on('aGameCreated', function(gList) {
	//TODO: refresh game list
	for (var i in gList) {
		var game = gList[i];

		var table = document.getElementById("gameList");
	    var row = table.insertRow(table.length);
	    var id = row.insertCell(0);
	    var creator = row.insertCell(1);
	    var roomName = row.insertCell(2);
	    var playerCount = row.insertCell(3);
	    id.innerHTML = game.id;
	    creator.innerHTML = game.creatorName;
	    creator.className = "CJLTableCell";
	    roomName.innerHTML = game.gameName;
	    roomName.className = "CJLTableCell";
	    playerCount.innerHTML = "1/5"; //TODO: join roomlarda update edilecek cell
	    playerCount.className = "CJLTableCell";
	}

});




function openGameNameModal() {
	// Get the modal
	//var gameNameModal = document.getElementById('gameNameModal');


	// When the user clicks the button, open the modal 
	//btn.onclick = function() {
	    gameNameModal.style.display = "block";
	//}

	// When the user clicks on <span> (x), close the modal
	

	// When the user clicks anywhere outside of the modal, close it
	
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

 	var gameData = {gameName: gName, creatorId: userid, creatorName: username};
 	var gameObject = new GAME(gameData);

	//emit to server a game created
	socket.emit('createAGameRoom', gameObject);

	socket.on('creatorJoinsToGameRoom', function(gameObject) {
		//TODO: create url - game id şu bu
		console.log(gameObject.id);
		window.open('gameRoom', '_self');
	});
}




$(document).ready(function() {
	$('#gameList tr').dblclick(function() {
		alert('Hohoy');
	});
});

$(document).ready(function() {
	$('#gameList').on('click', 'tr', function() {
	    $(this).addClass('CJLTableRowSelected').siblings().removeClass('CJLTableRowSelected');    
   		var value = $(this).find('td:first').html();
   		alert(value);
	});

	$('#gameList').on('dblclick', 'tr', function() {
	    alert("JOIN GAME");
	});
});


//TODO: sil bunu - cöp
function geriGit() {
	window.open('/', '_self');
}