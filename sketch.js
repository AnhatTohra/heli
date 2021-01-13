var climberimg, doorimg, towerimg,ghostjumpingimg,ghoststandingimg,sound;
var tower , doorGroup,climberGroup,ibGroup;
var  ghost;
var PLAY = 1;
var END = 0;
var score = 0;
var gameState = PLAY;
function preload(){
 climberimg = loadImage("climber.png");
doorimg = loadImage("door.png");
  towerimg = loadImage ("tower.png");
  ghostjumpingimg = loadImage ("ghost-jumping.png");
  ghoststandingimg = loadImage ("ghost-standing.png");
  sound = loadSound ("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  sound.loop();
  
  tower = createSprite (300,300);
  tower.addImage("tower", towerimg);
  tower.velocityY = 1;
  doorGroup = new Group();
  climberGroup = new Group();
  ibGroup = new Group();
  ghost = createSprite(200,200,50,50);
  ghost.addImage ("ghost",ghoststandingimg);
  ghost.scale = 0.5;

}
function draw(){
  background(0);
 
  if (gameState === PLAY ){
    score = score+Math.round(getFrameRate()/60);
  if (tower.y > 400){
    tower.y = 300;
  }
   if (keyDown("left_arrow")){
  ghost.x = ghost.x-3;
   }
    if (keyDown("right_arrow")){
  ghost.x = ghost.x +3;
   }
  if (keyDown ("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY +0.8;
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  } 
  if (ibGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = END;
  } 

  spawnDoor();
  drawSprites();
}
  if (gameState === END){
    textSize (30);
    fill("yellow");
  text ("Game Over",230,250);
  
  }
   textSize(20);
  fill("red");
  text("score:"+score, 450,50);
}

function spawnDoor(){
  if (frameCount%240===0){
    var door = createSprite(200,-50);
    door.addImage("door",doorimg);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifetime = 700;
    doorGroup.add (door);
    var climber = createSprite(200,10);
    climber.addImage ("climber",climberimg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 700;
    climberGroup.add(climber);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;       
    ibGroup.add(invisibleBlock); 
    door.scale = 0.5;  
}
}