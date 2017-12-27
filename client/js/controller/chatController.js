var socket = io();

/*.keydown(function (event) { 
  // TODO: When the client hits ENTER on their keyboard and chat input area is focused
  if (event.which === 13) {
    //if (username) {
      sendMessage();
      //socket.emit('stop typing'); //Sonra belki
      //typing = false;
    } else {
      setUsername();
    }
  }
});*/

document.onkeydown = function(event){
  //TODO: belki focuslanmısken gonderilebilir
    if (event.which === 13) {
      event.preventDefault();
      sendMessage();
    }
}


// Send message to chat room - client -> server -> all clients
function sendMessage () {
  var username = $("#username").html();
  var message = $("#chatInput").val();
  var currentRoom = $("#currentRoom").html();
  
  message = message.trim();
  // if there is a non-empty message and a socket connection
  //if (message && connected) {
    $("#chatInput").val("");

    var chatObj = {
      username: username,
      message: message,
      currentRoom: currentRoom
    };
    // tell server to execute 'new message' and send along one parameter
    socket.emit('newMessage', chatObj);
  //}
}

socket.on('chatMessage', function(data) {
  var username = data.username;
  var message = data.message;

  $("#chatMessagesArea").append(username + ": " + message + "<br />")
});