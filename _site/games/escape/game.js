//countdown
function countdown(){
    var count = 4;
    this.update = function(){
        ctx.clearRect(0, 0, 500, 500);
        count -= 1;
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.font = "100px garamond";
        if(count > 0){
            ctx.fillText(count, 250, 275);
        } if(count === 0){
            ctx.fillText("Begin!", 250, 275);
        }
        
        if(count > -2){
            setTimeout(function(){
                this.update();
            }, 1000);
        }
        
    };
    this.update();
}

//Updates mouse position
function mouseUpdate(evt){
    var rect = canvas.getBoundingClientRect();
    mouse.x = evt.clientX - rect.left;
    mouse.y = evt.clientY - rect.top;
}

//Updates position of enemy
function enemyUpdate(){
    var rand = Math.random();
    var angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    if(player.x < enemy.x && player.y < enemy.y){
        if(rand < 0.5){
            enemy.xSpeed = Math.cos(angle);
            enemy.ySpeed = Math.sin(angle);
        } else if(rand < 0.8){
            enemy.ySpeed = 0;
            enemy.xSpeed = -0.9;
        } else {
            enemy.xSpeed = 0;
            enemy.ySpeed = -0.9;
        }
    }
    if(player.x >= enemy.x && player.y < enemy.y){
        if(rand < 0.5){
            enemy.xSpeed = Math.cos(angle);
            enemy.ySpeed = Math.sin(angle);
        } else if(rand < 0.8){
            enemy.ySpeed = 0;
            enemy.xSpeed = 0.9;
        } else {
            enemy.xSpeed = 0;
            enemy.ySpeed = -0.9;
        }
    }
    if(player.x < enemy.x && player.y >= enemy.y){
        if(rand < 0.5){
            enemy.xSpeed = 0;
            enemy.ySpeed = 0.9;
        } else if(rand < 0.8){
            enemy.xSpeed = -0.9;
            enemy.ySpeed = 0;
        } else {
            enemy.xSpeed = Math.cos(angle);
            enemy.ySpeed = -1;
        }
    }
    if(player.x >= enemy.x && player.y >= enemy.y){
        if(rand < 0.5){
            enemy.xSpeed = 0;
            enemy.ySpeed = 0.9;
        } else if(rand < 0.8){
            enemy.xSpeed = 0.9;
            enemy.ySpeed = 0;
        } else {
            enemy.xSpeed = Math.cos(angle);
            enemy.ySpeed = -1;
        }
    }
}

//Defines what a player is
function dude(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.draw = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if(this.x < 20){
            this.x = 20;
        }
        if(this.x > 480){
            this.x = 480;
        }
        if(this.y < 20){
            this.y = 20;
        }
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, tau);
        ctx.fill();
    };
}

//Starts game
function beginGame(){
    
    document.getElementById("button").onclick = null;
    
    //Creates player and enemy
    player = new dude(200, 400, "#00f");
    enemy = new dude(300, 460, "#f00");
    time = 0;
    
    countdown();
    
    setTimeout(function(){
        interval = setInterval(draw, 20);
    }, 4000);
    
}

//ends game
function endGame(victory){
    clearInterval(interval);
    
    //Player wins!
    if(victory === true){
        ctx.fillStyle = "#0f0";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "#000";
        ctx.font = "50px garamond";
        ctx.textAlign = "center";
        ctx.fillText("You Win!", 250, 175);
        ctx.fillText("Your Score: " + roundTime, 250, 280);
        if(roundTime > highscore){
            highscore = roundTime;
        }
    }
    
    //Player loses!
    if(victory === false){
        ctx.fillStyle = "#f00";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "#000";
        ctx.font = "50px garamond";
        ctx.textAlign = "center";
        ctx.fillText("You Lose!", 250, 250);
    }
    
    document.getElementById("button").onclick = beginGame;
}

//Pi is wrong!
var tau = Math.PI*2;

var canvas = document.getElementById("gameCanvas");          var ctx = canvas.getContext("2d");
var player;
var enemy;
var interval;
var time = 0;
var roundTime = 0;
var mouse = {
    x : 0,
    y : 0
}

//highscore
var highscore = 0;

var draw = function(){
    ctx.clearRect(0, 0, 500, 500);

    //Moves player
    {
        let angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
        player.x += Math.cos(angle);
        if(angle < 0){
            player.y += Math.sin(angle);
        }
    }
    player.draw();
    
    time += 0.02;
    roundTime = Math.round(time*10)/10;
    
    //Moves enemy
    if(Number.isInteger(roundTime)){
        enemyUpdate();
    }
    enemy.draw();
    
    //Checks if player has won
    if(player.y === 20){
        endGame(true);
    }
    
    //Checks if player has lost
    if(Math.sqrt((player.x - enemy.x)*(player.x - enemy.x) + (player.y - enemy.y)*(player.y - enemy.y)) < 40){
        endGame(false);
    }
    
    //Checks if player has lost
    
    ctx.fillStyle = "#000";
    ctx.textAlign = "right";
    ctx.font = "30px garamond";
    ctx.fillText(roundTime, 490, 30);
    
    document.getElementById("highscore").innerHTML = highscore;
}