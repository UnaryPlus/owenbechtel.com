document.body.onmousemove = function() {
  mouseUpdate(event);
}

document.body.onmousedown = function() {
  pressed = true;
}

document.body.onmouseup = function() {
  pressed = false;
  justPressed = true;
  canvasClick();
}

//Executes when canvas is clicked
function canvasClick(){
    clicked = true;
    setTimeout(function(){clicked = false;}, 9);
    if(songStarted === false){
        song.play();
        song.volume = 0.5;
        songStarted = true;
        musicOn = true;
    }
}

//Button
function roundRect(x, y, width, height, radius, funct, locked){
    //Draws rounded rectangle
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, tau/2, 3*tau/4);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, 3*tau/4, tau);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, tau, tau/4);
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, tau/4, tau/2);
    ctx.lineTo(x, y + radius);
    ctx.closePath();
    ctx.stroke();

    //Draws lock symbol if locked
    if(locked === true){
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + width - 35, y + height*0.45, 20, 15);
        ctx.beginPath();
        ctx.ellipse(x + width-35 + 10, y + height*0.45, 10, 13, 0, tau/2, tau);
        ctx.lineTo(x + width - 35 + 15, y + height*0.45);
        ctx.ellipse(x + width - 35 + 10, y + height*0.45, 5, 7.5, 0, tau, tau/2, true);
        ctx.closePath();
        ctx.fill();
    }

    //Performs function if clicked
    if(clicked === true && mouse.x >= x && mouse.y >= y && mouse.x <= x + width && mouse.y <= y + height && locked === false){
        funct();
    }
}

//Updates position of mouse
function mouseUpdate(evt){
    var rect = canvas.getBoundingClientRect();
    mouse.x = evt.clientX - rect.left;
    mouse.y = evt.clientY - rect.top;
    if(pressed === true && justPressed === true){
        mouse.startX = mouse.x;
        mouse.startY = mouse.y;
        justPressed = false;
    }
}

function check(){
    //End of level
    if(Math.sqrt(Math.pow(hole.x - ball.x, 2) + Math.pow(hole.y - ball.y, 2)) <= 20){
        if(justWentInHole === true){
            ballInHole.play();
        }
        justWentInHole = false;
        ctx.fillStyle = "#0f0";
        ctx.fillRect(0, 0, 600, 600);
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.font = "50px garamond";
        ctx.fillText("Level Complete!", 300, 175);
        ctx.font = "30px garamond";
        ctx.fillText("Your score: " + level.score, 300, 250);
        ctx.fillText("Par: " + level.par, 300, 325);
        ctx.font = "35px garamond";
        ctx.fillText("Next Level", 300, 435);
        ctx.textAlign = "left";
        roundRect(100, 100, 400, 400, 20, function(){
            console.log("Hello!");
        }, false);
        switch(level.screen){
            case 1:
                score.l1 = level.score;
                break;
            case 2:
                score.l2 = level.score;
                break;
            case 3:
                score.l3 = level.score;
                break;
            case 4:
                score.l4 = level.score;
                break;
            case 5:
                score.l5 = level.score;
                break;
            case 6:
                score.l6 = level.score;
                break;
            case 7:
                score.l7 = level.score;
                break;
            case 8:
                score.l8 = level.score;
                break;
            case 9:
                score.l9 = level.score;
                break;
        }
        level.on += 1;
        ball.xSpeed = 0;
        ball.ySpeed = 0;

        //Next Level Button
        roundRect(200, 390, 200, 70, 20, function(){
            level.screen = level.on;
            justWentInHole = true;
            if(level.on > level.num){
                ball.x = 200;
                ball.y = 200;
                ball.xSpeed = 1.5;
                ball.ySpeed = 2;
            } else {
                ball.x = 100;
                ball.y = 100;
                ball.canMove = false;
                setTimeout(function(){
                    ball.canMove = true;
                }, 20);
            }
            level.score = 0;
        }, false);
    }
}

//Obstacle constructor
function obstacle(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.draw = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if(this.xSpeed === 0 && this.ySpeed === 0){
            ctx.fillStyle = "#50c850";
        } else {
            ctx.fillStyle = "#41a000";
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //Left side
        if(ball.x + 10 > this.x && ball.y + 10 > this.y + 5 && ball.x - 10 < this.x && ball.y - 10 < this.y + this.height - 5){
            ball.x = this.x - 10;
            ball.xSpeed = -ball.xSpeed + this.xSpeed;
            bounce.play();
        }

        //Right side
        if(ball.x - 10 < this.x + this.width && ball.y + 10 > this.y + 5 && ball.x + 10 > this.x + this.width && ball.y - 10 < this.y + this.height - 5){
            ball.x = this.x + this.width + 10;
            ball.xSpeed = -ball.xSpeed + this.xSpeed;
            bounce.play();
        }

        //Top side
        if(ball.x + 10 >= this.x + 5 && ball.x - 10 <= this.x + this.width -5 && ball.y + 10 >= this.y && ball.y - 10 <= this.y){
            ball.y = this.y - 10;
            ball.ySpeed = -ball.ySpeed + this.ySpeed;
            bounce.play();
        }

        //Bottom side
        if(ball.x + 10 >= this.x + 5 && ball.x - 10 <= this.x + this.width - 5 && ball.y + 10 >= this.y + this.height && ball.y - 10 <= this.y + this.height){
            ball.y = this.y + this.height + 10;
            ball.ySpeed = -ball.ySpeed + this.ySpeed;
            bounce.play();
        }
    }
}

//Round obstacle
function bumper(x, y, radius){
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.radius = radius;
    this.radiusSpeed = 0;
    this.draw = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.radius += this.radiusSpeed;
        ctx.beginPath();
        if(this.xSpeed === 0 && this.ySpeed === 0 && this.radiusSpeed === 0){
            ctx.fillStyle = "#ff0000";
        } else {
            ctx.fillStyle = "#dd0000";
        }
        ctx.arc(this.x, this.y, this.radius, 0, tau);               ctx.fill();

        //Checks for collision
        if(Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2)) <= this.radius + 10){
            let angle = Math.atan2(ball.y - this.y, ball.x - this.x);
            //Speed of the ball
            let vectLength = Math.sqrt(ball.xSpeed*ball.xSpeed + ball.ySpeed*ball.ySpeed);

            if(vectLength === 0){
                ball.xSpeed = Math.cos(angle);
                ball.ySpeed = Math.sin(angle);
            } else {
            ball.xSpeed = Math.cos(angle)*vectLength*1.5 + this.xSpeed;
            ball.ySpeed = Math.sin(angle)*vectLength*1.5 + this.ySpeed;
            bounce.play();
            }
        }
    }
}

//Water
function water(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.draw = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        ctx.fillStyle = "#0066ff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if(ball.x >= this.x && ball.x <= this.x + this.width && ball.y >= this.y && ball.y <= this.y + this.height){
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            splash.play();
        }
    }
}

//Sand
function sand(x, y, width, height){
    this.draw = function(){
        ctx.fillStyle = "#edd9af";
        ctx.fillRect(x, y, width, height);

        //Makes ball slower
        if(ball.x >= x && ball.x <= x + width && ball.y <= y + height && ball.y >= y){
            ball.xSpeed -= ball.xSpeed/20;
            ball.ySpeed -= ball.ySpeed/20;
        }
    }
}

//Hill
function hill(x, y, width, height, direction){
    this.draw = function(){
        var rotateAmount;
        var center = {
            x : x + width/2,
            y : y + height/2
        }
        switch(direction){
            case "up":
                ctx.fillStyle = "#00e800";
                rotateAmount = 0;
                break;
            case "right":
                ctx.fillStyle = "#00da00";
                rotateAmount = tau/4;
                break;
            case "down":
                ctx.fillStyle = "#00e000";
                rotateAmount = tau/2;
                break;
            case "left":
                ctx.fillStyle = "#00d500";
                rotateAmount = 3*tau/4;
                break;
        }
        ctx.fillRect(x, y, width, height);

        ctx.translate(center.x, center.y);
        ctx.rotate(rotateAmount);

        //Draws arrow
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.moveTo(-15, 10);
        ctx.lineTo(0, -15);
        ctx.lineTo(15, 10);
        ctx.closePath();
        ctx.fill();

        ctx.rotate(-rotateAmount);
        ctx.translate(-center.x, -center.y);

        if(ball.x >= x && ball.x <= x + width && ball.y >= y && ball.y <= y + height){
            ball.onHill = true;
            switch(direction){
                case "up":
                    ball.ySpeed -= 0.025;
                    break;
                case "right":
                    ball.xSpeed += 0.025;
                    break;
                case "down":
                    ball.ySpeed += 0.025;
                    break;
                case "left":
                    ball.xSpeed -= 0.025;
                    break;
            }
        }
    }
}

//Portal
function portal(x1, y1, x2, y2, color){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.y1Speed = 0;
    this.x1Speed = 0;
    this.x2Speed = 0;
    this.y2Speed = 0;
    var rotateAmount = 0;
    this.draw = function(){
        rotateAmount += tau/180;
        this.x1 += this.x1Speed;
        this.y1 += this.y1Speed;
        this.x2 += this.x2Speed;
        this.y2 += this.y2Speed;

        //Draws black circles
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.arc(this.x1, this.y1, 30, 0, tau);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.arc(this.x2, this.y2, 30, 0, tau);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x1, this.y1, 30, 0, tau);                        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x2, this.y2, 30, 0, tau);                        ctx.fill();

        //Draws spinning arcs
        ctx.translate(this.x1, this.y1);
        ctx.rotate(rotateAmount);
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 30, 0, tau/4);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 30, tau/2, 3*tau/4);
        ctx.fill();
        ctx.rotate(-rotateAmount);
        ctx.translate(-this.x1, -this.y1);

        ctx.translate(this.x2, this.y2);
        ctx.rotate(rotateAmount);
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 30, 0, tau/4);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 30, tau/2, 3*tau/4);
        ctx.fill();
        ctx.rotate(-rotateAmount);
        ctx.translate(-this.x2, -this.y2);

        //Teleports ball
        var dx1 = ball.x - this.x1;
        var dy1 = ball.y - this.y1;
        var distance1 = Math.sqrt(dx1*dx1 + dy1*dy1);
        if(distance1 < 40){
            ball.x = this.x2 - dx1;
            ball.y = this.y2 - dy1;
            teleportation.play();
        }
    }
}

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

//Sounds
var song = document.getElementById("song");
var bounce = document.getElementById("bounce");
var splash = document.getElementById("splash");
var ballInHole = document.getElementById("ballInHole");
var ballHit = document.getElementById("ballHit");
var teleportation = document.getElementById("teleportation");

var songStarted = false;
var justWentInHole = true;

//Pi is wrong
var tau = 2*Math.PI;

//If canvas is being clicked
var clicked = false;

var pressed = false;
var justPressed = true;

//If level select is locked
var selectLocked = true;

var musicOn = false;

//Mouse controls
var controls = "click";



//Creates gradient
var gradient = ctx.createLinearGradient(0, 0, 600, 600);
gradient.addColorStop(0, "#f00");
gradient.addColorStop(1/6, "#ff0");
gradient.addColorStop(1/3, "#fff");
gradient.addColorStop(1/2, "#0ff");
gradient.addColorStop(2/3, "#00f");
gradient.addColorStop(5/6, "#f0f");
gradient.addColorStop(1, "#f00");

//Score variables
var score = {
    total : 0,
    l1 : 0,
    l2 : 0,
    l3 : 0,
    l4 : 0,
    l5 : 0,
    l6 : 0,
    l7 : 0,
    l8 : 0,
    l9 : 0
}

var level = {
    screen : 0,
//0 = main menu, -1 = how to play, -2 = level select
    on : 1, //level player is on
    num : 9, //Number of levels
    name : "Walls", //Name of level
    score : 0, //Score on current level
    par : 0
}

//Level 1 obstacles
var obstacles1 = [
    new obstacle(175, 0, 50, 400, "#50c850"),                     new obstacle(375, 200, 50, 400, "#50c850")
]

//Level 2 obstacles
var obstacles2 = [
    new obstacle(200, 0, 50, 250),
    new obstacle(75, 200, 125, 50),
    new obstacle(75, 250, 50, 250),
    new obstacle(125, 450, 375, 50),
    new obstacle(350, 200, 275, 50),
]

//Level 3 obstacles
var obstacles3 = [
    new obstacle(200, 0, 25, 125),
    new obstacle(0, 425, 200, 25),
    new obstacle(0, 200, 225, 50),
    new obstacle(300, 200, 300, 50),
    new obstacle(300, 250, 50, 200)
]

//Level 4 obstacles
var obstacles4 = [
    new obstacle(100, 200, 150, 50),
    new obstacle(250, 0, 50, 250),
    new bumper(100, 300, 15),
    new bumper(150, 350, 15),
    new bumper(200, 300, 15),
    new bumper(250, 350, 15),
    new water(100, 400, 200, 50),
    new water(400, 400, 200, 50),
    new obstacle(0, 400, 300, 50),
]

//Level 5 obstacles
var obstacles5 = [
    new obstacle(0, 200, 225, 50),
    new obstacle(200, 0, 25, 65),
    new obstacle(200, 135, 25, 65),
    new bumper(400, 150, 20),
    new obstacle(175, 250, 50, 250),
    new obstacle(175, 550, 50, 50),
    new sand(225, 225, 75, 75),
    new sand(300, 300, 75, 75),
    new sand(375, 375, 75, 75),
    new water(450, 300, 75, 75),
    new sand(525, 225, 75, 75),
    new water(225, 375, 75, 75),
    new sand(300, 450, 75, 75),
    new sand(525, 375, 75, 75),
    new sand(450, 450, 75, 75),
    new water(525, 525, 75, 75),
    new sand(225, 525, 75, 75),
    new water(375, 525, 75, 75)
]

//Level 6 obstacles
var obstacles6 = [
    new obstacle(200, 0, 50, 300),
    new hill(0, 160, 200, 140, "up"),
    new hill(0, 300, 250, 50, "right"),
    new hill(250, 160, 100, 190, "up"),
    new hill(400, 0, 200, 350, "down"),
    new bumper(400, 350, 50),
    new bumper(600, 300, 100),
    new obstacle(350, 160, 50, 190),
    new water(200, 350, 50, 125),
    new bumper(300, 575, 25),
    new obstacle(0, 350, 200, 50)
]

//Level 7 obstacles
var obstacles7 = [
    new obstacle(200, 0, 50, 250),
    new obstacle(50, 200, 150, 50),
    new hill(0, 200, 50, 350, "down"),
    new hill(0, 550, 550, 50, "right"),
    new hill(550, 50, 50, 550, "up"),
    new hill(300, 0, 300, 50, "left"),
    new hill(250, 0, 50, 250, "down"),
    new obstacle(50, 250, 50, 300),
    new obstacle(100, 500, 450, 50),
    new obstacle(500, 50, 50, 500),
    new obstacle(300, 50, 200, 50),
    new obstacle(300, 100, 50, 200),
    new hill(150, 250, 150, 50, "left"),
    new hill(100, 250, 50, 200, "down"),
    new hill(100, 450, 350, 50, "right"),
    new hill(450, 150, 50, 350, "up"),
    new hill(400, 100, 100, 50, "left"),
    new hill(350, 100, 50, 250, "down"),
    new obstacle(150, 300, 50, 150),
    new obstacle(200, 300, 150, 50),
    new obstacle(200, 400, 250, 50),
    new obstacle(400, 150, 50, 250),
    new hill(250, 350, 150, 50, "left")
]

//Level 8 obstacles
var obstacles8 = [
    new obstacle(0, 150, 600, 50),
    new portal(475, 75, 50, 250, "#ff0000"),
    new obstacle(0, 400, 300, 50),
    new water(200, 300, 100, 100),
    new sand(300, 300, 80, 150),
    new sand(520, 300, 80, 150),
    new hill(380, 300, 60, 150, "left"),
    new hill(460, 300, 60, 150, "right"),
    new obstacle(275, 450, 25, 100),
]

//Level 9 obstacles
var obstacles9 = [
    new hill(200, 225, 400, 100, "left"),
    new bumper(225, 225, 25),
    new obstacle(0, 200, 400, 25),
    new obstacle(200, 100, 25, 100),
    new hill(200, 0, 225, 100, "right"),
    new obstacle(225, 100, 375, 25),
    new portal(475, 50, 265, 162.5, "#9600ff"),
    new water(500, 125, 100, 50),
    new obstacle(225, 325, 375, 25),
    new sand(0, 325, 125, 100),
    new obstacle(200, 450, 25, 150),
    new bumper(225, 325, 40),
    new bumper(100, 510, 20),
    new obstacle(400, 350, 25, 250),
    new water(425, 350, 25, 250),
    new water(450, 350, 150, 25),
    new water(575, 375, 25, 225),
    new portal(350, 550, 512.5, 430, "#ff0000")
]

//Creates ball
var ball = {
    x : 200,
    y : 200,
    xSpeed : 1.5,
    ySpeed : 2,
    canMove : false,
    onHill : false,
    color : "#ffffff",
    draw : function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if(this.x > 590){
            this.x = 590;
            this.xSpeed = -this.xSpeed;
            bounce.play();

        }
        if(this.x < 10){
            this.x = 10;
            this.xSpeed = -this.xSpeed;
            bounce.play();
        }
        if(this.y > 590){
            this.y = 590;
            this.ySpeed = -this.ySpeed;
            bounce.play();
        }
        if(this.y < 10){
            this.y = 10;
            this.ySpeed = -this.ySpeed;
            bounce.play();
        }

        if(Math.sqrt(this.xSpeed*this.xSpeed + this.ySpeed*this.ySpeed > 50)){
            this.xSpeed *= 0.8;
            this.ySpeed *= 0.8;

        }

        //Only draws ball during level
        if(Math.sqrt(Math.pow(hole.x - ball.x, 2) + Math.pow(hole.y - ball.y, 2)) <= 20){

        } else {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, 10, 0, tau);
            ctx.fill();
        }
    }
}

//Creates hole
var hole = {
    x : -30,
    y : -30,
    draw : function(){
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(this.x, this.y, 20, 0, tau);
        ctx.fill();
    }
}

//Mouse x and y
var mouse = {
    x : 0,
    y : 0,
    startY : 0,
    startY : 0
}


//Updates game
function draw(){
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(0, 0, 600, 600);

    //Main Menu
    if(level.screen === 0){

        ball.canMove = false;

        ctx.fillStyle = "#000";
        ctx.font = "100px garamond";
        ctx.textAlign = "center";
        ctx.fillText("Mini Golf", 300, 150);
        ctx.textAlign = "left";

        //Start game button
        roundRect(115, 220, 160, 70, 15,
        function(){
            level.screen = level.on;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            level.score = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);
        ctx.font = "32px garamond";
        ctx.fillText("Start Game", 123, 262);

        //How to play button
        roundRect(320, 220, 170, 70, 15,
        function(){
            level.screen = -1;
        }, false);
        ctx.fillText("How to Play", 328, 262);

        //Level select button
        if(selectLocked === true){
            roundRect(115, 330, 375, 70, 15,
            function(){
            }, true);
        } else {
            roundRect(115, 330, 370, 70, 15,
            function(){
                level.screen = -2;
                clicked = false;
            }, false);
        }
        ctx.fillText("Level Select", 225, 373);

        //Controls settings
        ctx.textAlign = "center";
        ctx.fillText("Controls", 300, 450);
        ctx.textAlign = "left";

        ctx.font = "24px garamond";
        ctx.fillText("Drag                   Click", 195, 495);

        ctx.beginPath();
        ctx.arc(270, 490, 15, tau/4, 3*tau/4);
        ctx.lineTo(330, 475);
        ctx.arc(330, 490, 15, 3*tau/4, tau/4)
        ctx.fill();

        roundRect(255, 475, 90, 30, 15, function(){
            if(controls === "click"){
                controls = "drag";
            } else {
                controls = "click";
            }
            clicked = false;
        }, false);

        ctx.fillStyle = "#00ff00";
        var circleX;
        if(controls === "drag"){
            circleX = 270;
        }
        if(controls === "click"){
            circleX = 330;
        }

        ctx.beginPath();
        ctx.arc(circleX, 490, 12, 0, tau);
        ctx.fill();

        //Music Mute Button
        roundRect(275, 525, 50, 50, 15, function(){
            if(musicOn === true){
                musicOn = false;
                if(songStarted === true){
                    song.pause();
                }
                clicked = false;
            } else {
                musicOn = true;
                song.play();
                clicked = false;
            }

         }, false);
         ctx.drawImage(document.getElementById("image"), 265, 520, 70, 60);
         if(musicOn === false){
             ctx.lineWidth = 3;
             ctx.beginPath();
             ctx.moveTo(275, 530);
             ctx.lineTo(325, 570);
             ctx.stroke();
             ctx.lineWidth = 1;
         }

        //Ball colors

        //White
        roundRect(70, 450, 50, 50, 25, function(){
            ball.color = "#ffffff";
        }, false);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(95, 475, 24, 0, tau);
        ctx.fill();

        //Red
        roundRect(38, 500, 50, 50, 25, function(){
            ball.color = "#ff0000";
        }, false);
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(63, 525, 24, 0, tau);
        ctx.fill();

        //Violet
        roundRect(102, 500, 50, 50, 25, function(){
            ball.color = "#9600ff";
        }, false);
        ctx.fillStyle = "#9600ff";
        ctx.beginPath();
        ctx.arc(127, 525, 24, 0, tau);
        ctx.fill();

        //Yellow
        roundRect(480, 450, 50, 50, 25, function(){
            ball.color = "#ffff00";
        }, false);
        ctx.fillStyle = "#ffff00";
        ctx.beginPath();
        ctx.arc(505, 475, 24, 0, tau);
        ctx.fill();

        //Cyan
        roundRect(448, 500, 50, 50, 25, function(){
            ball.color = "#00ffff";
        }, false);
        ctx.fillStyle = "#00ffff";
        ctx.beginPath();
        ctx.arc(473, 525, 24, 0, tau);
        ctx.fill();

        //Mystery
        if(selectLocked === true){
            roundRect(512, 500, 50, 50, 25, function(){
            }, true);
        } else {
            roundRect(512, 500, 50, 50, 25, function(){
                ball.color = gradient;
            }, false);
            ctx.fillStyle = "#000";
            ctx.font = "50px garamond";
            ctx.textAlign = "center";
            ctx.fillText("?", 539, 540);
            ctx.textAlign = "left";
        }
    }

    //How to play screen
    if(level.screen === -1){

        ctx.fillStyle = "#000";
        ctx.font = "48px garamond";
        ctx.fillText("How to Play", 9, 50);
        ctx.font = "24px garamond";
        ctx.fillText("The goal of mini golf is to hit the ball into the hole with as", 9, 100);
        ctx.fillText("few strokes as possible. The line pointing outward from the", 9, 138);
        ctx.fillText("ball shows the direction and speed the ball is going to go.", 9, 176);
        ctx.fillText("Press the button in the top right to return to the main menu.", 9, 214);
        ctx.fillText("Obstacles        make the ball bounce in the opposite", 9, 252);
        ctx.fillText("direction.", 9, 290);
        ctx.fillText("Bumpers        make the ball bounce outward.", 9, 328);
        ctx.fillText("Water       makes the ball return to the beginning.", 9, 404);
        ctx.fillText("Sand        slows the ball down.", 9, 366);
        ctx.fillText("Hills        cause the ball to roll in the direction of the arrow.", 9, 442);
        ctx.fillText("Portals        teleport the ball from one point to another.", 9, 480)

        //Pictures of obstacles
        ctx.fillStyle = "#50c850";
        ctx.fillRect(110, 233, 25, 25);

        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(117, 321, 15, 0, tau);
        ctx.fill();

        ctx.fillStyle = "#0000ff";
        ctx.fillRect(70, 384, 25, 25);

        ctx.fillStyle = "#edd9af";
        ctx.fillRect(71, 346, 25, 25);

        ctx.fillStyle = "#00dd00";
        ctx.fillRect(62, 422, 25, 25)
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(69, 427);
        ctx.lineTo(81, 434.5);
        ctx.lineTo(69, 442)
        ctx.fill();

        ctx.fillStyle = "#9600ff";
        ctx.beginPath();
        ctx.arc(95, 472, 15, 0, tau);
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(95, 472);
        ctx.arc(95, 472, 15, 0, tau/4)
        ctx.arc(95, 472, 15, 3*tau/4, tau/2, true);              ctx.fill();

        //Main menu button
        roundRect(50, 500, 200, 70, 20,
        function(){
            level.screen = 0;
        }, false);
        ctx.fillStyle = "#000000";
        ctx.font = "32px garamond";
        ctx.fillText("Main Menu", 78, 543);
    }

    //Level select screen
    if(level.screen === -2){
        ctx.fillStyle = "#000000";
        ctx.font = "50px garamond";
        ctx.fillText("Level Select", 180, 90);

        roundRect(100, 150, 100, 100, 20,
        function(){
            level.screen = 1;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            level.score = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);

        roundRect(250, 150, 100, 100, 20,
        function(){
            level.screen = 2;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);

        roundRect(400, 150, 100, 100, 20,
        function(){
            level.screen = 3;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);

        roundRect(100, 300, 100, 100, 20,
        function(){
            level.screen = 4;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);

        roundRect(250, 300, 100, 100, 20,
        function(){
            level.screen = 5;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);

        roundRect(400, 300, 100, 100, 20,
        function(){
            level.screen = 6;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);

        roundRect(100, 450, 100, 100, 20,
        function(){
            level.screen = 7;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);

        roundRect(250, 450, 100, 100, 20,
        function(){
            level.screen = 8;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);

        roundRect(400, 450, 100, 100, 20,
        function(){
            level.screen = 9;
            ball.x = 100;
            ball.y = 100;
            ball.xSpeed = 0;
            ball.ySpeed = 0;
            setTimeout(function(){
                ball.canMove = true;
            }, 10);
        }, false);

        ctx.font = "100px garamond";
        ctx.fillText("1    2    3", 128, 230);
        ctx.fillText("4    5    6", 128, 380);
        ctx.fillText("7    8    9", 128, 530);
    }

    //Level 1
    if(level.screen === 1){

        level.on = 1;

        level.name = "Walls";
        level.par = 4;

        //Hole x and y
        hole.x = 512;
        hole.y = 512;

        for(let i = 0; i < obstacles1.length; i++){
            obstacles1[i].draw();
        }
    }

    //Level 2
    if(level.screen === 2){

        level.on = 2;

        level.name = "Maze";
        level.par = 4;

        //Hole x and y
        hole.x = 500;
        hole.y = 100;

        for(let i = 0; i < obstacles2.length; i++){
            obstacles2[i].draw();
        }
    }

    //Level 3
    if(level.screen === 3){

        level.on = 3;

        level.name = "Moving Walls";
        level.par = 3;

        //Hole x and y
        hole.x = 475;
        hole.y = 350;

        for(let i = 0; i < obstacles3.length; i++){
            obstacles3[i].draw();
        }

        if(obstacles3[0].y <= 0){
            obstacles3[0].ySpeed = 1;
        }
        if(obstacles3[0].y >= 75){
            obstacles3[0].ySpeed = -1;
        }
        if(obstacles3[1].x <= 0){
            obstacles3[1].xSpeed = 1;
        }
        if(obstacles3[1].x >= 100){
            obstacles3[1].xSpeed = -1;
        }
    }

    //Level 4
    if(level.screen === 4){

        level.on = 4;

        level.name = "Bridge";
        level.par = 5;

        hole.x = 80;
        hole.y = 525;

        for(let i = 0; i < obstacles4.length; i++){
            obstacles4[i].draw();
        }

        ctx.fillStyle = "#50d250";
        ctx.fillRect(0, 200, 100, 50);

        if(obstacles4[6].x <= 100){
            obstacles4[6].xSpeed = 0.75;
        }
        if(obstacles4[6].x >= 300){
            obstacles4[6].xSpeed = -0.75;
        }
        obstacles4[7].xSpeed = obstacles4[6].xSpeed;
        ctx.fillStyle = "#c19a6b";
        ctx.fillRect(obstacles4[6].x + 200, 400, 100, 50);

        //Bridge physics
        if(ball.y >= 400 && ball.y <= 450){
            ball.ySpeed += ball.ySpeed/120;
        }
    }

    //Level 5
    if(level.screen === 5){

        level.on = 5;

        level.name = "Checkerboard";
        level.par = 4;

        //Hole x and y
        hole.x = 87.5;
        hole.y = 335;

        for(let i = 0; i < obstacles5.length; i++){
            obstacles5[i].draw();
        }

        if(obstacles5[1].y <= 0){
            obstacles5[1].ySpeed = 0.5;
        }
        if(obstacles5[1].y >= 50){
            obstacles5[1].ySpeed = -0.5;
        }
        obstacles5[2].ySpeed = -obstacles5[1].ySpeed;
        //Growing bumper
        if(obstacles5[3].radius <= 20){
            obstacles5[3].radiusSpeed = 0.5;
        }
        if(obstacles5[3].radius >= 100){
            obstacles5[3].radiusSpeed = -0.5;
        }

        ctx.fillStyle = "#50d250";
        ctx.fillRect(175, 500, 50, 50);
    }

    //Level 6
    if(level.screen === 6){

        level.on = 6;

        //Hole x and y
        hole.x = 100;
        hole.y = 500;

        level.name = "Hills";
        level.par = 4;

        for(let i = 0; i < obstacles6.length; i++){
            obstacles6[i].draw();
        }

        if(obstacles6[8].y <= 350){
            obstacles6[8].ySpeed = 0.75;
        }
        if(obstacles6[8].y >= 475){
            obstacles6[8].ySpeed = -0.75;
        }
        if(obstacles6[9].y <= 375){
            obstacles6[9].ySpeed = 1;
        }
        if(obstacles6[9].y >= 575){
            obstacles6[9].ySpeed = -1;
        }
    }

    //Level 7
    if(level.screen === 7){

        level.name = "Hole in One";
        level.par = 1;

        level.on = 7;

        //Hole x and y
        hole.x = 225;
        hole.y = 375;

        for(let i = 0; i < obstacles7.length; i++){
            obstacles7[i].draw();
        }
    }

    //Level 8
    if(level.screen === 8){

        level.on = 8;

        level.name = "Teleportation";
        level.par = 4;

        //Hole x and y
        hole.x = 75;
        hole.y = 525;

        for(let i = 0; i < obstacles8.length; i++){
            obstacles8[i].draw();
        }

        if(obstacles8[1].y2 <= 250){
            obstacles8[1].y2Speed = 1;
        }
        if(obstacles8[1].y2 >= 350){
            obstacles8[1].y2Speed = -1;
        }
        if(obstacles8[8].y <= 450){
            obstacles8[8].ySpeed = 0.5;
        }
        if(obstacles8[8].y >= 500){
            obstacles8[8].ySpeed = -1.5;
        }
    }

    //Level 9
    if(level.screen === 9){

        level.on = 9;

        level.name = "The Finale";
        level.par = 5;

        //Hole x and y
        hole.x = 512.5;
        hole.y = 550;

        for(let i = 0; i < obstacles9.length; i++){
            obstacles9[i].draw();
        }
        if(obstacles9[12].radius <= 20){
            obstacles9[12].radiusSpeed = 0.3;
        }
        if(obstacles9[12].radius >= 60){
            obstacles9[12].radiusSpeed = -1;
        }

        if(obstacles9[10].y >= 450){
            obstacles9[10].ySpeed = -1;
        }
        if(obstacles9[10].y <= 350){
            obstacles9[10].ySpeed = 1;
        }
    }

    //All levels
    if(level.screen > 0 && level.screen <= level.num){

        level.screen = level.on;

        hole.draw();
        check();

        //Name of level and score
        if(mouse.x >= 520 && mouse.x <= 580 && mouse.y >= 20 && mouse.y <= 80){
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, 600, 99)
            ctx.fillStyle = "#000";
            ctx.font = "30px garamond";
            ctx.fillText("Hole " + level.screen + ": " + level.name + "   Score: " + level.score + "   Par: " + level.par, 20, 55);
        }

        //Main Menu Button
        roundRect(520, 20, 60, 60, 20, function(){
            level.screen = 0;
            ball.x = Math.random()*500 + 50;
            ball.y = Math.random()*500 + 50;
            ball.xSpeed = 1.5;
            ball.ySpeed = 2;
            ball.canMove = false;
        }, false);
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(532, 50);
        ctx.lineTo(567, 30);
        ctx.lineTo(555, 50);
        ctx.lineTo(567, 70);
        ctx.closePath();
        ctx.fill();


        //Line showing where the ball is going to go
        if(ball.xSpeed === 0 && ball.ySpeed === 0 && Math.sqrt(Math.pow(hole.x - ball.x, 2) + Math.pow(hole.y - ball.y, 2)) > 20){
            let lineX;
            let lineY;

            if(controls === "click"){
                lineX = 2*ball.x - mouse.x;
                lineY = 2*ball.y - mouse.y;
            } else if(pressed === true){
                lineX = ball.x + mouse.startX - mouse.x;
                lineY = ball.y + mouse.startY - mouse.y;
            }

            //Draws line
            ctx.strokeStyle = ball.color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(ball.x, ball.y);
            ctx.lineTo(lineX, lineY);
            ctx.stroke();
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;

        }

        //Makes ball move
        if(clicked === true && ball.xSpeed === 0 && ball.ySpeed === 0 && Math.sqrt(Math.pow(hole.x - ball.x, 2) + Math.pow(hole.y - ball.y, 2)) > 20 && ball.canMove === true){
            if(controls === "drag"){
                if(Math.abs(mouse.startX - mouse.x) > 2 || Math.abs(mouse.startY - mouse.y) > 2){
                    ball.xSpeed = (mouse.startX - mouse.x)/20;
                    ball.ySpeed = (mouse.startY - mouse.y)/20;
                    ballHit.play();
                }
            }
            if(controls === "click"){
                ball.xSpeed = (ball.x - mouse.x)/20;
                ball.ySpeed = (ball.y - mouse.y)/20;
                ballHit.play();
            }
            level.score ++;
        }

        //Makes ball slow down
        ball.xSpeed -= ball.xSpeed/120;
        ball.ySpeed -= ball.ySpeed/120;
        if(Math.abs(ball.xSpeed) <= 0.1 && ball.onHill === false){
            ball.xSpeed = 0;
        }
        if(Math.abs(ball.ySpeed) <= 0.1 && ball.onHill === false){
            ball.ySpeed = 0;
        }
        ball.onHill = false;
    }

    //Final screen
    if(level.screen > level.num){
        roundRect(50, 50, 500, 500, 20, function(){                     console.log("hey");
        }, false);

        if(ball.xSpeed === 0 && ball.ySpeed === 0){
            ball.xSpeed = 1.5;
            ball.ySpeed = 2;
        }

        //Adds up total score
        score.total = score.l1 + score.l2 + score.l3 + score.l4 + score.l5 + score.l6 + score.l7 + score.l8 + score.l9

        ctx.font = "30px garamond";
        ctx.fillStyle = "#000";
        ctx.fillText("Your Score:", 80, 100);
        ctx.fillText("Level 1: " + score.l1, 80, 150);
        ctx.fillText("Level 2: " + score.l2, 80, 200);
        ctx.fillText("Level 3: " + score.l3, 80, 250);
        ctx.fillText("Level 4: " + score.l4, 80, 300);
        ctx.fillText("Level 5: " + score.l5, 80, 350);
        ctx.fillText("Level 6: " + score.l6, 300, 150);
        ctx.fillText("Level 7: " + score.l7, 300, 200);
        ctx.fillText("Level 8: " + score.l8, 300, 250);
        ctx.fillText("Level 9: " + score.l9, 300, 300);
        if(selectLocked === true){
            ctx.fillText("You have now unlocked Level Select!", 80, 480);
        }
        ctx.font = "50px garamond";
        ctx.fillText("Total Score: " + score.total, 80, 420);
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(100, 525, 200, 50);

        roundRect(100, 512.5, 200, 75, 20,                            function(){
            level.screen = 0;
            level.on = 1;
            level.score = 0;
            selectLocked = false;
        }, false);
        ctx.fillStyle = "#000000";
        ctx.font = "40px garamond";
        ctx.fillText("Main Menu", 110, 560);

        ctx.font = "20px garamond";
        ctx.fillText("Game created by Owen Bechtel", 317, 578)
    }

    ball.draw();

    if(pressed === false){
        mouse.startX = mouse.x;
        mouse.startY = mouse.y;
    }
}

setInterval(draw, 10);
