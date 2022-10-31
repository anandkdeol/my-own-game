var trex, trex_running, edges;
var groundImage;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png")
}

function setup() {
  createCanvas(600, 200);

  // creating trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  ground = createSprite(100, 180, 900, 25)
  ground.addImage("ground", groundImage)
  invisibleground=createSprite(100, 190, 900, 25)
  invisibleground.visible=false
}


function draw() {
  //set background color 
  background("white");
  ground.velocityX = -3
  console.log(trex.y)
  if (ground.x < 0) {
    ground.x = ground.width / 2
  }
  //logging the y position of the trex
  console.log(trex.y)

  //jump when space key is pressed
  if (keyDown("space")&& trex.y>=150) {
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8;

  //stop trex from falling down
  trex.collide(invisibleground)
  spawnclouds()
  drawSprites();
}

function spawnclouds() {
  cloud=createSprite(50,45,48,20) 
  cloud.velocityX=-3
}