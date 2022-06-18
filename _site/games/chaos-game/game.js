function change(shape){
    ctx.clearRect(0, 0, 500, 500);
    switch(shape){
        case "triangle":
            attractorPoints = [[250, 50], [50, 400], [450, 400]];
            break;
        case "carpet":
            attractorPoints = [[70, 70], [250 , 70], [430, 70], [70, 250], [70, 430], [250, 430], [430, 430], [430, 250]];
            break;
        case "hexagon":
            attractorPoints = [[155, 80], [345, 80], [435, 250], [345, 420], [155, 420], [65, 250]];
            break;
        case "fern":
            attractorPoints = [[-50, -50], [-50, -50]];
            break;
    }
}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var attractorPoints;
var point = [Math.random()*500, Math.random()*500];
var interval;

//Updates animation
function draw(){
    for(var i = 0; i < attractorPoints.length; i++){
        ctx.fillStyle = "#f00";
        ctx.fillRect(attractorPoints[i][0] - 3, attractorPoints[i][1] - 3, 6, 6);
    }
    var rand = Math.floor(Math.random()*attractorPoints.length);
    var chosenPoint = attractorPoints[rand];
    
    if(attractorPoints.length == 3){
        var newX = (point[0] + chosenPoint[0])/2;
        var newY = (point[1] + chosenPoint[1])/2;
    }
    
    if(attractorPoints.length > 4){
        var newX = (point[0] + 2*chosenPoint[0])/3;
        var newY = (point[1] + 2*chosenPoint[1])/3;
    }
    
    //Barnsley Fern Code
    if(attractorPoints.length == 2){
        var rand100 = Math.floor(Math.random()*100);
        if(rand100 == 0){
            var newX = 0;
            var newY = 0.16*point[1];
        } else if(rand100 > 0 && rand100 <= 85){
            var newX = 0.85*point[0] + 0.04*point[1];
            var newY = -0.04*point[0] + 0.85*point[1] + 1.6;
        } else if(rand100 > 85 && rand100 <= 92){
            var newX = 0.2*point[0] - 0.26*point[1];
            var newY = 0.23*point[0] + 0.22*point[1] + 1.6;
        } else if(rand100 > 92){
            var newX = -0.15*point[0] + 0.28*point[1];
            var newY = 0.26*point[0] + 0.24*point[1] + 0.44;
        }
        //Draws Barnsley Fern point
        ctx.translate(250, 222);
        ctx.rotate(Math.PI);
        ctx.fillStyle = "#000";
        ctx.fillRect((point[0] - 1)*50, (point[1] - 1)*50 - 250, 2, 2);
        ctx.rotate(-Math.PI);
        ctx.translate(-250, -222);
    } else {
        //Draws point
        ctx.fillStyle = "#000";
        ctx.fillRect(point[0] - 1, point[1] - 1, 2, 2);
    }
    point = [newX, newY];
}

setInterval(draw, 1);