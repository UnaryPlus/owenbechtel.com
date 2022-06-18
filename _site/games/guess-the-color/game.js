let redSlider
let greenSlider
let blueSlider
let button
let scene
let scores
let colorToGuess

function setup() {
  let canvas = createCanvas(400, 400)
  canvas.parent("game")
  canvas.elt.onselectstart = () => false
  
  redSlider = createSlider(0, 255)
  redSlider.position(canvas.position().x + 10, canvas.position().y + 10)
  
  greenSlider = createSlider(0, 255)
  greenSlider.position(canvas.position().x + 10, canvas.position().y + 30)
  
  blueSlider = createSlider(0, 255)
  blueSlider.position(canvas.position().x + 10, canvas.position().y + 50)
  
  button = createButton("guess")
  button.position(canvas.position().x + 240, canvas.position().y + 10)
  button.size(150, 35)
  button.style("font-size: 20px")
  button.mouseClicked(changeScene)
  
  scene = "guess"
  scores = []
  colorToGuess = color(
    floor(random(0, 256)),
    floor(random(0, 256)),
    floor(random(0, 256)),
  )
}

function draw() {
  background(255)
  
  let highestScore = 0
  if(scores.length > 0) {
    highestScore = scores.reduce((x, y) => max(x, y))
  }
  
  let averageScore = 0
  if(scores.length > 0) {
    let sum = scores.reduce((x, y) => x + y)
    averageScore = round(sum / scores.length)
  }
  
  fill(0)
  textAlign(LEFT, TOP)
  textSize(12)
  text("highest: " + highestScore + "%", 240, 50)
  text("average: " + averageScore + "%", 320, 50)
  
  if(scene == "guess") {
    text("red: " + redSlider.value(), 160, 10)
    text("green: " + greenSlider.value(), 160, 30)
    text("blue: " + blueSlider.value(), 160, 50)
    
    fill(colorToGuess)
    noStroke()
    rect(0, 75, 400, 325)
  } 
  
  else if(scene == "score") {
    textAlign(CENTER, CENTER)
    textSize(20)
    text("your score: " + scores[scores.length - 1] + "%", 120, 37.5)
    
    fill(redSlider.value(), greenSlider.value(), blueSlider.value())
    noStroke()
    rect(0, 75, 200, 325)
    
    fill(colorToGuess)
    noStroke()
    rect(200, 75, 200, 325)
  }
}

function changeScene() {
  if(scene == "guess") {
    let distance = dist(
      redSlider.value(),
      greenSlider.value(),
      blueSlider.value(),
      red(colorToGuess),
      green(colorToGuess),
      blue(colorToGuess),
    )
    
    let worstRed = (red(colorToGuess) > 127) ? 0 : 255
    let worstGreen = (green(colorToGuess) > 127) ? 0 : 255
    let worstBlue = (blue(colorToGuess) > 127) ? 0 : 255
    
    let worstDistance = dist(
      worstRed,
      worstGreen,
      worstBlue,
      red(colorToGuess),
      green(colorToGuess),
      blue(colorToGuess),
    )
    
    scores.push(round((1 - distance / worstDistance) * 100))
    scene = "score"
    button.html("continue")
    
    redSlider.hide()
    greenSlider.hide()
    blueSlider.hide()
  }
  
  else if(scene == "score") {
    colorToGuess = color(
      floor(random(0, 256)),
      floor(random(0, 256)),
      floor(random(0, 256)),
    )
    
    scene = "guess"
    button.html("guess")
    
    redSlider.show()
    greenSlider.show()
    blueSlider.show()
  }
}