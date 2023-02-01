"use strict";

let mines;
let flagged;
let cameraX;
let cameraSpeed;
let dead;
let timeDead;
let score;
let highscore = 0;

const lightGreen = "#a7d948";
const darkGreen = "#8ecc39";
const lightGray = "#e5c29f";
const darkGray = "#d7b899";
const intColors = ["#7b1fa2","#1976d2", "#388e3c", "#d32f2f"];

function setup() {
  const canvas = createCanvas(500, 200)
  canvas.parent("game")
  canvas.elt.onselectstart = () => false

  textAlign(CENTER, CENTER);
  textFont("Georgia");
  noStroke();
  initialize();
}

function initialize() {
  mines = [];
  flagged = [];
  cameraX = -620;
  cameraSpeed = 1;
  dead = false
  timeDead = 0;
  score = 0;
}

function draw() {
  if(timeDead <= 50) {
    drawMain();
  }
  else {
    drawScore();
  }

  if(dead) {
    timeDead += 1;
  }
}

function drawMain() {
  background("#f0f0f0");

  if(cameraX < 0) {
    fill(0);
    textSize(60);
    text("Sweeper", -360 - cameraX, 65);
    textSize(30);
    text("Flag the mines!", -360 - cameraX, 135);
  }

  const firstMine = floor(cameraX / 100);
  for(let i = max(firstMine, 0); i < firstMine + 12; i++) {
    const rectX = i * 100 - cameraX;

    //draw background tiles
    fill(i % 2 ? lightGreen : darkGreen);
    rect(rectX, 100, 100, 100);
    fill(i % 2 ? lightGray : darkGray);
    rect(rectX - 100, 0, 100, 100);

    //create new mines if necessary
    if(i == mines.length) {
      mines.push(random() < 0.5 ? false : true);
      flagged.push(false);
    }

    //draw flag
    if(flagged[i]) {
      fill(0);
      circle(rectX + 50, 150, 30);
    }

    //calculate and draw number
    let adjacentMines = 0;
    for(let j = i - 2; j <= i; j++) {
      if(mines[j]) adjacentMines += 1;
    }
    fill(intColors[adjacentMines]);
    textSize(70);
    text(adjacentMines, rectX - 50, 50);
  }

  if(dead === false) {
    //die if incorrect flag
    if(firstMine > 0) {
      if(flagged[firstMine - 1] != mines[firstMine - 1]) {
        dead = true;
        score = firstMine - 1;
        highscore = max(highscore, score);
      }
    }

    //move camera to the right
    cameraX += cameraSpeed;
    cameraSpeed += 0.001;
  }

  //move camera to the left for ten frames
  else if(timeDead <= 10) {
    cameraX -= 10;
  }

  else if(timeDead === 11) {
    cameraX = round(cameraX / 100) * 100;
  }
}

function drawScore() {
  background(0);

  fill(255);
  textSize(30);
  text("Score: " + score, 250, 70);
  text("Best: " + highscore, 250, 130);
}

function mouseClicked() {
  if(!dead && mouseX >= 0 && mouseX <= 500 && mouseY >= 100 && mouseY <= 200) {
    const i = floor((mouseX + cameraX) / 100);
    if(i >= 0) {
      flagged[i] = !flagged[i];
    }
  }

  if(timeDead > 50) {
    initialize();
  }
}
