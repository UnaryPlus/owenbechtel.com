const emSpace = "\u2003"

// random integer between min and max (inclusive)
function randomInt(rng, min, max) {
    return Math.floor(rng() * (max - min + 1) + min)
}

// equation type 1: D ax[b] = abx[b - 1]
function eq1(rng) {
    const a = randomInt(rng, 2, 9)
    const b = randomInt(rng, Math.max(3, 7 - a), 9)
    return rng() < 1/2
        ? `D${a}x${b}=${a * b}x${b - 1}`
        : `${a * b}x${b - 1}=D${a}x${b}`
}

// equation type 2: D x[a] + b = ax[a - 1]
function eq2(rng) {
    const a = randomInt(rng, 3, 9)
    const b = randomInt(rng, 1, 9)
    const sum = rng() < 1/2 ? `x${a}+${b}` : `${b}+x${a}`
    return rng() < 1/2
        ? `D${sum}=${a}x${a - 1}`
        : `${a}x${a - 1}=D${sum}`
}

// equation type 3: D ax[2] = 2ax
function eq3(rng) {
    const a = randomInt(rng, 10, 49)
    return rng() < 1/2
        ? `D${a}x2=${2 * a}x`
        : `${2 * a}x=D${a}x2`
}

// equation type 4: D ax[2] + b = 2ax
function eq4(rng) {
    const a = randomInt(rng, 2, 4)
    const b = randomInt(rng, 1, 9)
    const sum = rng() < 1/2 ? `${a}x2+${b}` : `${b}+${a}x2`
    return rng() < 1/2
        ? `D${sum}=${2 * a}x`
        : `${2 * a}x=D${sum}`
}

// equation type 5: D ax = a
function eq5(rng) {
    const a = randomInt(rng, 100, 999)
    return rng() < 1/2
        ? `D${a}x=${a}`
        : `${a}=D${a}x`
}

// equation type 6: D ax + b = a
function eq6(rng) {
    const a = randomInt(rng, 10, 99)
    const b = randomInt(rng, 1, 9)
    const sum = rng() < 1/2 ? `${a}x+${b}` : `${b}+${a}x`
    return rng() < 1/2
        ? `D${sum}=${a}`
        : `${a}=D${sum}`

}

// answer to today's puzzle
// seed for RNG is year-month-day, e.g. 2022-1-7
function getEquation(seed) {
    const rng = new Math.seedrandom(seed)
    const r = rng() * 8
    return r < 2 ? eq1(rng)
        : r < 3 ? eq2(rng)
        : r < 5 ? eq3(rng)
        : r < 6 ? eq4(rng)
        : r < 7 ? eq5(rng)
        : eq6(rng)
}

function isEmpty(s) {
    return s === ""
}

// count occurences of character in string
function countCharacter(char, s) {
    const inc = (count, c) => c === char ? count + 1 : count
    return s.split("").reduce(inc, 0)
}

// check if string is invalid coefficient
// 0 and 1, as well as things like '02', are invalid
function invalidNumber(s) {
    if(s[0] === "0" || s === "1") return true
    return isNaN(+s)
}

// append derivative of term to 'deriv'
function derivative(deriv, term) {
    if(term === "1") return deriv
    const nums = term.split("x")
    if(nums.some(invalidNumber)) return ["error"]

    if(nums.length > 2) return ["error"] // term has multiple x's
    if(nums.length === 1) return deriv   // term is a constant

    const coef = isEmpty(nums[0]) ? 1 : +nums[0]
    const exp = isEmpty(nums[1]) ? 1 : +nums[1]

    const newCoef = coef * exp
    const newExp = exp - 1
    if(newExp === 0) {
        deriv.push(newCoef.toString())
    }
    else {
        const coefStr = newCoef === 1 ? "" : newCoef.toString()
        const expStr = newExp === 1 ? "" : newExp.toString()
        deriv.push(`${coefStr}x${expStr}`)
    }
    return deriv
}

// check if guess is well-formed and correct
function verifyGuess(guess) {
    if(countCharacter("=", guess) !== 1) return false
    if(countCharacter("D", guess) !== 1) return false

    const parts = guess.split("=")
    if(parts.some(isEmpty)) return false
    const [left, right] = parts

    if(left[0] === "D") {
        const terms = left.substring(1).split("+")
        if(terms.some(isEmpty)) return false
        const deriv = terms.reduce(derivative, [])
        if(deriv.length !== 1) return false
        return deriv[0] === right
    }

    if(right[0] === "D") {
        const terms = right.substring(1).split("+")
        if(terms.some(isEmpty)) return false
        const deriv = terms.reduce(derivative, [])
        if(deriv.length !== 1) return false
        return deriv[0] === left
    }

    return false
}

class Rectangle {
    // create rectangle DOM element (button or square)
    constructor(parent, text, shape, callback) {
        this.el = $("<div>")
        .addClass("rectangle initial")
        .addClass(shape)
        .text(text)

        if(callback !== undefined) this.el.click(() => callback(text))
        parent.append(this.el)

        this.color = "initial"
    }

    // set color of rectangle
    // some transitions, such as "correct" -> "somewhere", are not allowed
    setColor(color) {
        if(this.color === "correct" || this.color === "obvious") return
        if(this.color === "somewhere" && color === "nowhere") return

        this.el
        .removeClass("initial nowhere somewhere correct obvious")
        .addClass(color)
    
        this.color = color
    }

    getColor() {
        return this.color
    }

    setText(text) {
        this.el.text(text)
    }

    getText() {
        return this.el.text()
    }
}

// create 6 by 9 grid of squares
function createSquares() {
    var squares = []

    for(let i = 0; i < 6; i++) {
        squares[i] = []
        const rowDiv = $("<div>")

        for(let j = 0; j < 9; j++) {
            squares[i][j] = new Rectangle(rowDiv, emSpace, "square")
        }
        $("#game").append(rowDiv)
    }

    return squares
}

// create input buttons given a callback function
// callback takes the name of the button as an argument, e.g. "x" or "enter"
function createButtons(callback) {
    const buttons = {}
    const row1 = $("<div>")
    const row2 = $("<div>")

    for(let i = 0; i < 10; i++) {
        const num = i.toString()
        buttons[num] = new Rectangle(row1, num, "button narrow", callback)
    }

    ;["x", "D", "+", "=", "enter", "back", "clear", "?"].forEach(code => {
        const shape = code.length > 1 ? "button wide" : "button narrow"
        buttons[code] = new Rectangle(row2, code, shape, callback)
    })
    
    buttons["?"].setColor("obvious")
    $("#buttons").append(row1, row2)
    return buttons
}

// compare guess with answer and return list of colors
function compare(guessString, answer) {
    const guess = guessString.split("")

    const colors = Array(9).fill("invalid")
    const total = {}

    guess.forEach(g => {
        total[g] = countCharacter(g, answer)
    })

    guess.forEach((g, i) => {
        if(g === answer[i]) {
            colors[i] = "correct"
            total[g] -= 1
        }
    })

    guess.forEach((g, i) => {
        if(colors[i] === "correct") return
        if(total[g] > 0) {
            colors[i] = "somewhere"
            total[g] -= 1
        }
        else colors[i] = "nowhere"
    })

    return colors
}

// create temporary pop-up message
function inform(message) {
    $("#info")
    .text(message)
    .stop()
    .fadeIn(0)
    .fadeOut(3000)
}

// listen for key presses
function onKeyDown(callback) {
    $(document).keydown((e) => {
        if(e.code.substring(0, 5) === "Digit") {
            callback(e.code[5])
            return
        }

        switch(e.code) {
            case "KeyX": callback("x"); return
            case "KeyD": callback("D"); return
            case "Enter": callback("enter"); return
            case "Backspace": callback("back"); return
            case "KeyC": callback("clear"); return
            case "Slash": callback("?"); return
        }

        switch(e.key) {
            case "+": callback("+"); return
            case "=": callback("="); return
        }
    })
}

function main() {
    // RNG seed and local storage key based on today's date
    const today = new Date()
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    const storageKey = `polynerdle-${dateString}`

    const answer = getEquation(dateString)
    const squares = createSquares()

    let finished = false
    let row = 0
    let col = 0

    const enter = () => {
        const text = squares[row].map(s => s.getText())
        const guess = text.join("")

        if(text.some(t => t === emSpace)) {
            inform("not enough symbols")
            return
        }

        if(guess === answer) {
            inform("you won!")
            finished = true
            squares[row].forEach(square => square.setColor("correct"))
            return
        }

        if(!verifyGuess(guess)) {
            inform("invalid equation")
            return
        }

        const colors = compare(guess, answer)
        for(let i = 0; i < 9; i++) {
            squares[row][i].setColor(colors[i])
            const char = squares[row][i].getText()
            buttons[char].setColor(colors[i])
        }

        row += 1
        col = 0

        if(row >= 6) {
          inform(answer)
          finished = true
        }
    }

    const back = () => {
        if(col > 0) {
            col -= 1
            squares[row][col].setText(emSpace)
        }
    }

    const clear = () => {
        col = 0
        squares[row].forEach(square => square.setText(emSpace))
    }

    const instructions = () => {
        $(".instructions").show()
        .get(0).scrollIntoView()
    }

    // add character to current row
    const type = char => {
        if(col < 9) {
            squares[row][col].setText(char)
            col += 1
        }
    }

    // respond to button presses
    const click = code => {
        if(code === "?") instructions()
        else if(!finished) {
            if(code === "enter") enter()
            else if(code === "back") back()
            else if(code === "clear") clear()
            else type(code)
        }
    }

    onKeyDown(click)
    const buttons = createButtons(click)

    // retrieve values from local storage
    const maybeData = localStorage.getItem(storageKey)
    if(maybeData !== null) {
        const data = JSON.parse(maybeData)
        finished = data.finished
        row = data.row
        col = data.col

        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 9; j++) {
                squares[i][j].setColor(data.squares[i][j].color)
                squares[i][j].setText(data.squares[i][j].text)
            }
        }

        Object.keys(data.buttons).forEach(char => {
            buttons[char].setColor(data.buttons[char].color)
        })
    }

    // update local storage every 2 seconds
    const updateData = () => {
        const data = { finished, row, col, squares: [], buttons: {} }

        for(let i = 0; i < 6; i++) {
            data.squares[i] = []
            for(let j = 0; j < 9; j++) {
                data.squares[i][j] = {
                    color: squares[i][j].getColor(),
                    text: squares[i][j].getText()
                }
            }
        }

        Object.keys(buttons).forEach(char => {
            data.buttons[char] = {
                color: buttons[char].getColor()
            }
        })

        localStorage.setItem(storageKey, JSON.stringify(data))
    }

    setInterval(updateData, 2000)
}

// make sure that rectangles have the correct proportions when window is resized
function resizeScreen() {
    const px = x => x + "px"
    
    const square = $(".square").width()
    $(".square").height(square)
    .css({ "font-size": px(square / 2), "line-height": px(square) })
    
    const narrow = $(".narrow").width()
    $(".button").height(narrow * 5/4)
    .css({ "font-size": px(narrow / 2), "line-height": px(narrow * 5/4)})
}

$(window).resize(resizeScreen)

$(document).ready(() => {
    // hide info box and instructions
    $("#info").hide()
    $(".instructions").hide()
    
    // create example solution
    const example = $("#example")
    ;["D", "4", "x", "3", "=", "1", "2", "x", "2"].forEach(char => {
        const square = new Rectangle(example, char, "square")
        square.setColor("correct")
    })
    
    main()
    resizeScreen()
})


