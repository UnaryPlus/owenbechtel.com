class ModeSelect extends Phaser.Scene {
    constructor() {
        super("mode-select")
    }
    
    create() {
        //create select mode text
        this.add.text(300, 100, "select mode", fontStyle).setOrigin(0.5, 0.5)

        //create endless mode button
        const button = this.add.image(300, 225, "wide-blank-button").setInteractive()
        const text = this.add.text(300, 225, "endless", fontStyle).setOrigin(0.5, 0.5).setScale(0.95, 1)
        button.on("pointerdown", () => {
            button.setScale(1.1)
            text.setFontSize(46.2)
        })
        button.on("pointerover", (pointer) => {
            if(pointer.isDown) {
                button.setScale(1.1)
                text.setFontSize(46.2)
            }
        })
        button.on("pointerout", () => {
            button.setScale(1)
            text.setFontSize(42)
        })
        button.once("pointerup", () => {
            if(currentSong !== "endless-mode") {
                currentSong = "endless-mode"
                this.sound.stopAll()
                this.sound.play("endless-mode", { loop: true, volume: 1 })
            }
            this.scene.start("endless-mode")
        })
        
        //create dark mode button if level 16 has been unlocked
        if(data.lastUnlockedLevel >= 16) {
            const button = this.add.image(300, 375, "wide-blank-button").setInteractive()
            const text = this.add.text(300, 375, "dark", fontStyle).setOrigin(0.5, 0.5)
            button.on("pointerdown", () => {
                button.setScale(1.1)
                text.setFontSize(46.2)
            })
            button.on("pointerover", (pointer) => {
                if(pointer.isDown) {
                    button.setScale(1.1)
                    text.setFontSize(46.2)
                }
            })
            button.on("pointerout", () => {
                button.setScale(1)
                text.setFontSize(42)
            })
            button.once("pointerup", () => {
                if(currentSong !== "dark-mode") {
                    currentSong = "dark-mode"
                    this.sound.stopAll()
                    this.sound.play("dark-mode", { loop: true, volume: 0.85 })
                }
                this.scene.start("dark-mode")
            })
        }
        else {
          this.add.image(300, 375, "wide-locked-button")
        }
        
        //create timed mode button if level 32 has been unlocked
        if(data.lastUnlockedLevel >= 32) {
            const button = this.add.image(300, 525, "wide-blank-button").setInteractive()
            const text = this.add.text(300, 525, "timed", fontStyle).setOrigin(0.5, 0.5)
            button.on("pointerdown", () => {
                button.setScale(1.1)
                text.setFontSize(46.2)
            })
            button.on("pointerover", (pointer) => {
                if(pointer.isDown) {
                    button.setScale(1.1)
                    text.setFontSize(46.2)
                }
            })
            button.on("pointerout", () => {
                button.setScale(1)
                text.setFontSize(42)
            })
            button.once("pointerup", () => {
                if(currentSong !== "timed-mode") {
                    currentSong = "timed-mode"
                    this.sound.stopAll()
                    this.sound.play("timed-mode", { loop: true, volume: 0.85 })
                }
                this.scene.start("timed-mode")
            })
        }
        else {
          this.add.image(300, 525, "wide-locked-button")
        }
        
        //create weird mode button if level 48 has been unlocked
        if(data.lastUnlockedLevel >= 48) {
            const button = this.add.image(300, 675, "wide-blank-button").setInteractive()
            const text = this.add.text(300, 675, "weird", fontStyle).setOrigin(0.5, 0.5)
            button.on("pointerdown", () => {
                button.setScale(1.1)
                text.setFontSize(46.2)
            })
            button.on("pointerover", (pointer) => {
                if(pointer.isDown) {
                    button.setScale(1.1)
                    text.setFontSize(46.2)
                }
            })
            button.on("pointerout", () => {
                button.setScale(1)
                text.setFontSize(42)
            })
            button.once("pointerup", () => {
                if(currentSong !== "weird-mode") {
                    currentSong = "weird-mode"
                    this.sound.stopAll()
                    this.sound.play("weird-mode", { loop: true, volume: 0.85 })
                }
                this.scene.start("weird-mode")
            })
        }
        else {
          this.add.image(300, 675, "wide-locked-button")
        }
    }
}