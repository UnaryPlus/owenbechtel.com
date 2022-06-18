//turn number into shortned form
function show(n) {
    const million = Math.pow(1000, 2)
    const billion = Math.pow(1000, 3)
    const trillion = Math.pow(1000, 4)
    const quadrillion = Math.pow(1000, 5)
    const quintillion = Math.pow(1000, 6)
    const sextillion = Math.pow(1000, 7)
    
    if(n < million) return n
    if(n < billion) return floor(n / million) + "M"
    if(n < trillion) return floor(n / billion) + "B"
    if(n < quadrillion) return floor(n / trillion) + "T"
    if(n < quintillion) return floor(n / quadrillion) + "Qa"
    if(n < sextillion) return floor(n / quintillion) + "Qi"
    return "\u2713";
}

//check if mouse is within rectangle
function mouseIn(x, y, width, height) {
    return mouseX >= x && mouseY >= y && mouseX <= x + width && mouseY <= y + height
}

//represents an item, ie beavers or towns
class Item {
    constructor(singular, plural, y, speed, color, value) {
        this.singular = singular
        this.plural = plural
        this.y = y
        this.speed = speed
        this.originalSpeed = speed
        this.color = color
        this.value = value
        this.clicked = false
        this.automated = false
        this.rectWidth = 0
        return this
    }
    
    //set the variable to increase and the amount to increase it by each time the box gets full
    setResult(item, amount) {
        this.result = {item, amount}
        return this
    }
    
    //set the cost of buying one of this item
    setCost(item, amount) {
        this.cost = {item, amount}
        return this
    }
    
    //set the cost of automating this item
    setAutomateCost(item, amount) {
        this.automateCost = {item, amount}
        return this
    }
    
    //set the cost of upgrading this item (each item can be upgraded twice)
    setUpgradeCost(item, amount1, amount2) {
        this.upgradeCost = {item, amount1, amount2}
        return this
    }
    
    //update the item (items update even when not displayed on screen)
    update() {
        //increases the rectangle width if item is automated or has been clicked
        if(this.value > 0) {
            if(this.clicked || this.automated) {
                this.rectWidth += this.speed
            }
        }
        
        //reset the rectangle when it fills the box and increase amount of result item
        if(this.rectWidth > 225) {
            this.rectWidth = 0
            this.clicked = false
            this.result.item.value += this.result.amount * this.value
        }
    }
    
    //draw the item on the screen and respond to clicks
    draw() {
        //white box
        fill(255)
        rect(70, this.y - 20, 225, 40)
        
        //colored rectangle
        fill(this.color)
        rect(70, this.y - 20, this.rectWidth, 40)
        
        //gray button
        fill(220)
        ellipse(50, this.y, 60, 60)
        fill(0)
        textSize(15)
        text(show(this.value), 50, this.y)
        if(mouseIsPressed && dist(mouseX, mouseY, 50, this.y) <= 30) {
            this.clicked = true
        }
        
        //buy button
        fill(255)
        if(this.cost.item.value >= this.cost.amount) {
            fill(this.color)
            if(mouseIsPressed && mouseIn(95, this.y + 20, 100, 25)) {
                this.value += 1
                this.cost.item.value -= this.cost.amount
            }
        }
        rect(95, this.y + 20, 100, 25)
        fill(0)
        textSize(13)
        text("Buy " + this.singular, 145, this.y + 32)
        
        //upgrade button
        if(this.speed <= this.originalSpeed * 2) {
            fill(255)
            if(this.speed === this.originalSpeed && this.upgradeCost.item.value >= this.upgradeCost.amount1) {
                fill(this.color)
                if(mouseIsPressed && mouseIn(195, this.y + 20, 100, 25)) {
                    this.speed *= 2
                    this.upgradeCost.item.value -= this.upgradeCost.amount1
                }
            }
            else if(this.upgradeCost.item.value >= this.upgradeCost.amount2) {
                fill(this.color)
                if(mouseIsPressed && mouseIn(195, this.y + 20, 100, 25)) {
                    this.speed *= 2
                    this.upgradeCost.item.value -= this.upgradeCost.amount2
                }
            }
            rect(195, this.y + 20, 100, 25)
            fill(0)
            textSize(13)
            text("Upgrade speed", 245, this.y + 32)
        }
        
        //automate button
        if(!this.automated) {
            fill(255)
            if(this.automateCost.item.value >= this.automateCost.amount) {
                fill(this.color)
                if(mouseIsPressed && mouseIn(295, this.y - 20, 75, 65)) {
                    this.automated = true
                    this.automateCost.item.value -= this.automateCost.amount
                }
            }
            rect(295, this.y - 20, 75, 65)
            fill(0)
            textSize(13)
            text("Automate", 333, this.y + 12)
        }
        
        //show text on hover
        fill(0)
        textSize(13)
        if(dist(mouseX, mouseY, 50, this.y) <= 30) {
            text("Generates " + this.result.amount + " " + this.result.item.plural + " per " + this.singular, 188, this.y)
        }
        if(mouseIn(95, this.y + 20, 100, 25)) {
            text("Costs " + this.cost.amount + " " + this.cost.item.plural, 188, this.y)
        }
        if(mouseIn(195, this.y + 20, 100, 25)) {
            if(this.speed === this.originalSpeed) {
                text("Costs " + show(this.upgradeCost.amount1) + " " + this.upgradeCost.item.plural, 188, this.y)   
            }
            if(this.speed === this.originalSpeed * 2) {
                text("Costs " + show(this.upgradeCost.amount2) + " " + this.upgradeCost.item.plural, 188, this.y)
            }
        }
        if(mouseIn(295, this.y - 20, 75, 65)) {
            if(!this.automated) {
                text("Costs " + show(this.automateCost.amount) + " " + this.automateCost.item.plural, 188, this.y)
            }
        }
    }
}

//create a level one item of a given industry
function item1(singular, plural, color, industry) {
    return new Item(singular, plural, 125, 1, color, 1)
    .setResult(industry, 5)
    .setCost(industry, 10)
    .setAutomateCost(industry, 1000)
    .setUpgradeCost(industry, 1500, 5000000)
}

//create a level two item of a given industry and level one item
function item2(singular, plural, color, industry, item1) {
    return new Item(singular, plural, 200, 0.5, color, 0)
    .setResult(item1, 5)
    .setCost(item1, 10)
    .setAutomateCost(industry, 50000)
    .setUpgradeCost(item1, 5000, 5000000)
}

//create a level three item of a given industry and level two item
function item3(singular, plural, color, industry, item2) {
    return new Item(singular, plural, 275, 0.25, color, 0)
    .setResult(item2, 10)
    .setCost(item2, 50)
    .setAutomateCost(industry, 1000000)
    .setUpgradeCost(item2, 7500, 5000000)
}

//create a level four item of a given industry and level two item
function item4(singular, plural, color, industry, item3) {
    return new Item(singular, plural, 350, 0.125, color, 0)
    .setResult(item3, 15)
    .setCost(item3, 100)
    .setAutomateCost(industry, 5000000000)
    .setUpgradeCost(item3, 10000, 5000000)
}

//items
let fur, beavers, hunters, tradePosts, forests
let land, settlers, towns, cities, colonies
let corn, seeds, farmers, farms, plantations
let ore, miners, mines, drills, factories

//current scene
let scene = 0

function setup() {
    const canvas = createCanvas(400, 400)
    canvas.parent("game")
    canvas.elt.onselectstart = () => false
    textAlign(CENTER, CENTER)
    
    //fur items
    fur = {value: 0, plural: "fur"}
    beavers = item1("beaver", "beavers", color(0, 255, 0), fur)
    hunters = item2("hunter", "hunters", color(0, 255, 0), fur, beavers)
    tradePosts = item3("trade post", "trade posts", color(0, 255, 0), fur, hunters)
    forests = item4("forest", "forests", color(0, 255, 0), fur, tradePosts)
    
    //land items
    land = {value: 0, plural: "land"}
    settlers = item1("settler", "settlers", color(255, 0, 0), land)
    towns = item2("town", "towns", color(255, 0, 0), land, settlers)
    cities = item3("city", "cities", color(255, 0, 0), land, towns)
    colonies = item4("colony", "colonies", color(255, 0, 0), land, cities)
    
    //corn items
    corn = {value: 0, plural: "corn"}
    seeds = item1("seeds", "seeds", color(255, 255, 0), corn)
    farmers = item2("farmer", "farmers", color(255, 255, 0), corn, seeds)
    farms = item3("farm", "farms", color(255, 255, 0), corn, farmers)
    plantations = item4("plantation", "plantations", color(255, 255, 0), corn, farms)
    
    //ore items
    ore = {value: 0, plural: "land"}
    miners = item1("miner", "miners", color(0, 255, 255), ore)
    mines = item2("mine", "mines", color(0, 255, 255), ore, miners)
    drills = item3("drill", "drills", color(0, 255, 255), ore, mines)
    factories = item4("factory", "factories", color(0, 255, 255), ore, drills)
}

function draw() {
    //main menu scene
    if(scene === 0) {
        background(0)
        
        // main menu text
        fill(255)
        textSize(50)
        text("Adventure\nColonialist", 200, 120)
        textSize(30)
        text("Click to start", 200, 275)
        
        // scene transition
        if(mouseIsPressed) {
            scene = 1
        }
    }
    else {
        background(255)
        
        // update items
        beavers.update()
        hunters.update()
        tradePosts.update()
        forests.update()
        
        settlers.update()
        towns.update()
        cities.update()
        colonies.update()
        
        seeds.update()
        farmers.update()
        farms.update()
        plantations.update()
        
        miners.update()
        mines.update()
        drills.update()
        factories.update()
        
        // top buttons
        fill(0, 255, 0)
        rect(10, 35, 80, 54, 10)
        if(mouseIsPressed && mouseIn(10, 35, 80, 54)) {
            scene = 1
        }
        
        fill(255, 0, 0)
        rect(110, 35, 80, 54, 10)
        if(mouseIsPressed && mouseIn(110, 35, 80, 54, 10)) {
            scene = 2  
        }
        
        fill(255, 255, 0)
        rect(210, 35, 80, 54, 10)
        if(mouseIsPressed && mouseIn(210, 35, 80, 54, 10)) {
            scene = 3
        }
        
        fill(0, 255, 255)
        rect(310, 35, 80, 54, 10)
        if(mouseIsPressed && mouseIn(310, 35, 80, 54, 10)) {
            scene = 4
        }
        
        // top button text
        fill(0)
        textSize(30)
        text("Fur", 50, 62)
        text("Land", 150, 62)
        text("Corn", 250, 62)
        text("Ore", 350, 62)
        
        // industry value text
        textSize(15)
        text("Fur: " + show(fur.value), 50, 18)
        text("Land: " + show(land.value), 140, 18)
        text("Corn: " + show(corn.value), 250, 18)
        text("Ore: " + show(ore.value), 350, 18)
        
        textSize(30)
        
        //draw items
        if(scene === 1) {
            beavers.draw()
            hunters.draw()
            tradePosts.draw()
            forests.draw()
        }
        if(scene === 2) {
            if(fur.value < 1000000) {
                text("You need 1M fur to\nunlock this industry.", 200, 240)
            }
            else {
                settlers.draw()
                towns.draw()
                cities.draw()
                colonies.draw()
            }
        }
        if(scene === 3) {
            if(land.value < 100000000) {
                text("You need 100M land to\nunlock this industry.", 200, 240)
            }
            else {
                seeds.draw()
                farmers.draw()
                farms.draw()
                plantations.draw()
            }
        }
        if(scene === 4) {
            if(corn.value < 10000000000) {
                text("You need 10B corn to\nunlock this industry.", 200, 240)
            }
            else {
                miners.draw()
                mines.draw()
                drills.draw()
                factories.draw()
            }
        }
    }
};