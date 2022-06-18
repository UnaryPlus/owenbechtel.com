const canvas = document.getElementById("forest")
const engine = new BABYLON.Engine(canvas, true)

const createScene = () => {
    const scene = new BABYLON.Scene(engine)
    scene.gravity = new BABYLON.Vector3(0, -1, 0)
    scene.collisionsEnabled = true

    createPlayer(scene)
    createTunnels(new BABYLON.Vector3(0, 40, 200), scene)
    createForest(new BABYLON.Vector3(0, 20, 100), scene)
    createForest(BABYLON.Vector3.Zero(), scene)
    createForest(new BABYLON.Vector3(0, -20, -100), scene)
    createHole(new BABYLON.Vector3(0, -40, -200), scene)

    return scene
}

const createPlayer = (scene) => {
    //create camera and disable left and right controls
    const player = new BABYLON.UniversalCamera("player", new BABYLON.Vector3(0, 100, 0), scene)
    player.speed = 0.75
    player.keysLeft = []
    player.keysRight = []
    player.attachControl(canvas)

    //apply gravity and check for collisions
    player.applyGravity = true
    player._needMoveForGravity = true
    player.ellipsoid = new BABYLON.Vector3(1.5, 1.5, 1.5)
    player.checkCollisions = true

    const flashlight = new BABYLON.SpotLight("flashlight", BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), 1, 30, scene)

    //add new controls to rotate the camera and jump
    let left = false
    let right = false

    scene.onKeyboardObservable.add((info) => {
        if (info.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
            switch (info.event.code) {
                case "ArrowLeft": left = true; break;
                case "ArrowRight": right = true; break;
                case "Space":
                    const jump = new BABYLON.Animation("jump", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT)
                    jump.setKeys([
                        { frame: 0, value: player.position.y },
                        { frame: 2, value: player.position.y + 8 },
                        { frame: 4, value: player.position.y + 12 },
                        { frame: 6, value: player.position.y + 14 },
                        { frame: 8, value: player.position.y + 15 }
                    ])
                    player.animations = [jump]
                    scene.beginAnimation(player, 0, 8)
                break;
            }
        }

        else if (info.type === BABYLON.KeyboardEventTypes.KEYUP) {
            switch (info.event.code) {
                case "ArrowLeft": left = false; break;
                case "ArrowRight": right = false; break;
            }
        }
    })

    scene.onBeforeRenderObservable.add(() => {
        if (player.position.y < -100) player.position = new BABYLON.Vector3(0, 100, 0)
        player.rotation.y += left ? -0.02 : right ? 0.02 : 0

        //make light follow player
        flashlight.position = player.position
        flashlight.direction = new BABYLON.Vector3(Math.sin(player.rotation.y), 0, Math.cos(player.rotation.y))
    })
}

const createForest = (location, scene) => {
    const ground = BABYLON.MeshBuilder.CreateBox("ground", { width: 100, depth: 100, height: 0.5 }, scene)
    ground.position.x = location.x
    ground.position.z = location.z
    ground.position.y = location.y - 0.25
    ground.checkCollisions = true

    for (let i = 0; i < 80; i++) {
        const trunk = BABYLON.MeshBuilder.CreateCylinder("cylinder", { height: 4, diameter: 1 }, scene)
        trunk.position.x = (Math.random() - 0.5) * 99 + location.x
        trunk.position.z = (Math.random() - 0.5) * 99 + location.z
        trunk.position.y = location.y + 2
        trunk.checkCollisions = true

        if (Math.random() < 0.5) {
            const leaves = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 3 }, scene)
            leaves.position.x = trunk.position.x
            leaves.position.z = trunk.position.z
            leaves.position.y = location.y + 5
            leaves.checkCollisions = true
        }

        else {
            const leaves = BABYLON.MeshBuilder.CreateCylinder("cone", { height: 4, diameterBottom: 3, diameterTop: 0 }, scene)
            leaves.position.x = trunk.position.x
            leaves.position.z = trunk.position.z
            leaves.position.y = location.y + 6
            leaves.checkCollisions = true
        }
    }
}

const createTunnels = (location, scene) => {
    const ground = BABYLON.MeshBuilder.CreateBox("ground", { width: 100, depth: 100, height: 0.5 }, scene)
    ground.position.x = location.x
    ground.position.z = location.z
    ground.position.y = location.y - 0.25
    ground.checkCollisions = true

    const createWall = (x, z, sideways, tunnel) => {
        const size = tunnel ? 5.5 : 15

        const shape = [
            new BABYLON.Vector3(-size, 0, -size),
            new BABYLON.Vector3(size, 0, -size),
            new BABYLON.Vector3(size, 0, size),
            new BABYLON.Vector3(-size, 0, size)
        ]

        const hole = [
            new BABYLON.Vector3(-5, 0, -5),
            new BABYLON.Vector3(5, 0, -5),
            new BABYLON.Vector3(5, 0, 5),
            new BABYLON.Vector3(-5, 0, 5)
        ]

        const wall = BABYLON.MeshBuilder.CreatePolygon("wall", { shape: shape, holes: [hole], depth: tunnel ? 20 : 0.5 }, scene)
        wall.position.x = x
        wall.position.z = z
        wall.position.y = location.y + 15
        wall.rotation.x = Math.PI / 2
        wall.rotation.y = sideways ? Math.PI / 2 : 0
        wall.checkCollisions = true
    }

    //walls
    createWall(location.x - 25, location.z - 10, false, false)
    createWall(location.x - 10, location.z - 25, true, false)
    createWall(location.x - 25, location.z + 10.5, false, false)
    createWall(location.x - 10, location.z + 25, true, false)
    createWall(location.x + 25, location.z - 10, false, false)
    createWall(location.x + 10.5, location.z - 25, true, false)
    createWall(location.x + 25, location.z + 10.5, false, false)
    createWall(location.x + 10.5, location.z + 25, true, false)

    //tunnels
    createWall(location.x + 10, location.z - 25, true, true)
    createWall(location.x + 10, location.z + 25, true, true)
    createWall(location.x - 25, location.z + 10, false, true)
    createWall(location.x + 25, location.z + 10, false, true)
}

const createHole = (location, scene) => {
    const shape = [
        new BABYLON.Vector3(-50, 0, -50),
        new BABYLON.Vector3(50, 0, -50),
        new BABYLON.Vector3(50, 0, 50),
        new BABYLON.Vector3(-50, 0, 50)
    ]

    const hole = [
        new BABYLON.Vector3(-10, 0, -10),
        new BABYLON.Vector3(10, 0, -10),
        new BABYLON.Vector3(10, 0, 10),
        new BABYLON.Vector3(-10, 0, 10)
    ]

    const ground = BABYLON.MeshBuilder.CreatePolygon("ground", { shape: shape, holes: [hole], depth: 0.5 }, scene)
    ground.position.x = location.x
    ground.position.z = location.z
    ground.position.y = location.y - 0.25
    ground.checkCollisions = true

    for(let i = 0; i < 4; i++) {
        const wall = BABYLON.MeshBuilder.CreateBox("wall", { width: i < 2 ? 0.5 : 20, depth: i < 2 ? 20 : 0.5, height: 60 }, scene)
        wall.position.x = location.x + (i === 0 ? 10 : i === 1 ? -10 : 0)
        wall.position.z = location.z + (i === 2 ? 10 : i === 3 ? -10 : 0)
        wall.position.y = -70.25
        wall.checkCollisions = true
    }
}

const scene = createScene()
engine.runRenderLoop(() => scene.render())
window.addEventListener("resize", () => engine.resize())