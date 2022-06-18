class Intro extends Phaser.Scene {
    constructor(){
        super(Scene.Intro)
    }
    
    preload(){
        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics().fillStyle(0x222222, 0.8).fillRect(245, 280, 310, 40)
        const loadingText = this.add.text(400, 300, "0%").setOrigin(0.5, 0.5)
        
        this.load.on("progress", (value) => {
            progressBar.clear().fillStyle(0xffffff).fillRect(250, 285, 300 * value, 30)
            loadingText.setText(Math.floor(value * 10000) / 100 + "%")
        })
        
        this.load.on("complete", () => {
            progressBar.destroy()
            progressBox.destroy()
            loadingText.destroy()
        })
        
        //Music
        this.load.audio("music", "music.mp3")
        
        //Backgrounds
        this.load.setPath("images/backgrounds/")
        this.load.image(Img.Background.Intro, "intro.png")
        this.load.image(Img.Background.Menu, "menu.png")
        this.load.image(Img.Background.Controls, "controls.png")
        this.load.image(Img.Background.GameComplete, "game-complete.png")
        
        //Buttons
        this.load.setPath("images/buttons/")
        this.load.image(Img.Button.Menu, "menu.png")
        this.load.image(Img.Button.Controls, "controls.png")
        this.load.image(Img.Button.Begin, "begin.png")
        this.load.image(Img.Button.Restart, "restart.png")
        this.load.image(Img.Button.NextLevel, "next-level.png")
        
        //Platforms
        this.load.setPath("images/platforms/")
        this.load.image(Img.Platform.Inner(1), "inner-1.png")
        this.load.image(Img.Platform.Edge(1), "edge-1.png")
        this.load.image(Img.Platform.Edge(2), "edge-2.png")
        this.load.image(Img.Platform.Edge(3), "edge-3.png")
        this.load.image(Img.Platform.Edge(4), "edge-4.png")
        this.load.image(Img.Platform.DoubleEdge(1), "double-edge-1.png")
        this.load.image(Img.Platform.DoubleEdge(2), "double-edge-2.png")
        this.load.image(Img.Platform.DoubleEdge(3), "double-edge-3.png")
        this.load.image(Img.Platform.DoubleEdge(4), "double-edge-4.png")
        this.load.image(Img.Platform.Corner(1), "corner-1.png")
        this.load.image(Img.Platform.Corner(2), "corner-2.png")
        this.load.image(Img.Platform.End(1), "end-1.png")
        this.load.image(Img.Platform.End(2), "end-2.png")
        this.load.image(Img.Platform.Block(1), "block-1.png")
        this.load.image(Img.Platform.Block(2), "block-2.png")
        
        //Spritesheets
        this.load.setPath("images/spritesheets/")
        this.load.spritesheet(Img.Spritesheet.Archer, "archer.png", { frameWidth: 48, frameHeight: 60 })
        this.load.spritesheet(Img.Spritesheet.Triclops, "triclops.png", { frameWidth: 24, frameHeight: 24 })
        this.load.spritesheet(Img.Spritesheet.SmartTriclops, "smart-triclops.png", { frameWidth: 24, frameHeight: 24 })
        this.load.spritesheet(Img.Spritesheet.Bat, "bat.png", { frameWidth: 48, frameHeight: 24 })
        this.load.spritesheet(Img.Spritesheet.Frog, "frog.png", { frameWidth: 24, frameHeight: 24 })
        this.load.spritesheet(Img.Spritesheet.Ghost, "ghost.png", { frameWidth: 24, frameHeight: 36 })
        this.load.spritesheet(Img.Spritesheet.GhostShip, "ghost-ship.png", { frameWidth: 42, frameHeight: 36 })
        this.load.spritesheet(Img.Spritesheet.Bomb, "bomb.png", { frameWidth: 156, frameHeight: 108 })
        this.load.spritesheet(Img.Spritesheet.Explosion, "explosion.png", { frameWidth: 24, frameHeight: 24 })
        
        //Other Images
        this.load.setPath("images/")
        this.load.image(Img.Arrow, "arrow.png")
        this.load.image(Img.Heart, "heart.png")
    }
    
    create(){
        //Archer Animations
        this.anims.create({
            key: Anim.Standing(Direction.Right),
            frames: [{ key: Img.Spritesheet.Archer, frame: 0 }]
        })
        this.anims.create({
            key: Anim.Shooting.Down(Direction.Right),
            frames: [{ key: Img.Spritesheet.Archer, frame: 1 }]
        })
        this.anims.create({
            key: Anim.Shooting.Side(Direction.Right),
            frames: [{ key: Img.Spritesheet.Archer, frame: 2 }]
        })
        this.anims.create({
            key: Anim.Shooting.Up(Direction.Right),
            frames: [{ key: Img.Spritesheet.Archer, frame: 2 }]
        })
        this.anims.create({
            key: Anim.Running(Direction.Right),
            frames: this.anims.generateFrameNumbers(Img.Spritesheet.Archer, { start: 4, end: 11 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: Anim.Standing(Direction.Left),
            frames: [{ key: Img.Spritesheet.Archer, frame: 12 }]
        })
        this.anims.create({
            key: Anim.Shooting.Down(Direction.Left),
            frames: [{ key: Img.Spritesheet.Archer, frame: 13 }]
        })
        this.anims.create({
            key: Anim.Shooting.Side(Direction.Left),
            frames: [{ key: Img.Spritesheet.Archer, frame: 14 }]
        })
        this.anims.create({
            key: Anim.Shooting.Up(Direction.Left),
            frames: [{ key: Img.Spritesheet.Archer, frame: 15 }]
        })
        this.anims.create({
            key: Anim.Running(Direction.Left),
            frames: this.anims.generateFrameNumbers(Img.Spritesheet.Archer, { start: 16, end: 23 }),
            frameRate: 10,
            repeat: -1
        })
        
        //Triclops animations
        this.anims.create({
            key: Anim.Triclops(Direction.Right),
            frames: this.anims.generateFrameNumbers(Img.Spritesheet.Triclops, { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: Anim.Triclops(Direction.Left),
            frames: this.anims.generateFrameNumbers(Img.Spritesheet.Triclops, { start: 15, end: 0}),
            frameRate: 10,
            repeat: -1
        })
        
        //Smart triclops animations
        this.anims.create({
            key: Anim.SmartTriclops(Direction.Right),
            frames: this.anims.generateFrameNumbers(Img.Spritesheet.SmartTriclops, { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: Anim.SmartTriclops(Direction.Left),
            frames: this.anims.generateFrameNumbers(Img.Spritesheet.SmartTriclops, { start: 15, end: 0}),
            frameRate: 10,
            repeat: -1
        })
        
        //Bat animation
        this.anims.create({
            key: Anim.Bat,
            frames: this.anims.generateFrameNumbers(Img.Spritesheet.Bat),
            frameRate: 10,
            repeat: -1
        })
        
        //Frog animations
        this.anims.create({
            key: Anim.Frog(Direction.Left),
            frames: [{ key: Img.Spritesheet.Frog, frame: 0 }]
        })
        this.anims.create({
            key: Anim.Frog(Direction.Right),
            frames: [{ key: Img.Spritesheet.Frog, frame: 1 }]
        })
        
        //Ghost animations
        this.anims.create({
            key: Anim.Ghost(Direction.Left),
            frames: [{ key: Img.Spritesheet.Ghost, frame: 0 }]
        })
        this.anims.create({
            key: Anim.Ghost(Direction.Right),
            frames: [{ key: Img.Spritesheet.Ghost, frame: 1 }]
        })
        
        //Ghost ship animations
        this.anims.create({
            key: Anim.GhostShip(Direction.Left),
            frames: [{ key: Img.Spritesheet.GhostShip, frame: 0 }]
        })
        this.anims.create({
            key: Anim.GhostShip(Direction.Right),
            frames: [{ key: Img.Spritesheet.GhostShip, frame: 1 }]
        })
        
        //Bomb animation
        this.anims.create({
            key: Anim.Bomb,
            frames: this.anims.generateFrameNumbers(Img.Spritesheet.Bomb),
            frameRate: 40
        })
        
        //Explosion animation
        this.anims.create({
            key: Anim.Explosion,
            frames: this.anims.generateFrameNumbers(Img.Spritesheet.Explosion),
            frameRate: 40
        })
        
        //Intro background image
        this.add.image(400, 300, Img.Background.Intro)
        .setInteractive()
        .once("pointerup", () => {
            this.sound.add("music", { loop: true }).play()
            this.scene.start(Scene.Menu)
        })
    }
}

class Menu extends Phaser.Scene {
    constructor(){
        super(Scene.Menu)
    }
    
    create(){
        this.add.image(400, 300, Img.Background.Menu)
        
        this.add.image(260, 270, Img.Button.Controls)
        .setInteractive()
        .once("pointerup", () => this.scene.start(Scene.Controls))
        
        this.add.image(570, 270, Img.Button.Begin)
        .setInteractive()
        .once("pointerup", () => this.scene.start(Scene.Level(1)))
    }
}

class Controls extends Phaser.Scene {
    constructor(){
        super(Scene.Controls)
    }
    
    create(){
        this.add.image(400, 300, Img.Background.Controls)
        
        this.add.text(400, 235, "Use the arrow keys to move and jump. Press W, S, and X to shoot arrows in\nvarious directions. Once you run out of arrows, you have to collect them\nagain. You can also kill enemies by jumping. There are seven levels.")
        .setOrigin(0.5, 0.5)
        .setAlign("center")
        .setLineSpacing(20)
        
        this.add.image(400, 330, Img.Button.Menu)
        .setInteractive()
        .once("pointerup", () => this.scene.start(Scene.Menu))
    }
}

class GameComplete extends Phaser.Scene {
    constructor(){
        super(Scene.GameComplete)
    }
    
    create(){
        this.add.image(400, 300, Img.Background.GameComplete)
        
        this.add.text(400, 235, "Hearts lost: " + score.heartsLost + "\nDeaths: " + score.deaths)
        .setOrigin(0.5, 0.5)
        .setAlign("center")
        .setLineSpacing(20)
        
        this.add.image(400, 330, Img.Button.Menu)
        .setInteractive()
        .once("pointerup", () => this.scene.start(Scene.Menu))
    }
}

class Level extends Phaser.Scene {
    create(archerX, nextLevel, platformMap, enemySpawns){
        this.archerX = archerX
        this.nextLevel = nextLevel
        
        this.platforms = new Platforms(this, platformMap)
        this.archer = new Archer(this)
        this.enemies = new Enemies(this, enemySpawns)
    }
    
    update(){
        this.archer.update()
        this.enemies.update()
    }
}

class Level1 extends Level {
    constructor(){
        super(Scene.Level(1))
    }
    
    create(){
        const platformMap = [
            "XXXXXXXX----XXXXXXXX",
            "XX----------------XX",
            "X------------------X",
            "--------------------",
            "--------------------",
            "XX------XXXX------XX",
            "X------------------X",
            "X------------------X",
            "XXXX------------XXXX",
            "--------------------",
            "--------------------",
            "X-------XXXX-------X",
            "XX----------------XX",
            "XXX--------------XXX",
            "XXXXXXXX----XXXXXXXX"
        ]
        
        const { Right, Left } = Direction
        const enemySpawns = [
            { delay: 2000, x: 50,  y: 150, enemyType: Triclops, direction: Right },
            { delay: 2000, x: 400, y: 150, enemyType: Triclops, direction: Left  },
            { delay: 4000, x: 750, y: 150, enemyType: Triclops, direction: Left  },
            { delay: 4000, x: 400, y: 150, enemyType: Triclops, direction: Right },
            
            { delay: 12000, x: 400, y: 300, enemyType: SmartTriclops, direction: Right },
            { delay: 14000, x: 50,  y: 150, enemyType: SmartTriclops, direction: Left  },
            { delay: 14000, x: 750, y: 150, enemyType: SmartTriclops, direction: Right },
            { delay: 14000, x: 150, y: 200, enemyType: SmartTriclops, direction: Left  },
            { delay: 14000, x: 650, y: 200, enemyType: SmartTriclops, direction: Right },
            
            { delay: 24000, x: 600, y: 400, enemyType: Triclops, direction: Left  },
            { delay: 26000, x: 200, y: 400, enemyType: Triclops, direction: Right }
        ]
        
        super.create(340, Scene.Level(2), platformMap, enemySpawns)
    }
}

class Level2 extends Level {
    constructor(){
        super(Scene.Level(2))
    }
    
    create(){
        const platformMap = [
            "XXXXX--XXXXXX--XXXXX",
            "XX------XXXX------XX",
            "X------------------X",
            "--------------------",
            "--------------------",
            "XXXX----XXXX----XXXX",
            "X------------------X",
            "X------------------X",
            "X----XX------XX----X",
            "--------------------",
            "--------------------",
            "XXX--------------XXX",
            "--------------------",
            "--------XXXX--------",
            "XXXXX--XXXXXX--XXXXX"
        ]
        
        const { Right, Left } = Direction
        const enemySpawns = [
            { delay: 2000, x: 400, y: 450, enemyType: Triclops, direction: Left  },
            { delay: 3000, x: 400, y: 450, enemyType: Triclops, direction: Right },
            
            { delay: 7000, x: 400, y: 150, enemyType: Bat, direction: Left  },
            { delay: 8000, x: 400, y: 150, enemyType: Bat, direction: Right },
            
            { delay: 12000, x: 400, y: 450, enemyType: SmartTriclops, direction: Left  },
            { delay: 12000, x: 400, y: 150, enemyType: SmartTriclops, direction: Right },
            { delay: 14000, x: 150, y: 150, enemyType: SmartTriclops, direction: Left  },
            
            { delay: 20000, x: 400, y: 300, enemyType: Bat, direction: Right },
            
            { delay: 27000, x: 200, y: 200, enemyType: Triclops, direction: Right },
            { delay: 27000, x: 600, y: 200, enemyType: Triclops, direction: Right },
            { delay: 27000, x: 200, y: 400, enemyType: Triclops, direction: Left  },
            { delay: 27000, x: 600, y: 400, enemyType: Triclops, direction: Left  }
        ]
        
        super.create(280, Scene.Level(3), platformMap, enemySpawns)
    }
}

class Level3 extends Level {
    constructor(){
        super(Scene.Level(3))
    }
    
    create(){
        const platformMap = [
            "XXXXXXXXX--XXXXXXXXX",
            "XX----------------XX",
            "XX----------------XX",
            "XXXXXXXXXXXXXXX--XXX",
            "--------------------",
            "--------------------",
            "XXXXXXX--XXXXXXXXXXX",
            "X------------------X",
            "X------------------X",
            "--------------------",
            "-------XXXXXX-------",
            "--------------------",
            "X------------------X",
            "XX----------------XX",
            "XXXXXXXXX--XXXXXXXXX"
        ]
        
        const { Right, Left } = Direction
        const enemySpawns = [
            { delay: 2000, x: 100, y: 350, enemyType: Bat, direction: Right },
            { delay: 2000, x: 700, y: 350, enemyType: Bat, direction: Left  },
            
            { delay: 6000,  x: 100, y: 100, enemyType: Triclops, direction: Right },
            { delay: 8000,  x: 100, y: 100, enemyType: Triclops, direction: Right },
            { delay: 10000, x: 100, y: 100, enemyType: Triclops, direction: Right },
            
            { delay: 18000, x: 400, y: 335, enemyType: Frog },
            { delay: 19000, x: 400, y: 335, enemyType: SmartTriclops, direction: Left },
            
            { delay: 24000, x: 100, y: 100, enemyType: Triclops, direction: Right },
            { delay: 26000, x: 100, y: 100, enemyType: Triclops, direction: Right },
            { delay: 28000, x: 100, y: 100, enemyType: Triclops, direction: Right },
            
            { delay: 34000, x: 400, y: 335, enemyType: Frog },
            { delay: 35000, x: 400, y: 335, enemyType: SmartTriclops, direction: Left }
        ]
        
        super.create(340, Scene.Level(4), platformMap, enemySpawns)
    }
}

class Level4 extends Level {
    constructor(){
        super(Scene.Level(4))
    }
    
    create(){
        const platformMap = [
            "----------X-----X---",
            "------X-------------",
            "-X-----------X------",
            "--------------------",
            "----XX--XX--------X-",
            "---------------X----",
            "------------X-------",
            "-XX---X-------------",
            "--------------------",
            "---------XXX-----XX-",
            "---XX---------------",
            "--------------X-----",
            "X------X-----------X",
            "--------------------",
            "----------X-----X---"
        ]
        
        const { Right, Left } = Direction
        const enemySpawns = [
            { delay: 2000, x: 50, y: 150, enemyType: Triclops, direction: Right },
            
            { delay: 4000, x: 400, y: 100, enemyType: Ghost },
            { delay: 6000, x: 50,  y: 150, enemyType: Ghost },
            { delay: 8000, x: 100, y: 550, enemyType: Ghost },
            
            { delay: 12000, x: 750, y: 280, enemyType: Triclops, direction: Left },
            
            { delay: 14000, x: 400, y: 500, enemyType: Ghost },
            { delay: 16000, x: 750, y: 280, enemyType: Ghost },
            { delay: 18000, x: 700, y: 100, enemyType: Ghost },
            
            { delay: 22000, x: 400, y: 320, enemyType: Bat, direction: Left  },
            { delay: 22000, x: 400, y: 320, enemyType: Bat, direction: Right },
            
            { delay: 26000, x: 50,  y: 150, enemyType: Triclops, direction: Right },
            { delay: 26000, x: 750, y: 280, enemyType: Triclops, direction: Left }
        ]
        
        super.create(320, Scene.Level(5), platformMap, enemySpawns)
    }
}

class Level5 extends Level {
    constructor(){
        super(Scene.Level(5))
    }
    
    create(){
        const platformMap = [
            "XXXXXXXXXXXXXXXXXXXX",
            "XX----------------XX",
            "X------------------X",
            "--------------------",
            "--------------------",
            "XX------XXXX------XX",
            "X------------------X",
            "X------------------X",
            "XXXX------------XXXX",
            "--------------------",
            "--------------------",
            "X-------XXXX-------X",
            "XX----------------XX",
            "XXX--------------XXX",
            "XXXXXXXXXXXXXXXXXXXX"
        ]
        
        const { Right, Left } = Direction
        const enemySpawns = [
            { delay: 2000, x: 400, y: 300, enemyType: Bat, direction: Right },
            { delay: 2000, x: 400, y: 150, enemyType: Bat, direction: Left  },
            
            { delay: 12000, x: 400, y: 300, enemyType: SmartTriclops, direction: Right },
            { delay: 12000, x: 50,  y: 150, enemyType: SmartTriclops, direction: Left  },
            { delay: 12000, x: 750, y: 150, enemyType: SmartTriclops, direction: Right },
            { delay: 12000, x: 150, y: 200, enemyType: SmartTriclops, direction: Left  },
            { delay: 12000, x: 650, y: 200, enemyType: SmartTriclops, direction: Right },
            
            { delay: 18000, x: 400, y: 160, enemyType: GhostShip, direction: Right },
            { delay: 18000, x: 400, y: 160, enemyType: GhostShip, direction: Left  },
            
            { delay: 23000, x: 200, y: 300, enemyType: Frog },
            { delay: 23000, x: 600, y: 300, enemyType: Frog },
            
            { delay: 28000, x: 400, y: 300, enemyType: Bat, direction: Left  },
            { delay: 28000, x: 400, y: 150, enemyType: Bat, direction: Right }
        ]
        
        super.create(340, Scene.Level(6), platformMap, enemySpawns)
    }
}

class Level6 extends Level {
    constructor(){
        super(Scene.Level(6))
    }
    
    create(){
        const platformMap = [
            "XXX--XXXXXXXXXX--XXX",
            "XX----------------XX",
            "X------------------X",
            "--------------------",
            "--------------------",
            "XXXXXX--------XXXXXX",
            "--------------------",
            "--------------------",
            "--------XXXX--------",
            "--------------------",
            "--------------------",
            "-----X--------X-----",
            "--------------------",
            "--------------------",
            "XXX--XXXXXXXXXX--XXX"
        ]
        
        const { Right, Left } = Direction
        const enemySpawns = [
            { delay: 2000, x: 180, y: 100, enemyType: Frog },
            { delay: 2000, x: 620, y: 100, enemyType: Frog },
            
            { delay: 6000, x: 180, y: 100, enemyType: Ghost },
            { delay: 7000, x: 180, y: 300, enemyType: Ghost },
            { delay: 8000, x: 180, y: 100, enemyType: Frog  },
            
            { delay: 14000, x: 620, y: 100, enemyType: Ghost },
            { delay: 15000, x: 620, y: 300, enemyType: Ghost },
            { delay: 16000, x: 620, y: 100, enemyType: Frog  },
            
            { delay: 22000, x: 180, y: 300, enemyType: SmartTriclops, direction: Left  },
            { delay: 22000, x: 620, y: 300, enemyType: SmartTriclops, direction: Right },
            { delay: 23000, x: 180, y: 100, enemyType: Frog },
            { delay: 23000, x: 620, y: 100, enemyType: Frog },
            { delay: 24000, x: 400, y: 160, enemyType: GhostShip, direction: Left  },
            { delay: 24000, x: 400, y: 160, enemyType: GhostShip, direction: Right }
        ]
        
        super.create(280, Scene.Level(7), platformMap, enemySpawns)
    }
}

class Level7 extends Level {
    constructor(){
        super(Scene.Level(7))
    }
    
    create(){
        const platformMap = [
            "XXX---XXXXXXXXXXXXXX",
            "XX-----XX---------XX",
            "X------X-----------X",
            "---X---X------------",
            "-------X------------",
            "------XXX-----------",
            "XXXXXXXXXXXX---XXXXX",
            "--------------------",
            "--------------------",
            "--------------------",
            "-------X----XXXX----",
            "-------X------------",
            "X------X-----------X",
            "XX-----XX---------XX",
            "XXX---XXXXXXXXXXXXXX"
        ]
        
        const { Right, Left } = Direction
        const enemySpawns = [
            { delay: 2000, x: 140, y: 100, enemyType: Triclops, direction: Right },
            { delay: 2500, x: 500, y: 100, enemyType: Triclops, direction: Left  },
            { delay: 3000, x: 140, y: 340, enemyType: Triclops, direction: Left  },
            { delay: 3500, x: 540, y: 340, enemyType: Triclops, direction: Right },
            
            { delay: 12000, x: 140, y: 100, enemyType: Ghost },
            { delay: 12500, x: 540, y: 100, enemyType: Ghost },
            { delay: 13000, x: 140, y: 340, enemyType: Ghost },
            { delay: 13500, x: 540, y: 340, enemyType: Ghost },
        
            { delay: 22000, x: 140, y: 100, enemyType: Frog },
            { delay: 22500, x: 460, y: 100, enemyType: Frog },
            { delay: 23000, x: 100, y: 340, enemyType: Frog },
            { delay: 23500, x: 540, y: 340, enemyType: Frog },
            
            { delay: 32000, x: 140, y: 100, enemyType: Bat, direction: Right },
            { delay: 32500, x: 540, y: 100, enemyType: Bat, direction: Left  },
            { delay: 33000, x: 140, y: 340, enemyType: Bat, direction: Right },
            { delay: 33500, x: 540, y: 340, enemyType: Bat, direction: Left  },
            
            { delay: 42000, x: 140, y: 100, enemyType: GhostShip, direction: Right },
            { delay: 42500, x: 540, y: 100, enemyType: GhostShip, direction: Left  },
            { delay: 43000, x: 140, y: 340, enemyType: GhostShip, direction: Right },
            { delay: 43500, x: 540, y: 340, enemyType: GhostShip, direction: Left  }
        ]
        
        super.create(340, Scene.GameComplete, platformMap, enemySpawns)
    }
}