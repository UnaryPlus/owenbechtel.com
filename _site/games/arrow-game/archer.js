class Archer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene){
        super(scene, 400, scene.archerX, Img.Spritesheet.Archer)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        //Fixes body width
        this.setSize(25, 55)
        
        scene.physics.add.collider(this, scene.platforms)
        
        this.direction = Direction.Left
        
        this.inventory = new Inventory(scene)
        this.arrows = new Arrows(scene, this)
        
        //Variables for keyboard input
        this.keys = scene.input.keyboard.createCursorKeys()
        this.keys.w = scene.input.keyboard.addKey("W")
        this.keys.s = scene.input.keyboard.addKey("S")
        this.keys.x = scene.input.keyboard.addKey("X")
        
        //Event listeners for shooting and jumping
        this.keys.w.on("up", () => this.arrows.shoot(-45))
        this.keys.s.on("up", () => this.arrows.shoot(-10))
        this.keys.x.on("up", () => this.arrows.shoot(30))
        this.keys.up.on("down", 
            () => {
                if(this.body.touching.down) this.setVelocityY(-420)
            }
        )
    }
    
    update(){
        //Moves archer
        if(this.keys.left.isDown){
            this.setVelocityX(-160)
            this.direction = Direction.Left
            this.play(Anim.Running(Direction.Left), true)
        }
        else if(this.keys.right.isDown){
            this.setVelocityX(160)
            this.direction = Direction.Right
            this.play(Anim.Running(Direction.Right), true)
        }
        else {
            this.setVelocityX(0)
            this.play(Anim.Standing(this.direction))
        }
        
        //Plays shooting animation
        if(this.keys.w.isDown){
            this.play(Anim.Shooting.Up(this.direction))
        }
        if(this.keys.s.isDown){
            this.play(Anim.Shooting.Side(this.direction))
        }
        if(this.keys.x.isDown){
            this.play(Anim.Shooting.Down(this.direction))
        }
        
        //Wraps archer
        this.scene.physics.world.wrap(this)
        
        //Updates inventory and arrows
        this.inventory.update()
        this.arrows.update()
    }
    
    kill(){
        this.scene.add.sprite(this.x, this.y, Img.Spritesheet.Explosion)
        .play(Anim.Explosion)
        
        this.disableBody(true, true)
        this.inventory.hearts -= 1
        score.heartsLost += 1
        
        if(this.inventory.hearts > 0){
            //Reappears after 1 second
            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.enableBody(true, 400, this.scene.archerX, true, true)
                    this.setAlpha(0.5)
                }
            })
            
            //Becomes opaque after 3 seconds
            this.scene.time.addEvent({
                delay: 3000,
                callback: () => this.setAlpha(1)
            })
        }
        else {
            score.deaths += 1
            
            //Adds restart button after 1 second
            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.add.image(400, this.scene.archerX, Img.Button.Restart)
                    .setDepth(-1)
                    .setInteractive()
                    .on("pointerup", () => {
                        this.keys.w.off("up")
                        this.keys.s.off("up")
                        this.keys.x.off("up")
                        this.keys.up.off("down")
                        this.scene.scene.restart()
                    })
                }
            })
        }
    }
}

class Inventory extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene){
        super(scene.physics.world, scene)
        this.arrows = 5
        this.hearts = 3
    }
    
    update(){
        //Destroys images in order to redraw them
        this.children.iterate(image => { if(image) image.destroy() })
        
        //Draws arrow symbols
        for(let i = 1; i <= this.arrows; i++){
            this.create(10 * i, 20, Img.Arrow)
        }
        
        //Draws heart symbols
        for(let i = 1; i <= this.hearts; i++){
            this.create(800 - 18 * i, 20, Img.Heart)
        }
    }
}

class Arrows extends Phaser.Physics.Arcade.Group {
    constructor(scene, archer){
        super(scene.physics.world, scene)
        scene.physics.add.collider(this, scene.platforms, this.hitPlatforms)
        scene.physics.add.collider(this, archer, this.hitArcher)
        
        this.archer = archer
        this.graphics = scene.add.graphics()
    }
    
    shoot(angle){
        if(this.archer.inventory.arrows > 0){
            this.archer.inventory.arrows -= 1
            
            if(this.archer.direction === Direction.Left){
                angle += 90
                angle *= -1
                angle -= 90
            }
            
            const velocity = this.scene.physics.velocityFromAngle(angle, 600)
            
            this.create(this.archer.x, this.archer.y, Img.Arrow)
            .setVelocity(velocity.x, velocity.y)
            .setSize(1, 1)
            .setDepth(-1)
            .setState(ArrowState.Dynamic)
        }
    }
    
    update(){
        //Wraps arrows
        this.scene.physics.world.wrap(this)
        
        this.children.iterate(
            arrow => {
                if(arrow.state === ArrowState.Dynamic){
                    //Makes arrows point in the right direction
                    const angle = Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x)
                    arrow.setRotation(angle + Math.PI / 2)
                    
                    //Centers arrow body around tip
                    arrow.body.setOffset(Math.cos(angle) * 6, Math.sin(angle) * 6 + 14) 
                }
            }
        )
    }
    
    hitPlatforms(arrow, platform){
        //Makes arrow stop moving and centers arrow body
        arrow.body.stop()
        .setAllowGravity(false)
        .setOffset(0, 0)
        
        //Makes arrow body larger and makes it so arrow doesn't get updated anymore
        arrow.setSize(20, 20)
        .setState(ArrowState.Static)
    }
    
    hitArcher(archer, arrow){
        arrow.destroy()
        archer.inventory.arrows += 1
    }
}