socket = io();

var username;
//sayfa yenilendiğinde ve user ilk giriste redirect yaptıgı icin user listi cekiyor
$(window).on('load', function(){
	socket.emit('requestToGetGeneralRoomUserList');

	var params = get_params(location.search);
	var userIcon = params['i'];
	username = params['n'];

	document.getElementById('userIcon').src = '/client/img/playerIcons/' + userIcon;
	document.getElementById('username').innerHTML = username;


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


function createGame() {

	//TODO: socket emit to server a game created
	socket.emit('createAGameRoom', );


	//TODO: redirect to create game html page


	//TODO: bu kaldırılacak - serverdan tüm clientlara onun yaratıldığı bilgisi gönderildiğinde çalısacak kod parcası - başka bir fonksiyona alınacak
	//TODO: execute a code piece for other clients to add new game to list
	//Test amaclı burda

	var table = document.getElementById("gameList");
    var row = table.insertRow(table.length);
    var creator = row.insertCell(0);
    var roomName = row.insertCell(1);
    var playerCount = row.insertCell(2);
    creator.innerHTML = "NEW CELL1";
    creator.className = "CJLTableCell";
    roomName.innerHTML = "NEW CELL2";
    roomName.className = "CJLTableCell";
    playerCount.innerHTML = "1/5"; //TODO: join roomlarda update edilecek cell
    playerCount.className = "CJLTableCell";

}

$(document).ready(function(){
	$('#gameList tr').dblclick(function() {
		alert('Hohoy');
	});
});

$(document).ready(function(){
	$('#gameList').on('click', 'tr', function() {
	    $(this).addClass('CJLTableRowSelected').siblings().removeClass('CJLTableRowSelected');    
   		var value = $(this).find('td:first').html();
   		alert(value);
	});

	$('#gameList').on('dblclick', 'tr', function() {
	    alert("JOIN GAME");
	});
});