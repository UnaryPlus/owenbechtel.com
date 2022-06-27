"use strict";

(function() {

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var obstacles = new Array(1000);
var player;
var score = 0;
var highscore = 0;

function Rectangle(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.gravity = 0;
    this.update = function(){
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function(){
        this.ySpeed += this.gravity;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.hitBottom();
        this.hitTop();
    };
    this.hitBottom = function(){
        if(this.y >= 220){
            this.y = 220;
        }
    };
    this.hitTop = function(){
        if(this.y <= 0){
            this.y = 0;
        }
    };
}

function startGame() {
    document.getElementById("start-game").onclick = null;
    player = new Rectangle(50, 50, 50, 50, "blue");
    player.gravity = 0.25;
    for(var i = 0; i < 1000; i += 1){
        var x = i * 200 + 400;
        var y = Math.round(Math.random()) * 170;
        obstacles[i] = new Rectangle(x, y, 20, 100, "red");
        obstacles[i].xSpeed = -2;
    }
    setInterval(updateGame, 20);
}

function updateGame() {
    ctx.clearRect(0, 0, 480, 270);
    player.newPos();
    player.update();
    if(score > highscore){
        highscore = score;
    }
    for(var i = 0; i < 1000; i++) {
        obstacles[i].newPos();
        obstacles[i].update();
        obstacles[i].xSpeed -= 0.003;
        if(player.x + 50 >= obstacles[i].x) {
            score = i + 1;
        }
        if(player.x + 50 >= obstacles[i].x && player.y + 50 >= obstacles[i].y && player.x <= obstacles[i].x + 20 && player.y <= obstacles[i].y + 100){
            restartGame();
        }
    }
    document.getElementById("score").innerText = score;
    document.getElementById("highscore").innerText = highscore;
}

function restartGame() {
    score = 0;
    for(var i = 0; i < 1000; i += 1){
        obstacles[i].xSpeed = -2;
        obstacles[i].x = i * 200 + 400;
        obstacles[i].y = Math.round(Math.random()) * 170;
    }
}

document.getElementById("start-game").onclick = startGame;

document.body.onkeydown = function(evt) {
    if(evt.repeat) return;
    if(player.ySpeed >= 0){
        player.ySpeed = 0;
        player.gravity = -0.25;
    }
    else {
        player.ySpeed = 0;
        player.gravity = 0.25;
    }
}

})();
