//TODO: page onload -> check if game creator joins to room

socket = io();

$(window).on('load', function(){

	socket.emit('joinRoom', 'general_room');

});