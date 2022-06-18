class HowToPlay extends Phaser.Scene {
    constructor() {
        super("how-to-play")
    }

    create(levelNumber) {
        //create how to play text
        this.add.text(300, 100, "how to play", fontStyle).setOrigin(0.5, 0.5)
        
        //create body text
        if(mobile) {
            this.add.text(300, 190, "move the ball left and right", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
            this.add.text(300, 220, "by pressing on the screen", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        }
        else {
            this.add.text(300, 190, "control the ball using the left", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
            this.add.text(300, 220, "and right arrow keys", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        }
        this.add.text(300, 280, "if the ball goes off the top of", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        this.add.text(300, 310, "the screen, you lose", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        this.add.text(300, 370, "the faster you complete a level\u2009,", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        this.add.text(300, 400, "the more stars you earn", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        this.add.text(300, 460, "if you get 3 stars, you unlock a", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        this.add.text(300, 490, "new costume", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        this.add.text(300, 550, "you can change costumes and", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        this.add.text(300, 580, "access alternate game modes", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        this.add.text(300, 610, "using the menu buttons", fontStyle).setOrigin(0.5, 0.5).setFontSize(20)
        
        //create mute and unmute button
        const muteButton = this.add.image(250, 700, "wide-blank-button").setInteractive()
        const muteText = this.add.text(250, 700, this.sound.mute ? "unmute" : "mute", fontStyle).setOrigin(0.5, 0.5)
        muteButton.on("pointerdown", () => {
            muteButton.setScale(1.1)
            muteText.setFontSize(46.2)
        })
        muteButton.on("pointerover", (pointer) => {
            if(pointer.isDown) {
                muteButton.setScale(1.1)
                muteText.setFontSize(46.2)
            }
        })
        muteButton.on("pointerout", () => {
            muteButton.setScale(1)
            muteText.setFontSize(42)
        })
        muteButton.on("pointerup", () => {
            muteButton.setScale(1)
            muteText.setFontSize(42)
            if(this.sound.mute) {
                this.sound.setMute(false)
                muteText.setText("mute")
            }
            else {
                this.sound.setMute(true)
                muteText.setText("unmute")
            }
        })
        
        //create return button
        const returnButton = this.add.image(450, 700, "restart-level-button").setInteractive()
        returnButton.on("pointerdown", () => {
            returnButton.setScale(1.1)
        })
        returnButton.on("pointerover", (pointer) => {
            if(pointer.isDown) {
                returnButton.setScale(1.1)
            }
        })
        returnButton.on("pointerout", () => {
            returnButton.setScale(1)
        })
        returnButton.once("pointerup", () => {
            if(typeof levelNumber === "number") {
                this.scene.start("level", levelNumber)
            }
            else {
                this.scene.start(levelNumber)
            }
        })
    }
}