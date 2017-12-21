socket = io();

$(window).on('load', function(){

	socket.emit('requestToGetGeneralRoomUserList');

	socket.on('refreshGeneralRoomUserList', function(userList) {
	    
	    //TODO: user listesini yenile
		console.log(userList);

	});

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