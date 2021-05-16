
//Firebase Console database should have 2 nodes and 2 sub nodes for position

//ball
   //position
      //x: 439
      //y: 269







const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var ball;
var database;
var position;
function setup() {
  createCanvas(500, 500);
 
  database = firebase.database();
  console.log(database);

  ball = createSprite(250,250,10,10);
  ball.shapeColor = "red";
 
  var ballPosition = database.ref('ball/position');
  ballPosition.on("value", readPosition, showError);
}

function draw() {
  background("white");

  if (position !== undefined){
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  }
}
  drawSprites();

}


/*function changePosition(x,y) {
  ball.x = ball.x+x;
  ball.y = ball.y+y;
}*/
function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  ball.x = position.x;
  ball.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}