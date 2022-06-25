let hue, saturation, brightness, hueStd, circleNumber, circleSize, positionStd

function setup(){
    let canvas = createCanvas(400, 400)
    canvas.parent("game")
    canvas.elt.onselectstart = () => false

    hue = createSlider(0, 255, 255)
    hue.parent("slider1")

    saturation = createSlider(0, 255, 255)
    saturation.parent("slider2")

    brightness = createSlider(0, 255, 255)
    brightness.parent("slider3")

    hueStd = createSlider(0, 20, 10)
    hueStd.parent("slider4")

    circleNumber = createSlider(15, 150, 75)
    circleNumber.parent("slider5")

    circleSize = createSlider(4, 40, 20)
    circleSize.parent("slider6")

    positionStd = createSlider(7, 70, 35)
    positionStd.parent("slider7")

    colorMode(HSB)
    background(255)
}

function keyPressed(){
    background(255)
}

function mouseClicked(){
    if(mouseY > 400 || mouseY < 0) return
    for(let i = 0; i < circleNumber.value(); i++){
        fill(randomGaussian(hue.value(), hueStd.value()), saturation.value(), brightness.value())
        noStroke()

        let x = randomGaussian(mouseX, positionStd.value())
        let y = randomGaussian(mouseY, positionStd.value())
        ellipse(x, y, circleSize.value(), circleSize.value())
    }
}

function draw(){
    noFill()
    stroke(0)
    rect(0, 0, 400, 400)
}
