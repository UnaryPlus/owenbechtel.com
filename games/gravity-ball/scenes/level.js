class Level extends Phaser.Scene {
    constructor() {
        super("level")
    }

    create(levelNumber) {
        this.levelNumber = levelNumber

        //create level text
        this.add.text(300, 100, "level " + this.levelNumber, fontStyle).setOrigin(0.5, 0.5)

        //create level select button
        const levelSelectButton = this.add.image(75, 150, "level-select-button").setInteractive()
        levelSelectButton.on("pointerdown", () => {
            levelSelectButton.setScale(1.1)
        })
        levelSelectButton.on("pointerover", (pointer) => {
            if(pointer.isDown) {
                levelSelectButton.setScale(1.1)
            }
        })
        levelSelectButton.on("pointerout", () => {
            levelSelectButton.setScale(1)
        })
        levelSelectButton.once("pointerup", () => {
            this.scene.start("level-select", Math.floor((this.levelNumber - 1) / 8) + 1)
        })

        //create costume select button
        const costumeSelectButton = this.add.image(525, 150, "costume-select-button").setInteractive()
        costumeSelectButton.on("pointerdown", () => {
            costumeSelectButton.setScale(1.1)
        })
        costumeSelectButton.on("pointerover", (pointer) => {
            if(pointer.isDown) {
                costumeSelectButton.setScale(1.1)
            }
        })
        costumeSelectButton.on("pointerout", () => {
            costumeSelectButton.setScale(1)
        })
        costumeSelectButton.once("pointerup", () => {
            this.scene.start("costume-select", { sceneNumber: 1, levelNumber: this.levelNumber })
        })

        //create mode select button
        const modeSelectButton = this.add.image(75, 250, "mode-select-button").setInteractive()
        modeSelectButton.on("pointerdown", () => {
            modeSelectButton.setScale(1.1)
        })
        modeSelectButton.on("pointerover", (pointer) => {
            if(pointer.isDown) {
                modeSelectButton.setScale(1.1)
            }
        })
        modeSelectButton.on("pointerout", () => {
            modeSelectButton.setScale(1)
        })
        modeSelectButton.once("pointerup", () => {
            this.scene.start("mode-select")
        })

        //create how to play button
        const howToPlayButton = this.add.image(525, 250, "how-to-play-button").setInteractive()
        howToPlayButton.on("pointerdown", () => {
            howToPlayButton.setScale(1.1)
        })
        howToPlayButton.on("pointerover", (pointer) => {
            if(pointer.isDown) {
                howToPlayButton.setScale(1.1)
            }
        })
        howToPlayButton.on("pointerout", () => {
            howToPlayButton.setScale(1)
        })
        howToPlayButton.once("pointerup", () => {
            this.scene.start("how-to-play", this.levelNumber)
        })

        //create player
        this.player = this.matter.add.image(300, 200, "costumes", data.costume)
        .setCircle(25)
        .setBounce(0.5)
        .setFriction(0)

        //set height of world
        this.worldHeight = levels[this.levelNumber].obstacles.length * 200 + 400
        this.matter.world.setBounds(0, 0, 600, this.worldHeight)
        this.cameras.main.setBounds(0, 0, 600, this.worldHeight)

        //create obstacles
        const obstacleFactory = new ObstacleFactory(this)
        for(let i = 0; i < levels[this.levelNumber].obstacles.length; i++) {
            const obstacleType = levels[this.levelNumber].obstacles[i]
            const y = i * 200 + 400
            obstacleFactory.createLevelObstacle(obstacleType, y)
        }
        
        this.started = false
        if(mobile) {
            //start game when screen is clicked
            this.input.once("pointerup", () => {
                this.started = true
                this.startTime = new Date()
            })
        }
        else {
            //start game when key is pressed
            this.input.keyboard.once("keydown", () => {
                this.started = true
                this.startTime = new Date()
            })
        }
        
        //set gravity to 0
        this.matter.world.setGravity(0, 0)
        
        if(!mobile) {
            //create object for detecting if arrow keys are pressed
            this.keys = this.input.keyboard.createCursorKeys()
        }
    }
    
    update() {
        if(!this.started) {
            return
        }
        
        if(mobile) {
            //control player by changing gravity if screen is pressed
            if(this.input.activePointer.isDown) {
                if(this.input.activePointer.x < 300) {
                    this.matter.world.setGravity(-1, 1)
                }
                else {
                    this.matter.world.setGravity(1, 1)
                }
            }
            else {
                this.matter.world.setGravity(0, 1)
            }
        }
        
        else {
            //control player by changing gravity if arrow keys are pressed
            this.matter.world.setGravity(this.keys.left.isDown ? -1 : this.keys.right.isDown ? 1 : 0, 1)
        }
        
        this.player.setAngularVelocity(this.player.body.velocity.x / 50)
        
        //move camera downward
        this.cameras.main.scrollY += levels[this.levelNumber].cameraSpeed
        
        //have camera follow player if it is close to the bottom of the viewport
        if(this.cameras.main.scrollY < this.player.y - gameHeight + 100) {
            this.cameras.main.scrollY = this.player.y - gameHeight + 100
        }
        
        //restart level if player is out of the viewport
        if(this.cameras.main.scrollY > this.player.y + 30) {
            this.restart()
        }
        
        //go to next level if player is at the bottom of the world
        if(this.player.y + 30 > this.worldHeight) {
            this.nextLevel();
        }
    }
    
    restart() {
        if(this.tweens.isTweening(this.cameras.main)) {
            return
        }

        //restart level after shaking camera and fading to black
        this.cameras.main.shake(1000, 0.02)
        this.tweens.add({
            targets: this.cameras.main,
            alpha: -1,
            onComplete: () => this.scene.restart(this.levelNumber)
        })
    }
    
    nextLevel() {
        if(this.tweens.isTweening(this.cameras.main)) {
            return
        }

        //caluclate number of stars
        const time = (new Date().getTime() - this.startTime.getTime()) / 1000
        const goals = levels[this.levelNumber].goals
        const stars = time > goals[0] ? 0 : time > goals[1] ? 1 : time > goals[2] ? 2 : 3
        
        //unlock new costume if you got 3 stars for the first time
        const newCostume = stars === 3 && levels[this.levelNumber].stars < 3 && data.unlockedCostumes.includes(false)
        if(newCostume) {
            //get list of costume numbers which haven't been unlocked
            let costumeNumbers = []
            for(let i = 0; i < data.unlockedCostumes.length; i++) {
                if(!data.unlockedCostumes[i]) {
                    costumeNumbers.push(i)
                }
            }
            
            //you can't get any good costumes until you unlock all the solid colors
            if(costumeNumbers.length > 40) {
                costumeNumbers = costumeNumbers.filter(x => x < 8)
            }
            
            //choose random costume to unlock
            const costumeNumber = costumeNumbers[Math.floor(Math.random() * costumeNumbers.length)]
            data.unlockedCostumes[costumeNumber] = true
            
            //save data to local storage
            window.localStorage.setItem("gravity-ball-data", JSON.stringify(data))
        }
        
        //set new number of stars
        if(stars > levels[this.levelNumber].stars) {
            levels[this.levelNumber].stars = stars
            window.localStorage.setItem("gravity-ball-stars-" + this.levelNumber, stars)
        }
        
        //go to level complete screen after fading to black
        this.tweens.add({
            targets: this.cameras.main,
            alpha: -1,
            onComplete: () => {
                this.scene.start("level-complete", { levelNumber: this.levelNumber, newCostume: newCostume })
            }
        })
    }
}