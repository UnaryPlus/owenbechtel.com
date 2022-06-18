class ObstacleFactory {
    constructor(scene) {
        this.scene = scene
    }
    
    createLevelObstacle(type, y) {
        //create obstacle with the given obstacle type and y position
        if(type === 1) this.createObstacle(y)
        else if(type === 2) this.createObstacleLeft(y)
        else if(type === 3) this.createObstacleRight(y)
        else if(type === 4) this.createMovingObstacleLeft(y)
        else if(type === 5) this.createMovingObstacleRight(y)
        else if(type === 6) this.createRampLeft(y)
        else if(type === 7) this.createRampRight(y)
        else if(type === 8) this.createSpinningObstacleLeft(y)
        else if(type === 9) this.createSpinningObstacleRight(y)
        else if(type === 10) this.createReverseRampLeft(y)
        else if(type === 11) this.createReverseRampRight(y)
        else if(type === 12) this.createTiltingObstacleLeft(y)
        else if(type === 13) this.createTiltingObstacleRight(y)
        else if(type === 14) this.createTurbineLeft(y)
        else if(type === 15) this.createTurbineRight(y)
    }
    
    createEndlessModeObstacle(y, timedMode) {
        //create obstacle with a random type at the given y position
        //if timedMode is true, there is a chance of creating a powerup
        //return the number of pixels the y of the next obstacle should increase by
        const r = Math.random() * 24
        if(y <= 1000) {
            this.createObstacle(y)
            return 200
        }
        if(r < 12) {
            this.createObstacle(y)

            if(timedMode && Math.random() < 0.4) {
                const best = data.scores.timedMode.reduce((a, b) => Math.max(a, b), 0)
                const previous = data.scores.timedMode[data.scores.timedMode.length - 1]
                const average = data.scores.timedMode.reduce((a, b) => a + b, 0) / data.scores.timedMode.length

                if((y + 75 < best || y - 75 > best) && (y + 75 < previous || y - 75 > previous) && (y + 75 < average || y - 75 > average)) {
                    const powerup = this.scene.add.circle(Math.random() * 500 + 50, y - 50, 10, 0xffffff)
                    this.scene.matter.add.gameObject(powerup)
                    powerup.setCircle(10).setStatic(true).setSensor(true)
                    .setOnCollideWith(this.scene.player, () => {
                        powerup.destroy()
                        this.scene.timeLeft += 5
                    })
                }
            }

            return 200
        }
        
        if(r < 13) {
            this.createMovingObstacleLeft(y)
            return 200
        }
        if(r < 14) {
            this.createMovingObstacleRight(y)
            return 200
        }
        if(r < 15) {
            this.createRampLeft(y)
            return 400
        }
        if(r < 16) {
            this.createRampRight(y)
            return 400
        }
        if(r < 17) {
            this.createSpinningObstacleLeft(y + 10)
            return 220
        }
        if(r < 18) {
            this.createSpinningObstacleRight(y + 10)
            return 220
        }
        if(r < 19) {
            this.createReverseRampLeft(y)
            return 400
        }
        if(r < 20) {
            this.createReverseRampRight(y)
            return 400
        }
        if(r < 21) {
            this.createTiltingObstacleLeft(y + 10)
            return 220
        }
        if(r < 22) {
            this.createTiltingObstacleRight(y + 10)
            return 220

        }
        if(r < 23) {
            this.createTurbineLeft(y + 200)
            return 600
        }
        this.createTurbineRight(y + 200)
        return 600
    }
    
    createObstacle(y) {
        //create obstacle with openings in random positions
        const r = Math.floor(Math.random() * 15)

        if(r < 6) {
            this.createRectangle(50 * r, y, 100 * r)
            this.createRectangle(50 * r + 350, y, -100 * r + 500)
        }

        else if(r < 10) {
            this.createRectangle(50 * r - 300, y, 100 * r - 600)
            this.createRectangle(100 * r - 450, y, 100)
            this.createRectangle(50 * r + 150, y, -100 * r + 900)
        }

        else if(r < 13) {
            this.createRectangle(50 * r - 500, y, 100 * r - 1000)
            this.createRectangle(100 * r - 800, y, 200)
            this.createRectangle(50 * r, y, -100 * r + 1200)
        }

        else if(r < 14) {
            this.createRectangle(250, y, 300)
            this.createRectangle(575, y, 150)
        }

        else {
            this.createRectangle(25, y, 150)
            this.createRectangle(350, y, 300)
        }
    }
    
    createObstacleLeft(y) {
        //create obstacle on left side of screen with a single opening on the right
        this.createRectangle(250, y, 500)
    }

    createObstacleRight(y) {
        //create obstacle on right side of screen with a single opening on the left
        this.createRectangle(350, y, 500)
    }

    createMovingObstacleLeft(y) {
        //create moving rectangle starting on the left
        this.scene.tweens.add({
            targets: this.createRectangle(225, y, 450),
            x: 375,
            repeat: -1,
            yoyo: true
        })
    }

    createMovingObstacleRight(y) {
        //create moving rectangle starting on the right
        this.scene.tweens.add({
            targets: this.createRectangle(375, y, 450),
            x: 225,
            repeat: -1,
            yoyo: true
        })
    }
    
    createRampLeft(y) {
        //create ramp on left side of screen
        this.createRectangle(200, y + 75, 500).setAngle(25)
    }

    createRampRight(y) {
        //create ramp on right side of screen
        this.createRectangle(400, y + 75, 500).setAngle(-25)
    }

    createSpinningObstacleLeft(y) {
        //create three spinning rectangles with the middle one spinning anticlockwise
        this.scene.tweens.add({
            targets: this.createRectangle(300, y, 200).setAngle(90),
            angle: -270,
            duration: 2000,
            repeat: -1
        })
        this.scene.tweens.add({
            targets: [ this.createRectangle(125, y, 200), this.createRectangle(475, y, 200) ],
            angle: 360,
            duration: 2000,
            repeat: -1
        })
    }
    
    createSpinningObstacleRight(y) {
        //create three spinning rectangles with the middle one spinning clockwise
        this.scene.tweens.add({
            targets: this.createRectangle(300, y, 200).setAngle(-90),
            angle: 270,
            duration: 2000,
            repeat: -1
        })
        this.scene.tweens.add({
            targets: [ this.createRectangle(125, y, 200), this.createRectangle(475, y, 200) ],
            angle: -360,
            duration: 2000,
            repeat: -1
        })
    }

    createReverseRampLeft(y) {
        //create reverse ramp on left side of screen
        this.createRectangle(200, y + 125, 500).setAngle(-25)
    }

    createReverseRampRight(y) {
        //create reverse ramp on right side of screen
        this.createRectangle(400, y + 125, 500).setAngle(25)
    }
    
    createTiltingObstacleLeft(y) {
        //create two rectangles tilting back and forth, which start rotating anticlockwise
        this.scene.tweens.add({
            targets: [ this.createRectangle(125, y, 325).setAngle(28), this.createRectangle(475, y, 325).setAngle(28) ],
            angle: -28,
            duration: 1500,
            ease: "Sine.easeInOut",
            repeat: -1,
            yoyo: true
        })
    }

    createTiltingObstacleRight(y) {
        //create two rectangles tilting back and forth, which start rotating clockwise
        this.scene.tweens.add({
            targets: [ this.createRectangle(125, y, 325).setAngle(-28), this.createRectangle(475, y, 325).setAngle(-28) ],
            angle: 28,
            duration: 1500,
            ease: "Sine.easeInOut",
            repeat: -1,
            yoyo: true
        })
    }
    
    createTurbineLeft(y) {
        //create a four-bladed turbine rotating anticlockwise
        this.scene.tweens.add({
            targets: [ this.createRectangle(300, y, 550), this.createRectangle(300, y, 550).setAngle(90) ],
            angle: "-=360",
            duration: 4000,
            repeat: -1
        })
    }

    createTurbineRight(y) {
        //create a four-bladed turbine rotating clockwiset
        this.scene.tweens.add({
            targets: [ this.createRectangle(300, y, 550), this.createRectangle(300, y, 550).setAngle(-90) ],
            angle: "+=360",
            duration: 4000,
            repeat: -1
        })
    }

    createRectangle(x, y, width) {
        //create rectangle with a height of 50 and a physics body
        const rectangle = this.scene.add.rectangle(x, y, width, 50, 0x999999)
        this.scene.matter.add.gameObject(rectangle)
        rectangle.setStatic(true)
        return rectangle
    }
}