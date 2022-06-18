let update = true

const value = {
  multiplier: 2,
  modulus: 9,
  lineWeight: 10,
  showLabels: false,
  showColors: false,
}

function setup() {
  //create canvas in "game" div
  const canvas = createCanvas(600, 420)
  canvas.parent("game")
  canvas.elt.onselectstart = () => false
  colorMode(HSB)
  
  //canvas coordinates
  const x = canvas.elt.offsetLeft + 440
  const y = canvas.elt.offsetTop
  
  //create inputs
  numInput("multiplier").position(x, y + 40)
  numInput("modulus").position(x, y + 100)
  slider("lineWeight", 0.5, 10, 0.1).position(x, y + 160)
  checkbox("showLabels").position(x, y + 190)
  checkbox("showColors").position(x, y + 220)
}

//create numerical input that updates value[key]
function numInput(key) {
  const input = createInput(value[key] + "")
  input.changed(() => {
    const x = +input.value()
    if(isFinite(x)) {
      value[key] = x
      update = true
    }
  })
  return input
}

//create slider that updates value[key]
function slider(key, lower, upper, step) {
  const input = createSlider(lower, upper, value[key], step)
  input.changed(() => {
    value[key] = input.value()
    update = true
  })
  return input
}

//create checkbox that updates value[key]
function checkbox(key) {
  const input = createCheckbox("", value[key])
  input.changed(() => {
    value[key] = !value[key]
    update = true
  })
  return input
}

function draw() {
  //only redraw stuff if input has changed
  if(!update) return
  
  update = false
  background(255)
  
  //label inputs
  textSize(14)
  textAlign(LEFT, BASELINE)
  styleFill(0)
  text("multiplier", 440, 30)
  text("modulus", 440, 90)
  text("line weight: " + value.lineWeight, 440, 155)
  text("show labels", 465, 205)
  text("show colors", 465, 235)
  
  //transform coordinates
  translate(210, 210)
  scale(180, 180)
  
  //big circle
  styleStroke(0, 0.01)
  circle(0, 0, 2)
  
  //times table lines
  drawLine(0)
  if(value.modulus % 2 === 0) {
    drawLine(value.modulus / 2)
  }
  for(let n = 1; n < value.modulus / 2; n++) {
    drawLine(n)
    drawLine(value.modulus - n)
  }
}

//draw the times table line for 'n'
function drawLine(n) {
  //start and end locations
  const product = n * value.multiplier % value.modulus
  const a1 = n * TAU / value.modulus
  const x1 = cos(a1), y1 = sin(a1)
  const a2 = product * TAU / value.modulus
  const x2 = cos(a2), y2 = sin(a2)
    
  //if "show colors" is checked, calculate hue based on length
  styleStroke(0, value.lineWeight / 1000)
  if(value.showColors) {
    const length = dist(x1, y1, x2, y2)
    const hue = map(length, TAU / value.modulus, 2, 255, 0)
    styleStroke(color(hue, 255, 255, 0.5), value.lineWeight / 1000)
  }
  line(cos(a1), sin(a1), cos(a2), sin(a2))
  
  //if "show labels" is checked, draw the label for 'n'
  if(value.showLabels) {
    textSize(0.1)
    textAlign(CENTER, CENTER)
    styleFill(0)
    text(n, cos(a1) * 1.1, sin(a1) * 1.1)
  }
}

//set stroke color and weight
function styleStroke(color, weight) {
  stroke(color)
  strokeWeight(weight)
  noFill()
}

//set fill color
function styleFill(color) {
  fill(color)
  noStroke()
}