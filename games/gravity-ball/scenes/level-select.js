class LevelSelect extends Phaser.Scene {
    constructor() {
        super("level-select")
    }

    create(sceneNumber) {
        this.sceneNumber = sceneNumber

        //create select level text
        this.add.text(300, 100, "select level", fontStyle).setOrigin(0.5, 0.5)

        //create level buttons
        this.createLevelButton(200, 225, this.sceneNumber * 8 - 7);
        this.createLevelButton(400, 225, this.sceneNumber * 8 - 6);
        this.createLevelButton(200, 375, this.sceneNumber * 8 - 5);
        this.createLevelButton(400, 375, this.sceneNumber * 8 - 4);
        this.createLevelButton(200, 525, this.sceneNumber * 8 - 3);
        this.createLevelButton(400, 525, this.sceneNumber * 8 - 2);
        this.createLevelButton(200, 675, this.sceneNumber * 8 - 1);
        this.createLevelButton(400, 675, this.sceneNumber * 8 - 0);
        
        //create left arrow button
        if(this.sceneNumber > 1) {
            const leftButton = this.add.image(75, 375, "arrow-button").setInteractive()
            leftButton.on("pointerdown", () => {
                leftButton.setScale(1.1)
            })
            leftButton.on("pointerover", (pointer) => {
                if(pointer.isDown) {
                    leftButton.setScale(1.1)
                }
            })
            leftButton.on("pointerout", () => {
                leftButton.setScale(1)
            })
            leftButton.once("pointerup", () => {
                this.scene.restart(this.sceneNumber - 1)
            })
        }
        
        //create right arrow button
        if(this.sceneNumber < 6) {
            const rightButton = this.add.image(525, 375, "arrow-button").setAngle(180).setInteractive()
            rightButton.on("pointerdown", () => {
                rightButton.setScale(1.1)
            })
            rightButton.on("pointerover", (pointer) => {
                if(pointer.isDown) {
                    rightButton.setScale(1.1)
                }
            })
            rightButton.on("pointerout", () => {
                rightButton.setScale(1)
            })
            rightButton.once("pointerup", () => {
                this.scene.restart(this.sceneNumber + 1)
            })
        }
    }
    
    createLevelButton(x, y, levelNumber) {
        //create level button, stars, and text
        if(levelNumber <= data.lastUnlockedLevel) {
            const button = this.add.image(x, y, "blank-button").setInteractive()
            const stars = this.add.image(x, y, "small-stars", levels[levelNumber].stars)
            const text = this.add.text(x, y, levelNumber, fontStyle).setOrigin(0.5, 0.5)
            button.on("pointerdown", () => {
                button.setScale(1.1)
                stars.setScale(1.1)
                text.setFontSize(46.2)
            })
            button.on("pointerover", (pointer) => {
                if(pointer.isDown) {
                    button.setScale(1.1)
                    stars.setScale(1.1)
                    text.setFontSize(46.2)
                }
            })
            button.on("pointerout", () => {
                button.setScale(1)
                stars.setScale(1)
                text.setFontSize(42)
            })
            button.once("pointerup", () => {
                if(currentSong !== "gravity-ball") {
                    currentSong = "gravity-ball"
                    this.sound.stopAll()
                    this.sound.play("gravity-ball", { loop: true, volume: 0.85 })
                }
                this.scene.start("level", levelNumber)
            })
        }

        //create locked button
        else {
            this.add.image(x, y, "locked-button")
        }
    }
}