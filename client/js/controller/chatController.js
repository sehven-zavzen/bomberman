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
    if (event.which === 13) {
      sendMessage();
    }
}


//TODO: Make it generic later - I mean check player room
// Sends a chat message
function sendMessage (r) {
  var message = $("#chatInput").val();
  
  message = message.trim();
  // if there is a non-empty message and a socket connection
  //if (message && connected) {
    $("#chatInput").val('');

    var chatObj = {
      username: socket._username,
      message: message
    };
    // tell server to execute 'new message' and send along one parameter
    socket.emit('new-message', chatObj);
  //}
}