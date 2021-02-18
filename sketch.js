const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var snake, snakeIm; 
var appleGroup, goldenGroup, apple, gApple; 
var bgIm, background; 
var heart1, heart2, heart3, h1Im, h2Im, h3Im; 
var body1, body2, body3, body4; 
var object1, object2, edges; 

function preload(){
  bgIm = loadImage("MyOwnG.jpg");
  h1Im = loadImage("heart.png"); 
  h2Im = loadImage("heart.png"); 
  h3Im = loadImage("heart.png");
  snakeIm = loadImage("snake.png"); 
}

function setup() {

  createCanvas(900,400);
  background(0)
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  background = createSprite(450, 200, 90, 400);
    background.addImage(bgIm); 

  heart1 = createSprite(795, 80, 20, 20); 
    heart1.addImage(h1Im);
    heart1.scale = 0.15;  
    heart1.visible = true; 
  heart2 = createSprite(795, 130, 20, 20); 
    heart2.addImage(h2Im); 
    heart2.scale = 0.15; 
    heart2.visible = true; 
  heart3 = createSprite(795, 180, 20, 20); 
    heart3.addImage(h3Im); 
    heart3.scale = 0.15;  
    heart3.visible = true; 

  snake = createSprite(300, 200, 26, 26);
    snake.addImage(snakeIm);
    snake.scale = 0.15;

  appleGroup = new Group(); 
  goldenGroup = new Group(); 

  edges = createEdgeSprites(); 

  score = 0 
}

function draw() {
 
  appleSpawn(); 

  if (keyDown(LEFT_ARROW)) {
    snake.x = snake.x - 1; 
  }
  if (keyDown(RIGHT_ARROW)) {
    snake.x = snake.x + 1; 
  }
  if (keyDown(UP_ARROW)) {
    snake.y = snake.y - 1; 
  }
  if (keyDown(DOWN_ARROW)) {
    snake.y = snake.y + 1; 
  }

  if(isTouching(snake, edges)){
    heart1.destroy();
  }
  if(isTouching(snake, edges)){
    heart2.destroy();
  }
  if(isTouching(snake, edges)){
    heart3.destroy();
  }

  if (isTouching(snake, appleGroup)) {
    score = score + 2
    appleGroup.destroy();
  }
  if (isTouching(snake, goldenGroup)) {
    score = score + 6
    goldenGroup.destroy();
  }

  drawSprites();

  textSize(20);
  fill("white");
  text("Score: " + score, 750, 370);

  textSize(25);
  fill("white");
  text("Lives: ", 755, 35);
}

function appleSpawn() {
  if (frameCount%150 === 0) {
    apple = createSprite(400, 200, 20, 20)
    apple.shapeColor = ("brown"); 
    apple.x = Math.round(random(250, 605))
    apple.y = Math.round(random(20, 350))
    if (apple.x === apple.y) {
      apple.destroy(); 
    }
    snake.depth = apple.depth;
    snake.depth = snake.depth + 1; 
    appleGroup.add(apple)
  }
  if (frameCount%550 === 0) {
    gApple = createSprite(400, 200, 20, 20)
    gApple.shapeColor = ("yellow");
    gApple.x = Math.round(random(250, 605))
    gApple.y = Math.round(random(20, 350))
    if (gApple.x === gApple.y) {
      gApple.destroy(); 
    }
    if (gApple.x === apple.x || gApple.y === apple.y) {
      gApple.destroy(); 
    }
    snake.depth = gApple.depth;
    snake.depth = gApple.depth + 1; 
    goldenGroup.add(gApple)
  }
}

function isTouching(object1, object2) {
  if(object1.x - object2.x > object1.width/2 + object2.width/2 &&
    object1.y - object2.y > object1.height/2 + object2.height/2 &&
    object2.x - object1.x > object2.width/2 + object1.width/2 &&
    object2.y - object1.y > object2.height/2 + object1.height/2){
    return true
  } else {
    return false
  }
}