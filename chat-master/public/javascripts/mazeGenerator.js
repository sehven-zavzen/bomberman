var socket = io();

pathWidth = 25;       //Width of the Maze Path
wall = 25            //Width of the Walls between Paths
outerWall = 0        //Width of the Outer most wall
width = 15           //Number paths fitted horisontally
height = 13          //Number paths fitted vertically
delay = 1            //Delay between algorithm cycles
x = width/2|0        //Horisontal starting position
y = height/2|0       //Vertical starting position
seed = Math.random()*100000|0//Seed for random numbers
wallColor = '#000000'   //Color of the walls
pathColor = '#fff58c'//Color of the path

randomGen = function(seed){
	if(seed===undefined)var seed=performance.now()
	return function(){
    seed = (seed * 9301 + 49297) % 233280
		return seed/233280
	}
}
//TODO: refactor sonra - leş kod


init = function(obj){
  offset = pathWidth/2+outerWall
  map = []
  canvas = obj.canvasObj;
  ctx = obj.context;
  canvas.width = outerWall*2+width*(pathWidth+wall)-wall
  canvas.height = outerWall*2+height*(pathWidth+wall)-wall
  ctx.fillStyle = wallColor
  
  //TODO: canvasın ya da contextin geri clienta döndürülmesi gerekiyor
  //ctx.fillRect(0,0,canvas.width,canvas.height)
  var canObj = {context: ctx, x: 0, y: 0, wid: canvas.width, hei: canvas.height}; 
  socket.emit("fill-rect", canObj);

  random = randomGen(seed)
  ctx.strokeStyle = pathColor
  ctx.lineCap = 'square'
  ctx.lineWidth = pathWidth
  ctx.beginPath()
  for(var i=0;i<height*2;i++){
    map[i] = []
    for(var j=0;j<width*2;j++){
      map[i][j] = false
    }
  }
  map[y*2][x*2] = true
  route = [[x,y]]
  

  //TODO: canvasın ya da contextin geri clienta döndürülmesi gerekiyor
  ctx.moveTo(x*(pathWidth+wall)+offset,
             y*(pathWidth+wall)+offset)

  
}

loop = function(){
  x = route[route.length-1][0]|0
  y = route[route.length-1][1]|0
  
  var directions = [[1,0],[-1,0],[0,1],[0,-1]],
      alternatives = []
  
  for(var i=0;i<directions.length;i++){
    if(map[(directions[i][1]+y)*2]!=undefined&&
       map[(directions[i][1]+y)*2][(directions[i][0]+x)*2]===false){
      alternatives.push(directions[i])
    }
  }
  
  if(alternatives.length===0){
    route.pop()
    if(route.length>0){
      ctx.moveTo(route[route.length-1][0]*(pathWidth+wall)+offset,
                 route[route.length-1][1]*(pathWidth+wall)+offset)
      timer = setTimeout(loop,delay)
    }
    return;
  }
  direction = alternatives[random()*alternatives.length|0]
  route.push([direction[0]+x,direction[1]+y])
  ctx.lineTo((direction[0]+x)*(pathWidth+wall)+offset,
             (direction[1]+y)*(pathWidth+wall)+offset)
  map[(direction[1]+y)*2][(direction[0]+x)*2] = true
  map[direction[1]+y*2][direction[0]+x*2] = true

  //TODO: canvasın ya da contextin geri clienta döndürülmesi gerekiyor

  ctx.stroke()
  timer = setTimeout(loop,delay)
}

function callMaze(canvasId) {
  console.log("as");
  var canvasObject = document.getElementById(canvasId);
  var obj = {canvasObj: canvasObject, context: canvasObject.getContext('2d')};
  socket.emit("generate-maze", obj);  
}
