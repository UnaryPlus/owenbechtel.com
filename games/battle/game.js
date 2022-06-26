//Constructs player
function Player(x, y, color){
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.direction;
    this.dead = true;
    this.health = 300;
    this.wins = 0;
    this.draw = function(){
        if(this.health >= 300){
            this.health = 300;
        }
        if(this.x >= 450){
            this.x = 450;
        }
        if(this.x <= 0){
            this.x = 0;
        }
        if(this.y >= 250){
            this.y = 250;
        }
        if(this.y <= 0){
            this.y = 0;
        }
        if(this.dead === false){
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, 50, 50);

            //Draws health bar
            if(this.health > 150) ctx.fillStyle = "#0f0";
            else ctx.fillStyle = "#ff0";
            ctx.fillRect(this.x, this.y, this.health/6, 10);
        }
    };
}

//Constructs health power-ups
function PowerUp(){
    this.x = Math.random()*480;
    this.y = Math.random()*280;
    this.draw = function(){
        ctx.fillStyle = "#0f0";
        ctx.fillRect(this.x, this.y, 20, 20);
        if(this.x + 20 >= player1.x && this.x <= player1.x + 50 && this.y + 20 >= player1.y && this.y <= player1.y + 50){
            player1.health += Math.random()*50 + 50;
            this.x = 1000;
            this.y = 1000;
            setTimeout(function(){
                health.x = Math.random()*480;
                health.y = Math.random()*280;
            }, 6000);
        }
        if(this.x + 20 >= player2.x && this.x <= player2.x + 50 && this.y + 20 >= player2.y && this.y <= player2.y + 50){
            player2.health += Math.random()*50 + 50;
            this.x = 1000;
            this.y = 1000;
            setTimeout(function(){
                health.x = Math.random()*480;
                health.y = Math.random()*280;
            }, 6000);
        }
    };
}

//Constructs bullets
function Bullet(player, color){
    this.shot = false;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.x = player.x + 20;
    this.y = player.y + 20;
    this.draw = function(){
        if(player.dead === false){
            if(this.shot === false){
                this.x = player.x + 20;
                this.y = player.y + 20;
                this.xSpeed = 0;
                this.ySpeed = 0;
            }
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            if(this.x < 0 || this.y < 0 || this.x > 490 || this.y > 290) this.shot = false;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, 10, 10);
        }
    };
}

//Moves players
function move(){
    //Moves player 2
    if(event.keyCode == 37){
        player2.xSpeed = -1;
        player2.ySpeed = 0;
        player2.direction = "left";
    }
    if(event.keyCode == 39){
        player2.xSpeed = 1;
        player2.ySpeed = 0;
        player2.direction = "right";
    }
    if(event.keyCode == 38){
        player2.ySpeed = -1;
        player2.xSpeed = 0;
        player2.direction = "up";
    }
    if(event.keyCode == 40){
        player2.ySpeed = 1;
        player2.xSpeed = 0;
        player2.direction = "down";
    }

    //Moves player 1
    if(event.keyCode == 65){
        player1.xSpeed = -1;
        player1.ySpeed = 0;
        player1.direction = "left";
    }
    if(event.keyCode == 68){
        player1.xSpeed = 1;
        player1.ySpeed = 0;
        player1.direction = "right";
    }
    if(event.keyCode == 87){
        player1.ySpeed = -1;
        player1.xSpeed = 0;
        player1.direction = "up";
    }
    if(event.keyCode == 83){
        player1.ySpeed = 1;
        player1.xSpeed = 0;
        player1.direction = "down";
    }

    event.preventDefault();
}

//Begin game
function beginGame(){
    player1.dead = false;
    player2.dead = false;
    player2.health = 300;
    player1.health = 300;
    player1.x = 0;
    player1.y = 0;
    player2.x = 450;
    player2.y = 250;
    health.x = Math.random()*480;
    health.y = Math.random()*280;
    interval = setInterval(draw, 10);
    document.getElementById("start-game").onclick = null;
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var time = 0;
var bullet = 0;
var interval;

ctx.textAlign = "center";

//Creates players
player1 = new Player(0, 0, "#f00");
player2 = new Player(450, 250, "#00f");

//Creates powerup
var health = new PowerUp();

//Creates bullets
player1Bullets = new Array(20);
player2Bullets = new Array(20);
for(var i = 0; i < 20; i++){
    player1Bullets[i] = new Bullet(player1, "#f00");
    player2Bullets[i] = new Bullet(player2, "#00f");
}

//Update game
function draw(){
    time += 1;
    ctx.clearRect(0, 0, 500, 300);

    //Draws bullets and checks if player is dying
    for(var i = 0; i < 20; i++){
        player1Bullets[i].draw();
        player2Bullets[i].draw();
        if(player1.x + 50 >= player2Bullets[i].x && player1.x <= player2Bullets[i].x + 10 && player1.y + 50 >= player2Bullets[i].y && player1.y <= player2Bullets[i].y + 10){
            player1.health -= 10;
            player2Bullets[i].shot = false;
        }
        if(player2.x + 50 >= player1Bullets[i].x && player2.x <= player1Bullets[i].x + 10 && player2.y + 50 >= player1Bullets[i].y && player2.y <= player1Bullets[i].y + 10){
            player2.health -= 10;
            player1Bullets[i].shot = false;
        }
    }

    //Makes players respawn if they run into each other
    while(player1.x + 50 >= player2.x && player1.y + 50 >= player2.y && player1.x <= player2.x + 50 && player1.y <= player2.y + 50){
        player1.x = Math.random()*450;
        player1.y = Math.random()*250;
        player2.x = Math.random()*450;
        player2.y = Math.random()*250;
    }

    //Draws players
    player1.draw();
    player2.draw();

    //Draws powerup
    health.draw();

    //Shoots bullets
    if(time % 20 == 0){
        switch(player1.direction){
            case "up": player1Bullets[bullet].ySpeed = -4; player1Bullets[bullet].shot = true; break;
            case "down": player1Bullets[bullet].ySpeed = 4; player1Bullets[bullet].shot = true; break;
            case "left": player1Bullets[bullet].xSpeed = -4; player1Bullets[bullet].shot = true; break;
            case "right": player1Bullets[bullet].xSpeed =  4; player1Bullets[bullet].shot = true; break;
        }
        switch(player2.direction){
            case "up": player2Bullets[bullet].ySpeed = -4; player2Bullets[bullet].shot = true; break;
            case "down": player2Bullets[bullet].ySpeed = 4; player2Bullets[bullet].shot = true; break;
            case "left": player2Bullets[bullet].xSpeed = -4; player2Bullets[bullet].shot = true; break;
            case "right": player2Bullets[bullet].xSpeed =  4; player2Bullets[bullet].shot = true; break;
        }
        bullet ++;
        if(bullet > 19) bullet = 0;
    }

    //Kills Players
    if(player1.health <= 0){
        player1.dead = true;
    }
    if(player2.health <= 0){
        player2.dead = true;
    }
    //End of game
    if(player1.dead == true && player2.dead == false){
        player2.health = 300;
        ctx.font = "50px garamond";
        ctx.fillStyle = "#00f";
        ctx.clearRect(0, 0, 500, 300);
        ctx.fillText("Player 2 Wins!", 250, 160);
        clearInterval(interval);
        player2.wins += 1;
        document.getElementById("button").onclick = function(){
            beginGame();
        }
    }
    if(player1.dead == false && player2.dead == true){
        player1.health = 300;
        ctx.font = "50px garamond";
        ctx.fillStyle = "#f00";
        ctx.clearRect(0, 0, 500, 300);
        ctx.fillText("Player 1 Wins!", 250, 160);
        clearInterval(interval);
        player1.wins += 1;
        document.getElementById("button").onclick = function(){
            beginGame();
        };
    }
    document.getElementById("score1").innerHTML = player1.wins;
    document.getElementById("score2").innerHTML = player2.wins;
}

document.body.onkeydown = move;
document.getElementById("start-game").onclick = beginGame;
