

function startFallingWords(word) {
	 var $snowflakes = $(), qt = 200;
        
        for (var i = 0; i < qt; ++i) {
            var $snowflake = $('<div class="snowflakes">' + word + '</div>');
            $snowflake.css({
                'left': (Math.random() * $('#fallZone').width()) + 'px',
                'top': (- Math.random() * $('#fallZone').height()) + 'px'
            });
            // add this snowflake to the set of snowflakes
            $snowflakes = $snowflakes.add($snowflake);
        }
        $('#fallZone').prepend($snowflakes);
    
        $snowflakes.animate({
            top: "600px",
            opacity : "0",
        }, Math.random() + 5000, function(){
            $(this).remove();
            // run again when all 20 snowflakes hit the floor
            if (--qt < 1) {
                fallingSnow();
            }
        });
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function Platform(pos, wid, hei){
  this.draw = function(ctx){
    ctx.strokeRect(pos.x+.5, pos.y+.5, 20, 20);
    ctx.fillRect(pos.x+.5, pos.y+.5, 20, 20);
  };
}

var can = document.getElementById("can"),
    ctx = can.getContext('2d'),
    wid = can.width,
    hei = can.height,
    numPlatforms = 80,
    platWid = 20,
    platHei = 20,
    platforms = [],
    hash = {};

function generateMaze() {
    clearCanvas();

   for(var i = 0; i < numPlatforms; i++) {
      var posX = Math.floor(Math.random()*(wid-platWid)/platWid)*platWid,
        posY = Math.floor(Math.random()*(hei-platHei)/platHei)*platHei;
      
      while (hash[posX + 'x' + posY]){
        posX = Math.floor(Math.random()*wid/platWid)*platWid;
        posY = Math.floor(Math.random()*hei/platHei)*platHei;
      }
      
      hash[posX + 'x' + posY] = 1; 
      platforms.push(new Platform({x:posX, y:posY}, platWid, platHei));
    }

    for(var i = 0; i < platforms.length; i++){
      platforms[i].draw(ctx);
    } 
};

function clearCanvas() {
    platforms = [];
    hash = {};
    console.log(platforms);
    ctx.clearRect(0, 0, can.width, can.height);
};


$(document).ready(function(){
    var runners = [b2jsTestPendulum];
    console.log(runners);

    var runner = new runners[0]($("#pendulumCanvas")[0]);

    runner.draw();
    runner.resume();
});

function goToBomberman() {
    window.open('bomberman');
};

