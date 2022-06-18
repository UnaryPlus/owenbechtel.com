class Point {
    constructor(x, y, vx, vy){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    
    move(){
        this.x += this.vx
        this.y += this.vy
        this.vx += random(-0.015, 0.015)
        this.vy += random(-0.015, 0.015)
    }
}

const points = []

function setup(){
    const canvas = createCanvas(400, 400)
    canvas.parent("game")
    canvas.elt.onselectstart = () => false
    
    noFill()
    angleMode(DEGREES)
}

function draw(){
    background(255)
    rect(0, 0, 400, 400)
    const start = points.length < 2880 ? 0 : points.length - 2880
    for(let k = start/180; k < points.length/180; k++){
        beginShape()
        for(let i = k*180; i < k*180 + 180; i++){
            points[i].move()
            vertex(points[i].x, points[i].y)
        }
        endShape()
    }
}

function mouseClicked(){
    for(let i = 0; i < 360; i += 2){
        points.push(new Point(mouseX, mouseY, cos(i), sin(i)))
    }
}