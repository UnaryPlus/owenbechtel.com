class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene, spawns){
        super(scene.physics.world, scene)
        scene.physics.add.collider(this, scene.platforms)
        scene.physics.add.collider(this, scene.archer, this.hitArcher, this.collideArcher, this)
        scene.physics.add.overlap(this, scene.archer.arrows, this.hitArrows, this.collideArrows, null, this)
        
        this.internalCreateCallback = null
        this.enemiesLeft = spawns.length
        spawns.forEach(spawn => this.addSpawn(spawn))
    }
    
    update(){
        this.scene.physics.world.wrap(this)
        this.children.iterate(enemy => enemy.update())
    }
    
    collideArrows(enemy, arrow){
        return arrow.state === ArrowState.Dynamic
    }
    
    hitArrows(enemy, arrow){
        if(arrow.state === ArrowState.Dynamic) enemy.kill()
    }
    
    collideArcher(archer, enemy){
        return archer.alpha === 1 && enemy.alpha === 1
    }
    
    hitArcher(archer, enemy){
        if(enemy.body.touching.up) enemy.kill()
        else archer.kill()
    }
    
    addSpawn(spawn){
        this.scene.time.addEvent({
            delay: spawn.delay,
            callback: () => this.add(new spawn.enemyType(this.scene, spawn.x, spawn.y, spawn.direction))
        })
    }
}

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, image){
        super(scene, x, y, image)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        this.setAlpha(0.5)
        scene.time.addEvent({
            delay: 1000,
            callback: () => this.setAlpha(1)
        })
    }
    
    kill(){
        this.scene.add.sprite(this.x, this.y, Img.Spritesheet.Explosion)
        .play(Anim.Explosion)
        
        this.scene.enemies.enemiesLeft -= 1
        
        const scene = this.scene
        if(scene.enemies.enemiesLeft < 1){
            scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    scene.add.image(400, scene.archerX, Img.Button.NextLevel)
                    .setDepth(-1)
                    .setInteractive()
                    .on("pointerup", () => {
                        scene.archer.keys.w.off("up")
                        scene.archer.keys.s.off("up")
                        scene.archer.keys.x.off("up")
                        scene.archer.keys.up.off("down")
                        scene.scene.start(scene.nextLevel)
                    })
                }
            })
        }
        
        this.destroy()
    }
}

class Triclops extends Enemy {
    constructor(scene, x, y, direction){
        super(scene, x, y, Img.Spritesheet.Triclops)
        this.setVelocityX(direction === Direction.Left ? -60 : 60)
        this.setBounce(1, 0.5)
    }
    
    update(){
        const direction = this.body.velocity.x < 0 ? Direction.Left : Direction.Right
        this.play(Anim.Triclops(direction), true)
    }
}

class SmartTriclops extends Enemy {
    constructor(scene, x, y, direction){
        super(scene, x, y, Img.Spritesheet.SmartTriclops)
        this.setVelocityX(direction === Direction.Left ? -60 : 60)
        this.setBounce(1, 0)
    }
    
    update(){
        if(!this.body.touching.down && this.alpha === 1){
            this.body.velocity.x *= -1
        }
        
        const direction = this.body.velocity.x < 0 ? Direction.Left : Direction.Right
        this.play(Anim.SmartTriclops(direction), true)
    }
}

class Bat extends Enemy {
    constructor(scene, x, y, direction){
        super(scene, x, y, Img.Spritesheet.Bat)
        this.setVelocityX(direction === Direction.Left ? -100 : 100)
        this.setBounce(1, 0)
        this.play(Anim.Bat)
    }
    
    update(){
        if(Math.random() < 0.02 || this.body.touching.down){
            this.setVelocityY(-300)
        }
    }
}

class Frog extends Enemy {
    constructor(scene, x, y){
        super(scene, x, y, Img.Spritesheet.Frog)
        this.setBounce(1, 0)
    }
    
    update(){
        if(this.body.touching.down){
            if(Math.random() < 0.03){
                const vx = this.scene.archer.x < this.x ? -100 : 100
                this.setVelocity(vx, -400)
            }
            else {
                this.setVelocity(0, 0)
            }
        }
        
        const direction = this.body.velocity.x < 0 ? Direction.Left : Direction.Right
        this.play(Anim.Frog(direction))
    }
}

class Ghost extends Enemy {
    constructor(scene, x, y){
        super(scene, x, y, Img.Spritesheet.Ghost)
    }
    
    update(){
        if(this.scene.archer.active){
            this.scene.physics.moveToObject(this, this.scene.archer, 80)
        }
        
        const direction = this.body.velocity.x < 0 ? Direction.Left : Direction.Right
        this.play(Anim.Ghost(direction))
    }
}

class GhostShip extends Enemy {
    constructor(scene, x, y, direction){
        super(scene, x, y, Img.Spritesheet.GhostShip)
        this.setVelocityX(direction === Direction.Left ? -80 : 80)
        this.setBounce(1, 0)
        this.body.setAllowGravity(false)
    }
    
    update(){
        if(Math.random() < 0.0075){
            new Bomb(this.scene, this.x + 75, this.y + 50)
        }
        
        const direction = this.body.velocity.x < 0 ? Direction.Left : Direction.Right
        this.play(Anim.GhostShip(direction))
    }
}

class Bomb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, Img.Spritesheet.Bomb)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        scene.physics.add.collider(this, scene.platforms)
        scene.physics.add.overlap(this, scene.archer, this.hitArcher, this.collideArcher, this)
        
        this.setAlpha(0.75)
        this.setSize(20, 20)
        this.setOffset(156/2 - 20/2, 108 - 20)
        this.setDepth(-1)
        
        scene.time.addEvent({
            delay: 1000,
            callback: () => this.setAlpha(1).play(Anim.Bomb)
        })
        
        scene.time.addEvent({
            delay: 1900,
            callback: () => this.setSize(156, 108).setOffset(0, 0)
        })
        
        scene.time.addEvent({
            delay: 2000,
            callback: () => this.destroy()
        })
        
        scene.time.addEvent({
            delay: 20,
            callback: () => { if(this.x > 600) this.x = 0 },
            loop: true
        })
    }
    
    collideArcher(bomb, archer){
        return this.alpha === 1 && archer.alpha === 1
    }
    
    hitArcher(bomb, archer){
        archer.kill()
    }
}