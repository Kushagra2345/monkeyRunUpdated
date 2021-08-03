var gameState="play"
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,obstacle2;
var FoodGroup, obstacleGroup
var score=0;
var ground;
var invisibleGround;
var ground2;
var gameOver;
var restart;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
}



function setup() {
  bananaGrp=new Group();
  
    
  createCanvas(600,600)
   monkey=createSprite(100,500)
   monkey.scale=0.12

  monkey.addAnimation("running",monkey_running)
  
 ground=createSprite(300,550,600,20) 
  invisibleGround=createSprite(300,553,600,20)
  
  invisibleGround.visible=false;
  
  ground2=createSprite(300,872,600,57)
  ground.shapeColor="brown"
  ground2.shapeColor="brown"
  obstacle=createSprite(random(250,550),random(0,100))
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.1
}


function draw() {
  

  background(obstacle.y,obstacle.x,monkey.y)
 

  camera.position.x=monkey.x
  camera.position.y=monkey.y


  if (World.frameCount%100===0 && gameState==="play"){
    banana=createSprite(random(500,600),random(350,500))
    bananaGrp=new Group();
    bananaGrp.add(banana);
    banana.addImage(bananaImage)
    banana.scale=0.15
    banana.velocityX=-(6+(score/2000))
  }
  

  
  console.log(obstacle.velocityY)
  if (obstacle.x<0 && gameState==="play"){
    obstacle.x=random(550,600)
    obstacle.y=random(10,520)
    obstacle.velocityX=random(-12,-8)
  obstacle.velocityY=random(0,5)
  obstacle.collide(invisibleGround)
    
    var rand=random(1,2)
    obstacle.velocityY=obstacle.velocityY+rand
    
  }
  
  if(gameState==="play"){
  score=score+Math.round(frameCount/100)
  }
    
  obstacle.collide(invisibleGround)
  var rand=random(1,2)
  obstacle.velocityY=obstacle.velocityY+rand
  
  if (obstacle.y>510){
  obstacle.velocityX=-(10+(score/1000))

  }
  
  if (gameState==="play"&& monkey.isTouching(bananaGrp)){
    bananaGrp.destroyEach()
    score=score+100
  }
  
  
  if (keyDown("space")&& monkey.y>505){
    monkey.velocityY=-20
  }
  
  monkey.velocityY=monkey.velocityY+1.5

  if (monkey.isTouching(obstacle)){
    gameState="over"
  }
  
  if (gameState==="over"){
    bananaGrp.destroyEach();

    obstacle.visible=false;
    gameOver=createSprite(100,300)
    gameOver.addImage(gameOverImg)
    }
  
  if (gameState==="play"){
    obstacle.visible=true;
  }
  
  
  monkey.collide(invisibleGround)
  drawSprites();
  textSize(30)
  fill("red")
  text("Score: "+score,70,350)

  if (gameState==="end"){
    gameOver.visible=true;
    }
  
  }






