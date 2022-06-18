new Phaser.Game({ 
    type : Phaser.AUTO, 
    width : 800, 
    height : 600, 
    parent : "game-div",
    physics: { 
        default: "arcade", 
        arcade: { 
            gravity: { y: 500 }, 
            debug: false
        }
    }, 
    scene : [ 
        Intro, 
        Menu, 
        Controls,
        GameComplete,
        Level1, 
        Level2, 
        Level3, 
        Level4, 
        Level5, 
        Level6, 
        Level7
    ]
})

const score = {
    deaths: 0,
    heartsLost: 0
}

//The code below is very bad and should probably be changed.

const value = () => Math.random().toString(36).substr(2, 8)
const valueConstructor = (a = value()) => b => a + b

const Direction = {
    Left: value(),
    Right: value()
}

const ArrowState = {
    Dynamic: value(),
    Static: value()
}

const Scene = {
    Intro: value(),
    Menu: value(),
    Controls: value(),
    GameComplete: value(),
    Level: valueConstructor()
}

const Img = {
    Background: {
        Intro: value(),
        Menu: value(),
        Controls: value(),
        GameComplete: value()
    },
    Button: {
        Menu: value(),
        Controls: value(),
        Begin: value(),
        Restart: value(),
        NextLevel: value()
    },
    Platform: {
        Inner: valueConstructor(),      
        Edge: valueConstructor(),       
        DoubleEdge: valueConstructor(), 
        Corner: valueConstructor(),     
        End: valueConstructor(),    
        Block: valueConstructor()   
    },
    Spritesheet: {
        Archer: value(),
        Triclops: value(),
        SmartTriclops: value(),
        Bat: value(),
        Frog: value(),
        Ghost: value(),
        GhostShip: value(),
        Bomb: value(),
        Explosion: value()
    },
    Arrow: value(),
    Heart: value()
}

const Anim = {
    Standing: valueConstructor(),
    Shooting: {
        Down: valueConstructor(),
        Side: valueConstructor(),
        Up: valueConstructor()
    },
    Running: valueConstructor(),
    Triclops: valueConstructor(),
    SmartTriclops: valueConstructor(),
    Bat: value(),
    Frog: valueConstructor(),
    Ghost: valueConstructor(),
    GhostShip: valueConstructor(),
    Bomb: value(),
    Explosion: value()
}