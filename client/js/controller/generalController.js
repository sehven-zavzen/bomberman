/*var mainAnim = $.getScript("/../animate/mainAnimation.js", function() {
});*/

function restartScene() {
	socket.emit('restartScene');
};











function denekAnim(posX, posY) {
	var canvas = document.querySelector('#gameArea');
	//var options = {imageSource: '/../client/img/birb2.png', positionX: 0, positionY: 0, numberOfFrames: 4, canvas: canvas, spriteWidth: 1198, spriteHeight: 200};

	//var options = {imageSource: '/../client/img/bomb.png', positionX: 0, positionY: 0, numberOfFrames: 3, canvas: canvas, spriteWidth: 450, spriteHeight: 210};
	/*var options = {imageSource: '/../client/img/bombReal.png', positionX: 50, positionY: 50, numberOfFrames: 12, 
					canvas: canvas, spriteWidth: 216, spriteHeight: 20, ticksPerFrame: 10, repeatTime: 'forever'};*/

	var options = {imageSource: '/../client/img/bombReal.png', positionX: posX, positionY: posY, numberOfFrames: 12, 
					canvas: canvas, spriteWidth: 216, spriteHeight: 20, ticksPerFrame: 17, repeatTime: 1};

	createAnimation(options);
}

/*$( document ).ready(function() {
    denekAnim();
});*/


function openBomberman() {
	window.open('play', "_self");
}