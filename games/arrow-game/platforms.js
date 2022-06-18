class Platforms extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene, map){
        super(scene.physics.world, scene)
        
        //Adds platforms
        for(let row = 0; row < map.length; row++){
            for(let column = 0; column < map[row].length; column++){
                if(map[row][column] === "X"){
                    //Coordinates of platform
                    const x = column * 40 + 20
                    const y = row * 40 + 20
                    
                    //If the platform is on the edge of the screen it pretends the edge of the screen is another platform
                    const top = y > 20 ? map[row - 1][column] : "X"
                    const left = x > 20 ? map[row][column - 1] : "X"
                    const bottom = y < 580 ? map[row + 1][column] : "X"
                    const right = x < 780 ? map[row][column + 1] : "X"
                    
                    const { Inner, Edge, DoubleEdge, Corner, End, Block } = Img.Platform
                    
                    let type = Inner
                    let angle = 0
                    
                    //Checks each possible state of bordering platforms
                    switch(top + left + bottom + right){
                        case "-XXX": type = Edge; break;
                        case "XXX-": type = Edge; angle = 90; break;
                        case "XX-X": type = Edge; angle = 180; break;
                        case "X-XX": type = Edge; angle = 270; break;
                        case "-X-X": type = DoubleEdge; break;
                        case "X-X-": type = DoubleEdge; angle = 90; break;
                        case "--XX": type = Corner; break;
                        case "-XX-": type = Corner; angle = 90; break;
                        case "XX--": type = Corner; angle = 180; break;
                        case "X--X": type = Corner; angle = 270; break;
                        case "---X": type = End; break;
                        case "--X-": type = End; angle = 90; break;
                        case "-X--": type = End; angle = 180; break;
                        case "X---": type = End; angle = 270; break;
                        case "----": type = Block; break;
                    }
                    
                    const numImages = type === Inner ? 1 : type === Edge || type === DoubleEdge ? 4 : 2
                    const imageNumber = Math.floor(Math.random() * numImages + 1)

                    //Adds new platform to group
                    this.create(x, y, type(imageNumber)).setAngle(angle)
                }
            }
        }
    }
}