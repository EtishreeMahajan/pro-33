var Engine = Matter.Engine;
var World = Matter.World;
var Events = Matter.Events;
var Bodies = Matter.Bodies;

var engine, world, bodies;
var line;
var particle;
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var score = 0;
var turn = 0;
var gameState = "play";

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }

  line = createSprite(0, 450, 1600, 5);
  line.shapeColor = "blue";

  //particle = new Particle(400, 10, 10);
}

function draw() {
  background("black");
  textSize(20)
  fill("yellow")
  text("Score : " + score, 20, 30);
  text("Turn Left :" + turn, 680, 30)
  text(500, 25, 650);
  text(500, 100, 650);
  text(500, 185, 650);
  text(300, 265, 650);
  text(300, 345, 650);
  text(300, 425, 650);
  text(300, 505, 650);
  text(400, 585, 650);
  text(400, 665, 650);
  text(400, 745, 650);

  Engine.update(engine);
  if (gameState === "play") {
    for (var i = 0; i < plinkos.length; i++) {
      plinkos[i].display();
    }

    for (var k = 0; k < divisions.length; k++) {
      divisions[k].display();
    }

    if (particle !== null) {
      particle.display();
      if (particle.body.position.y > 650) {
        if (particle.body.position.x < 190) {
          score += 500;
          particle = null;
        }
        if (particle.body.position.x > 190 && particle.body.position.x < 580) {
          score += 300;
          particle = null;
        }
        else {
          score += 400;
          particle = null;
        }
      }
    }

    if (turn === 5) {
      gameState = "end";
    }
  }
  else {
    particle = null;
    textSize(40);
    fill(255);
    text("GAME OVER",300,400);
  }
  drawSprites();
}

function keyPressed() {
  if (keyCode === 32) {
    if (gameState !== "end") {
      turn++;
      particle = new Particle(mouseX, 10, 10, 10);
    }
  }
}