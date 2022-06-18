class Load extends Phaser.Scene {
    preload() {
        //create progress bar
        this.add.graphics().clear().fillStyle(0x2a2a2a).fillRect(100, gameHeight / 2 - 40, 400, 80)
        const progressBar = this.add.graphics()
        const loadingText = this.add.text(300, gameHeight / 2, "0%", fontStyle).setOrigin(0.5, 0.5)
        
        this.load.on("progress", (value) => {
            progressBar.clear().fillStyle(0x555555).fillRect(100, gameHeight / 2 - 40, 400 * value, 80)
            loadingText.setText(Math.floor(value * 10000) / 100 + "%")
        })
        
        //load images
        this.load.setPath("images/")
        .image("blank-button", "blank-button.png")
        .image("wide-blank-button", "wide-blank-button.png")
        .image("level-select-button", "level-select-button.png")
        .image("costume-select-button", "costume-select-button.png")
        .image("mode-select-button", "mode-select-button.png")
        .image("how-to-play-button", "how-to-play-button.png")
        .image("locked-button", "locked-button.png")
        .image("wide-locked-button", "wide-locked-button.png")
        .image("arrow-button", "arrow-button.png")
        .image("restart-level-button", "restart-level-button.png")
        .image("next-level-button", "next-level-button.png")
        .image("window", "window.png")
        .spritesheet("costumes", "costumes.png", { frameWidth: 50, frameHeight: 50 })
        .spritesheet("small-stars", "small-stars.png", { frameWidth: 75, frameHeight: 100 })
        .spritesheet("large-stars", "large-stars.png", { frameWidth: 450, frameHeight: 300 })
        
        //load audio
        this.load.setPath("audio/")
        .audio("gravity-ball", "gravity-ball.mp3")
        .audio("endless-mode", "endless-mode.mp3")
        .audio("dark-mode", "dark-mode.mp3")
        .audio("timed-mode", "timed-mode.mp3")
        .audio("weird-mode", "weird-mode.mp3")
    }
    
    create() {
        //load data from local storage if it exists
        const storedData = window.localStorage.getItem("gravity-ball-data")
        if(storedData !== null) {
            data = JSON.parse(storedData)
        }
        for(let levelNumber = 1; levelNumber <= 48; levelNumber++) {
            const stars = window.localStorage.getItem("gravity-ball-stars-" + levelNumber)
            if(stars !== null) {
                levels[levelNumber].stars = parseInt(stars, 10)
            }
        }

        //start last unlocked level and play theme song
        this.sound.play("gravity-ball", { loop: true, volume: 0.85 })
        this.scene.start("level", data.lastUnlockedLevel)
        
        if(mobile) this.input.addPointer()
    }
}

function startGame() {
    new Phaser.Game({
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            width: 600,
            height: gameHeight
        },
        physics: { default: "matter" },
        scene: [ Load, Level, LevelComplete, LevelSelect, CostumeSelect, ModeSelect, HowToPlay, EndlessMode, DarkMode, TimedMode, WeirdMode ]
    })
}

//load syncopate font and start game
WebFont.load({
    google: { families: [ "Syncopate" ] },
    active: startGame
})

