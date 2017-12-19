

//TODO: simdilik sadece hareketsiz animasyonlar, sonra hareketliler gelecek
function createAnimation(options) {

	function animLoop () {
		
		//TODO: obj.repeatedTime - obj.repeatTime  bu şekilde alabiliniyor mu bak
		if () {
			window.requestAnimationFrame(animLoop);

			obj.update();
			obj.render();	
		} else {
			window.cancelAnimation
		}
		
	}

	var canvas = options.canvas;
	var objImg = new Image();
	objImg.src = options.imageSource;

	var obj = sprite({
		context: canvas.getContext("2d"),
		width: options.spriteWidth,
		height: options.spriteHeight,
		image: objImg,
		numberOfFrames: options.numberOfFrames,
		ticksPerFrame: options.ticksPerFrame,
		positionX: options.positionX,
		positionY: options.positionY,
		repeatedTime: 0,
		repeatTime: options.repeatTime,
		lastFrame: 0
	});

	objImg.addEventListener("load", animLoop);

}


function sprite (options) {
	var that = {},
		frameIndex = 0,
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 0,
		numberOfFrames = options.numberOfFrames || 1;
	
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.positionX = options.positionX;
	that.positionY = options.positionY;
	that.repeatedTime = options.repeatedTime;
	that.repeatTime = options.repeatTime;
	
	that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

			tickCount = 0;
			
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {	
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };
	
	that.render = function () {

	// Clear the canvas
	  that.context.clearRect(that.positionX, that.positionY, that.width, that.height);
	
	// Draw the animation
	  that.context.drawImage(
	    that.image,
	    frameIndex * that.width / numberOfFrames,
	    0,
	    that.width / numberOfFrames,
	    that.height,
	    that.positionX,
	    that.positionY,
	    that.width / numberOfFrames,
	    that.height);
	};
	
	return that;
}