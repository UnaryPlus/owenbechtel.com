class LevelComplete extends Phaser.Scene {
    constructor() {
        super("level-complete")
    }
    
    create({ levelNumber, newCostume }) {
        //unlock next level if it hasn't been unlocked yet
        if(levels[levelNumber + 1] && levelNumber + 1 > data.lastUnlockedLevel) {
            data.lastUnlockedLevel = levelNumber + 1
            
            //save data to local storage
            window.localStorage.setItem("gravity-ball-data", JSON.stringify(data))
            
            //create "new mode unlocked!" text
            if(data.lastUnlockedLevel === 16 || data.lastUnlockedLevel === 32 || data.lastUnlockedLevel === 48) {
                this.add.text(300, 215, "new mode unlocked!", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
                newCostume = false
            }
        }
        
        //create "new costume unlocked!" text
        if(newCostume) {
            this.add.text(300, 215, "new costume unlocked!", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        }
        
        //create level complete text
        this.add.text(300, 100, "level " + levelNumber, fontStyle).setOrigin(0.5, 0.5)
        this.add.text(300, 160, "complete!", fontStyle).setOrigin(0.5, 0.5)

        //create stars animation
        const stars = this.add.image(300, 400, "large-stars", 0)
        for(let i = 1; i <= levels[levelNumber].stars; i++) {
            this.time.addEvent({
                delay: 250 * i,
                callback: () => stars.setFrame(i)
            })
        }
        
        //create restart level button
        const restartButton = this.add.image(200, 700, "restart-level-button").setInteractive()
        restartButton.on("pointerdown", () => {
            restartButton.setScale(1.1)
        })
        restartButton.on("pointerover", (pointer) => {
            if(pointer.isDown) {
                restartButton.setScale(1.1)
            }
        })
        restartButton.on("pointerout", () => {
            restartButton.setScale(1)
        })
        restartButton.once("pointerup", () => {
            this.scene.start("level", levelNumber)
        })
        
        //create next level button
        const continueButton = this.add.image(400, 700, "next-level-button").setInteractive()
        continueButton.on("pointerdown", () => {
            continueButton.setScale(1.1)
        })
        continueButton.on("pointerover", (pointer) => {
            if(pointer.isDown) {
                continueButton.setScale(1.1)
            }
        })
        continueButton.on("pointerout", () => {
            continueButton.setScale(1)
        })
        continueButton.once("pointerup", () => {
            if(levels[levelNumber + 1]) {
                this.scene.start("level", levelNumber + 1)
            }
            else {
                this.scene.start("level-select", 1)
            }
        })
    }
}