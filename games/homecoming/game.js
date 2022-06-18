const highscore = {
    easy: 0,
    hard: 0
}

class Load extends Phaser.Scene {
    preload() {
        this.load.setPath("images/")
        .image("platform")
        .image("stickman")
        .image("football")
        .image("football-large")
        .image("spider-easy")
        .image("spider-hard")
        .image("spider-easy-large")
        .image("spider-hard-large")
    }
    
    create() {
        this.input.keyboard.addKey("F").on("down", () => {
            this.scale.startFullscreen()
        })
        
        this.add.image(800, 350, "football-large")

        const text = 
            "Kill the spiders by launching footballs at them.\n" +
            "The farther away you click, the farther you throw.\n" +
            "If a spider reaches you, you die.\n" +
            "Press 'F' to make the game full-screen."
        
        this.add.text(800, 750, text)
        .setOrigin(0.5, 0.5)
        .setAlign("center")
        .setFontSize(48)
        
        this.add.text(600, 950, "EASY")
        .setOrigin(0.5, 0.5)
        .setFontSize(64)
        .setInteractive()
        .once("pointerup", () => {
            this.scene.start("game", { easy: true })
        })
        
        this.add.text(1000, 950, "HARD")
        .setOrigin(0.5, 0.5)
        .setFontSize(64)
        .setInteractive()
        .once("pointerup", () => {
            this.scene.start("game", { easy: false })
        })
    }
}

class Game extends Phaser.Scene {
    constructor() {
        super("game")
    }
    
    create(data) {
        this.input.keyboard.addKey("F").on("down", () => {
            this.scale.startFullscreen()
        })
        
        this.easy = data.easy
        this.spiderSpeed = 200
        let score = 0
        
        const stickman = this.physics.add.staticImage(800, 1105, "stickman")
        const platforms = this.physics.add.group()
        const footballs = this.physics.add.group()
        this.spiders = this.physics.add.group()
        
        platforms.create(200, 1185, "platform").setState(1)
        platforms.create(600, 1185, "platform").setState(1)
        platforms.create(1000, 1185, "platform").setState(-1)
        platforms.create(1400, 1185, "platform").setState(-1)
        
        const platform1 = platforms.create(400, 500, "platform").setState(-1)
        const platform2 = platforms.create(1200, 700, "platform").setState(1)
        const platform3 = platforms.create(400, 900, "platform").setState(1)
        
        platforms.children.iterate((platform) => {
            platform.setImmovable(true)
        })
        
        this.tweens.add({
            targets: platform1,
            x: 1200,
            duration: 10000,
            yoyo: true,
            repeat: -1
        })
        
        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => {
                platform1.setState(-platform1.state)
                platform2.setState(-platform2.state)
                platform3.setState(-platform3.state)
            }
        })
        
        let canThrow = true
        this.input.on("pointerdown", (pointer) => {
            if(canThrow) {
                footballs.create(stickman.x, stickman.y - 100, "football")
                .setVelocity((pointer.x - stickman.x) * 1.2, (pointer.y - stickman.y) * 1.2)
                .setGravity(0, 800)
                
                canThrow = false
                this.time.addEvent({
                    delay: 1000/3,
                    callback: () => canThrow = true
                })
            }
        })
        
        this.time.addEvent({
            delay: this.easy ? 1500 : 750,
            loop: true,
            callback: () => {
                this.spiders.create(Math.random() * 1480 + 60, 40, this.easy ? "spider-easy" : "spider-hard")
                .setGravity(0, 100)
            }
        })
        
        this.physics.add.collider(footballs, this.spiders, (football, spider) => {
            football.destroy()
            spider.destroy()
            score += 1
        })
        
        this.physics.add.collider(footballs, platforms, (football, platform) => {
            football.destroy()
        })
        
        this.physics.add.collider(this.spiders, platforms, (spider, platform) => {
            spider.setVelocityX(platform.state * this.spiderSpeed)
        })
        
        this.physics.add.collider(this.spiders, stickman, () => {
            if(this.easy) {
                highscore.easy = Math.max(highscore.easy, score)
            }
            else {
                highscore.hard = Math.max(highscore.hard, score)
            }
            this.scene.start("fail", { score: score, easy: this.easy })
        })
    }
    
    update() {
        this.spiderSpeed += 0.05
        
        this.spiders.children.iterate((spider) => {
            if(!spider.body.touching.down && spider.body.velocity.y > 10) {
                spider.setVelocityX(0)
                if(spider.body.velocity.y < this.spiderSpeed / 2) {
                    spider.setVelocityY(this.spiderSpeed / 2)
                }
            }
        })
    }
}

class Fail extends Phaser.Scene {
    constructor() {
        super("fail")
    }
    
    create(data) {
        this.input.keyboard.addKey("F").on("down", () => {
            this.scale.startFullscreen()
        })
        
        this.add.image(800, 350, data.easy ? "spider-easy-large" : "spider-hard-large")
        
        const high = data.easy ? highscore.easy : highscore.hard
        const word = data.score == 1 ? "spider" : "spiders"
        const text = data.score == high
            ? `New highscore!\nYou killed ${data.score} ${word}.`
            : `You killed ${data.score} ${word}.\nYour best score is ${high}.`
        
        this.add.text(800, 750, text)
        .setOrigin(0.5, 0.5)
        .setAlign("center")
        .setFontSize(64)
        
        const easyButton = this.add.text(600, 950, "EASY")
        .setOrigin(0.5, 0.5)
        .setFontSize(64)
        .setInteractive()
        
        const hardButton = this.add.text(1000, 950, "HARD")
        .setOrigin(0.5, 0.5)
        .setFontSize(64)
        .setInteractive()
        
        this.time.addEvent({
            delay: 500,
            callback: () => {
                easyButton.once("pointerup", () => {
                    this.scene.start("game", { easy: true })
                })
                
                hardButton.once("pointerup", () => {
                    this.scene.start("game", { hard: true })
                })
            }
        })
    }
}

new Phaser.Game({ 
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 1200
    },
    physics: { default: "arcade" },
    scene: [ Load, Game, Fail ]
})