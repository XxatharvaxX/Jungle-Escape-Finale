var bgImg;
var pc, maxImg;
var platform, platformImg;
var gorilla, gorillaImg;
var plant, plantImg;
var apple,banana, berry, appleImg, bananaImg, berryImg;
var bottle, bottleImg;
var ground;
var obstacleGroup;
var energyGroup;
var platformGroup;
var invisibleGround;
var score;
var gamestate = PLAY;
var PLAY = 1;
var END = 2;
var foodBar;
var drinkBar;
var houseImg, house;

function preload()
{
  bgImg = loadImage("./Assets/Jungle.jpg");
  platformImg = loadImage("./Assets/platformBg.png");
  gorillaImg = loadImage("./Assets/gorillaBg.png");
  plantImg = loadImage("./Assets/plantbg.png");
  appleImg = loadImage("./Assets/appleBg.png");
  bananaImg = loadImage("./Assets/bananabg.png");
  berryImg = loadImage("./Assets/berrybg.png");
  bottleImg = loadImage("./Assets/waterBg.png");
  maxImg = loadImage("./Assets/Maxbg.png");
  houseImg = loadImage("./Assets/house.png");
}

function setup() {
  createCanvas(800,400);
  
  pc = createSprite(200,300);
  pc.addImage(maxImg);
  pc.scale = 0.3;

  /*plant = createSprite(400,300);
  plant.addImage(plantImg);
  plant.scale = 0.13;

  gorilla = createSprite(700,300);
  gorilla.addImage(gorillaImg);
  gorilla.scale = 0.3;*/

  ground = createSprite(800,380,800,60);
  ground.x = ground.width/2;
  ground.velocityX = -(6+3*score/100);

  invisibleGround = createSprite(400,390,800,30);
  invisibleGround.visible = false;

  obstacleGroup = createGroup();
  energyGroup = createGroup();
  platformGroup = createGroup();

}

function draw() {
  background(bgImg); 
  
  text("Score: "+ score,700,50);

  if(gamestate === PLAY)
  {
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6+3*score/100);
    //add max animation here
    if (keyDown("space") && pc.y >= 150)
    {
      pc.velocityY = -10;
    }

    pc.velocityY += 0.8;

    if(ground.x < 0)
    {
    ground.x = ground.width/2;
    }

   pc.collide(invisibleGround);

   spawnPlantsGorilla();
   spawnFruit();
   spawnPlatforms();
   spawnDrink();

   if(obstacleGroup.isTouching(pc))
   {
     gamestate = END;
   }

   if(frameCount % 5000 === 0)
   {
    house = createSprite(800,300);
    house.addImage(houseImg);
   }

   if(pc.isTouching(house))
   {
     gamestate = END;
   }

  }
  else if(gamestate === END)
  {
    ground.velocityX = 0;
    pc.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    energyGroup.setVelocityXEach(0);
    platformGroup.setVelocityXEach(0);
    pc.visible = false;
  }
  
  

  
  drawSprites();
}

function spawnPlantsGorilla()
{
 if(frameCount % 90===0)
 {
   var obstacle = createSprite(800,300);
   obstacle.velocityX = -(6+3*score/100);

   var randomNum = Math.round(random(1,2));

   switch(randomNum)
   {
     case 1:obstacle.addImage(plantImg);
     obstacle.scale = 0.3;
     break;
     case 2:obstacle.addImage(gorillaImg);
     obstacle.scale = 0.5;
     break;
     default: break;
   }
   obstacle.lifetime = 800;
   obstacleGroup.add(obstacle);
 }
}

function spawnFruit()
{
  if(frameCount % 103===0)
 {
   var energy = createSprite(800,350);
   energy.velocityX = -(6+3*score/100);

   var randomNum = Math.round(random(1,3));

   switch(randomNum)
   {
     case 1:energy.addImage(appleImg);
     energy.scale = 0.1;
     break;
     case 2:energy.addImage(berryImg);
     energy.scale = 0.2;
     break;
     case 3:energy.addImage(bananaImg);
     energy.scale = 0.1;
     break;
     default: break;
   }
   energy.lifetime = 800;
   energyGroup.add(energy);
 }

}

function spawnDrink()
{
  if(frameCount % 180===0)
 {
   var bottle = createSprite(800,350);
   bottle.velocityX = -(6+3*score/100);
   bottle.addImage(bottleImg);
   bottle.scale = 0.2;

   
   bottle.lifetime = 800;
   energyGroup.add(bottle);
 }

}

function spawnPlatforms() {
  
  if (frameCount % 150 === 0) {
     platform = createSprite(900,350,40,10);
    platform.y = Math.round(random(100,150));
    platform.addImage(platformImg);
    platform.scale = 0.5;
    platform.velocityX = -3;
    
    platform.lifetime = 800    
   platformGroup.add(platform);
    }
}

function showFoodBar() {
  push();
  //image(appleBg.png ,width / 2 - 130, height - player.positionY - 350, 20, 20);
  fill("white");
  rect(width/2 + 200, 100, 185, 20);
  fill("#ffc400");
  rect(width/2 + 200, 100, foodBar, 20);
  noStroke();
  pop();
}

function showDrinkBar() {
  push();
  //image(waterBg.png, width / 2 - 130, height - player.positionY - 400, 20, 20);
  fill("white");
  rect(width / 2 + 200, 140, 185, 20);
  fill("#f50057");
  rect(width / 2 + 200, 140, drinkBar, 20);
  noStroke();
  pop();
}