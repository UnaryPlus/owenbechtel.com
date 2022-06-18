class CostumeSelect extends Phaser.Scene {
    constructor() {
        super("costume-select")
    }

    create({sceneNumber, levelNumber}) {
        this.sceneNumber = sceneNumber
        this.levelNumber = levelNumber

        //create select costume text
        this.add.text(300, 100, "select costume", fontStyle).setOrigin(0.5, 0.5)

        //create costume buttons
        this.createCostumeButton(200, 225, this.sceneNumber * 8 - 8);
        this.createCostumeButton(400, 225, this.sceneNumber * 8 - 7);
        this.createCostumeButton(200, 375, this.sceneNumber * 8 - 6);
        this.createCostumeButton(400, 375, this.sceneNumber * 8 - 5);
        this.createCostumeButton(200, 525, this.sceneNumber * 8 - 4);
        this.createCostumeButton(400, 525, this.sceneNumber * 8 - 3);
        this.createCostumeButton(200, 675, this.sceneNumber * 8 - 2);
        this.createCostumeButton(400, 675, this.sceneNumber * 8 - 1);
        
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
                this.scene.restart({ sceneNumber: this.sceneNumber - 1, levelNumber: this.levelNumber })
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
                this.scene.restart({ sceneNumber: this.sceneNumber + 1, levelNumber: this.levelNumber })
            })
        }
    }
    
    createCostumeButton(x, y, costumeNumber) {
        //create costume button and image
        if(data.unlockedCostumes[costumeNumber]) {
            const button = this.add.image(x, y, "blank-button").setInteractive()
            const image = this.add.image(x, y, "costumes", costumeNumber)
            button.on("pointerdown", () => {
                button.setScale(1.1)
                image.setScale(1.1)
            })
            button.on("pointerover", (pointer) => {
                if(pointer.isDown) {
                    button.setScale(1.1)
                    image.setScale(1.1)
                }
            })
            button.on("pointerout", () => {
                button.setScale(1)
                image.setScale(1)
            })
            button.once("pointerup", () => {
                data.costume = costumeNumber

                //save data to local storage
                window.localStorage.setItem("gravity-ball-data", JSON.stringify(data))

                if(typeof this.levelNumber == "number") {
                    this.scene.start("level", this.levelNumber)
                }
                else {
                    this.scene.start(this.levelNumber)
                }
            })
        }
        
        //create locked button
        else {
            this.add.image(x, y, "locked-button")
        }
    }
}