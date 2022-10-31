var player, playerRunImg, playerFallImg, playerPauseImg;
var bg, bgImg, invisibleGround;
var junk, junkImg
var junksGroup, junk1, junk2, junk3, junk4, junk5, junk6;
var healthysGroup, healthy1, healthy2, healthy3, healthy4, healthy5, healthy6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var j = 0;
var h = 0;

var IsGameOver = false

function preload() {
  playerRunImg = loadAnimation("assets/giphy/player_00.png", "assets/giphy/player_01.png", "assets/giphy/player_02.png", "assets/giphy/player_03.png", "assets/giphy/player_04.png", "assets/giphy/player_05.png")
  playerFallImg = loadAnimation("assets/giphy/player_fall1.png")
  playerPauseImg = loadAnimation("assets/giphy/player_25.png")
  bgImg = loadImage("assets/bg.jpeg")
  junk1 = loadImage("assets/junk1.png");
  junk2 = loadImage("assets/junk2.png");
  junk3 = loadImage("assets/junk3.png");
  junk4 = loadImage("assets/junk4.png");
  junk5 = loadImage("assets/junk5.png");
  junk6 = loadImage("assets/junk6.png");
  healthy1 = loadImage("assets/healthy1.png");
  healthy2 = loadImage("assets/healthy2.png");
  healthy3 = loadImage("assets/healthy3.png");
  healthy4 = loadImage("assets/healthy4.png");
  healthy5 = loadImage("assets/healthy5.png");
  healthy6 = loadImage("assets/healthy6.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  bg = createSprite(0, displayHeight / 2, windowWidth, windowHeight)
  bg.addImage(bgImg)
  bg.scale = 0.8
  player = createSprite(windowWidth - 300, displayHeight - 80, 50, 50)
  player.addAnimation('run', playerRunImg);
  player.addAnimation('pause', playerPauseImg);
  player.addAnimation('fall', playerFallImg);
  player.scale = 0.6
  junksGroup = new Group()
  healthysGroup = new Group()
  invisibleGround = createSprite(windowWidth / 2, displayHeight - 40, windowWidth, 32);
  invisibleGround.visible = false;
}

function draw() {
  background("white")
  if (gameState === PLAY) {
    player.debug = true;
    player.setCollider("circle", 10, 10, 60)
    bg.velocityX = 2
    if (bg.x + 300 > windowWidth) {
      bg.x = bg.width / 4;
    }
    if ((keyDown("space") || touches.length > 0)) {
      player.velocityY = -8;
      touches = []
    }
    player.velocityY = player.velocityY + 0.2
    player.collide(invisibleGround)
    if (junksGroup.isTouching(player)) {
      j = j + 1
      player.scale += 0.01
      if (player.scale > 1.2) {
        player.velocityX = 0;
        player.velocityY = 0;
        player.scale = 0.5;
        player.changeAnimation("pause")
        gameState = END;
        console.log("inside junk touch")
      }

    }
    if (healthysGroup.isTouching(player)) {
      h += 1
      console.log("healthy food")
      console.log(player.scale)
    }

    spawnJunkfd()
    spawnHealthyfd()
  } else if (gameState === END) {
    bg.velocityX = 0
    junksGroup.setVelocityXEach(0);
    healthysGroup.setVelocityXEach(0)
    player.changeAnimation("fall", playerFallImg)
    player.scale = 0.8
    IsGameOver = true
    GameOver()
  }
  drawSprites()
  textSize(20)
  fill("white")
  text("🅗🅔🅐🅛🅣🅗🅨 🅕🅞🅞🅓🅢 🎉= " + h, displayWidth - 210, displayHeight / 2 - 250)
  text("𝐣𝐮𝐧𝐤 𝐟𝐨𝐨𝐝s 🍔 = " + j, displayWidth - 210, displayHeight / 2 - 200)
  if (j > 40) {
    fill("red")
    text("WARNING: TOO MUCH JUNK FOOD!!!= " + j, displayWidth - 210, displayHeight / 2 - 170)
  }
  if (h > 100) {
    fill("purple")
    text("WELL DONE YOU HAVE COMPLETED THE GAME!!!=  ", displayWidth - 210, displayHeight / 2 - 290)
  }
  if (j >= 60) {
    fill("#041C32")
    textSize(50);
    stroke("#041C32")
    strokeWeight(10)
    fill("#EA047E ")
    textFont("Corinthia")
    text("say no to unhealthy foods", displayWidth - 220, displayHeight / 2 - 130)
  }
}


function spawnJunkfd() {
  if (frameCount % 110 === 0) {
    var junk = createSprite(Math.round(random(1, 6)), displayHeight - 150, 10, 40);
    junk.velocityX = 10
    junk.scale = 0.2
    var rn = Math.round(random(1, 6))
    switch (rn) {
      case 1:
        junk.addImage(junk1);
        break;
      case 2:
        junk.addImage(junk2);
        break;
      case 3:
        junk.addImage(junk3);
        break;
      case 4:
        junk.addImage(junk4);
        break;
      case 5:
        junk.addImage(junk5);
        break;
      case 6:
        junk.addImage(junk6);
        break;
      default:
        break;

    }
    junk.debug = true;
    junk.lifetime = 300
    junksGroup.add(junk)
  }
}

function spawnHealthyfd() {
  if (frameCount % 70 === 0) {
    var healthy = createSprite(Math.round(random(1, 6)), displayHeight - 150, 10, 40);
    healthy.velocityX = 10
    healthy.scale = 0.2
    var rn = Math.round(random(1, 6))
    switch (rn) {
      case 1:
        healthy.addImage(healthy1);
        break;
      case 2:
        healthy.addImage(healthy2);
        break;
      case 3:
        healthy.addImage(healthy3);
        break;
      case 4:
        healthy.addImage(healthy4);
        break;
      case 5:
        healthy.addImage(healthy5);
        break;
      case 6:
        healthy.addImage(healthy6);
        break;
      default:
        break;

    }
    healthy.debug = true;
    healthy.lifetime = 300
    healthysGroup.add(healthy)
  }
}

function GameOver() {
  swal({
      title: `Game Over!!!`,
      text: "Thanks for playing, Start eating Healthy Food!!",
      imageUrl: "foodScale.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    })
}