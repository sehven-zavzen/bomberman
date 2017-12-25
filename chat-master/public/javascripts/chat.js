var socket = io();

var msgConverter = $.getScript("/javascripts/messageConverter.js", function() {
});
var gameController = $.getScript("/javascripts/gameController.js", function() {
});

var $username = $('#username');
var $chatMessage = $('#chat-input');

initializeScreens();
//-----------------------------------------------------------------------------
// Emit chat message when enter key is pressed.
//-----------------------------------------------------------------------------
$("#chat-input").keydown(function(event) {
      if (event.keyCode == 13) {
          event.preventDefault();
          if ($("#chat-input").val() != "") {
              socket.emit("chat-message", $("#chat-input").val());
              $("#chat-input").val("");
          }
      }
});

//TODO: refactor commands
//-----------------------------------------------------------------------------
// Receive chat message from server.
//-----------------------------------------------------------------------------
socket.on("chat-message", function(chatObj) {
	var user = chatObj.user;
	var message = chatObj.message;
	if (message.substring(0, 5) == '!fall') {
		//startFallingWords(message.substring(5));
		startFallingWords(convertMessage(message.substring(6)));
	} else if (message.substring(0, 6) == '!alert') {
		alert(message.substring(6));
	} else if (message.substring(0, 5) == '!play') {
		openVideo(message.substring(5));
	} else if (message.substring(0, 5) == '!open') {
		openProgram(message.substring(5));
	} else {
		$("#chat-container").append(user + ": " + convertMessage(message) + "<br />")
	}
});

// Whenever the server emits 'user joined', log it in the chat body
socket.on('user-joined', function (data) {
	$("#chat-room").append(data.username + "<br />");
	$("#chat-container").append("<p class='gradient-text'>" + data.username + " is joined to chat room!</p><br />");
	$chatMessage.removeAttr('disabled');
});

function joinRoom() {
	var name = $username.val();
	$username.val("");
	socket.emit("join-room", name);
}

function initializeScreens() {
	document.getElementById("defaultOpenTab").click();

	var tabArr = document.getElementsByClassName("tablinks");
	for (var i = 0; i < tabArr.length; i++) {
		if (tabArr[i].disabled) {
			tabArr[i].innerHTML = 'DISABLED';
		}
	}

}

socket.on("rect", function(obj) {
	console.log("asdasdqweqwe");
	obj.context.fillRect(obj.x,obj.y,obj.wid,obj.hei);
});