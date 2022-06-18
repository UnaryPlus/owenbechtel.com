let heart
let scene = 0
let lives = 3
let score = 0
let highscore = 0

let square = {
    reset: function(){
        this.x = 200
        this.speed = 1
        this.lives = 3
    },
    draw: function(){
        this.x += this.speed
        if(this.x > 370 || this.x < 30) this.speed *= -1
        fill(255, 0, 0)
        rect(this.x, 200, 60, 60)
    }
}

let bg = {
    reset: function(){
        let r = 255, g = 255, b = 255
        while(r === 255 && g === 255 && b === 255){
            r = floor(random(0, 2)) ? 255 : 220
            g = floor(random(0, 2)) ? 255 : 220
            b = floor(random(0, 2)) ? 255 : 220
        }
        this.color = color(r, g, b)
    }
}

function mouseIn(x, y, width, height){
    const left = x - width / 2
    const right = x + width / 2
    const top = y - height / 2
    const bottom = y + height / 2
    return mouseX > left && mouseX < right && mouseY > top && mouseY < bottom
}

function preload(){
    heart = loadImage("heart.png")
}

function setup(){
    const canvas = createCanvas(400, 400)
    canvas.parent("game")
    canvas.elt.onselectstart = () => false
    
    rectMode(CENTER)
    bg.reset()
}

function draw(){
    background(bg.color)
    
    //main menu scene
    if(scene === 0){
        //title text
        fill(0)
        textSize(35)
        textAlign(CENTER, CENTER)
        text("Click When the Red\nSquare is Inside the Box", 200, 100)
        
        //start game button
        text("Start Game", 200, 250)
        noFill()
        rect(200, 250, 230, 70, 20)
    }
    
    //game scene
    else if(scene === 1){
        //red square
        square.draw()
        
        //box
        noFill()
        rect(200, 200, 120, 120)
        fill(0, 0, 0)
        
        //score text
        textAlign(LEFT, CENTER)
        textSize(30)
        text("Score: " + score, 10, 27)
        
        //hearts
        if(square.lives > 0) image(heart, 355, 10)    
        if(square.lives > 1) image(heart, 320, 10)    
        if(square.lives > 2) image(heart, 285, 10)
        
        //death
        if(square.lives <= 0){
            scene = 2
            bg.reset()
        }
    }
    
    //death scene
    else if(scene === 2){
        //highscore
        if(score > highscore) highscore = score   
        
        //death text
        textAlign(CENTER, CENTER)
        fill(0, 0, 0)
        textSize(50)
        text("You Died!", 200, 90)
        
        //score and highscore text
        textSize(30)
        text("Your Score: " + score, 200, 165)
        text("High Score: " + highscore, 200, 230)
        
        //main menu button
        textSize(35)
        text("Main Menu", 200, 320)
        noFill()
        rect(200, 320, 230, 70, 20)
    }
}

function mouseClicked(){
    //main menu scene
    if(scene === 0){
        if(mouseIn(200, 250, 230, 70)){
            scene = 1
            bg.reset()
            square.reset()
            score = 0
        }
    }
    
    //game scene
    if(scene === 1){
        if(square.x >= 140 && square.x <= 260){
            if(square.speed > 0) square.speed += 0.25
            else square.speed -= 0.25
            score += 1
        }
        else {
            square.lives -= 1
        }
    }
    
    //death scene
    if(scene === 2){
        if(mouseIn(200, 320, 230, 70)){
            scene = 0
            bg.reset()
        }
    }
}