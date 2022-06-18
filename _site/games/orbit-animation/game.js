function phases(){
    //New Moon
    if(moon.rotateAmount >= Math.PI/8 && moon.rotateAmount < 0 || moon.rotateAmount < -Math.PI * (1 + 7/8)) moonPhase.phase = "New Moon";
    
    //Waxing crescent
    if(moon.rotateAmount >= -Math.PI*3/8 && moon.rotateAmount < -Math.PI/8) moonPhase.phase = "Waxing Crescent";
    
    //First quarter
    if(moon.rotateAmount >= -Math.PI*5/8 && moon.rotateAmount < -Math.PI*3/8) moonPhase.phase = "First Quarter";
    
    //Waxing gibbous
    if(moon.rotateAmount >= -Math.PI*7/8 && moon.rotateAmount < -Math.PI*5/8) moonPhase.phase = "Waxing Gibbous";
    
    //Full moon
    if(moon.rotateAmount >= -Math.PI*1.125 && moon.rotateAmount < -Math.PI*7/8) moonPhase.phase = "Full Moon";
    
    //Waning gibbous
    if(moon.rotateAmount >= -Math.PI*1.375 && moon.rotateAmount < -Math.PI*1.125) moonPhase.phase = "Waning Gibbous";
    
    //Last quarter
    if(moon.rotateAmount >= -Math.PI*1.625 && moon.rotateAmount < -Math.PI*1.375) moonPhase.phase = "Third Quarter";
    
    //Waning crescent
    if(moon.rotateAmount >= -Math.PI*1.875 && moon.rotateAmount < -Math.PI*1.625) moonPhase.phase = "Waning Crescent";
}

var canvas = document.getElementById("bigCanvas");
var ctx = canvas.getContext("2d");
var speed = 30;
var interval;
ctx.translate(250, 250);

//Creates month
var month = {
    text : "January",
    draw : function(){
        
        //Changes month
        if(earth.rotateAmount < 0 && earth.rotateAmount >= -Math.PI/6) this.text = "January";
        
        else if(earth.rotateAmount < -Math.PI/6 && earth.rotateAmount >= -Math.PI/3) this.text = "February";
        
        else if(earth.rotateAmount < -Math.PI/3 && earth.rotateAmount >= -Math.PI/2) this.text = "March";
        
        else if(earth.rotateAmount < -Math.PI/2 && earth.rotateAmount >= -Math.PI*2/3) this.text = "April";
        
        else if(earth.rotateAmount < -Math.PI*2/3 && earth.rotateAmount >= -Math.PI*5/6) this.text = "May";
        
        else if(earth.rotateAmount < -Math.PI*5/6 && earth.rotateAmount >= -Math.PI) this.text = "June";
        
        else if(earth.rotateAmount < -Math.PI && earth.rotateAmount >= -Math.PI*(1 + 1/6)) this.text = "July";
        
        else if(earth.rotateAmount < -Math.PI*(1 + 1/6) && earth.rotateAmount >= -Math.PI*(1 + 1/3)) this.text = "August";
        else if(earth.rotateAmount < -Math.PI*(1 + 1/3) && earth.rotateAmount >= -Math.PI*(1 + 1/2)) this.text = "September";
        else if(earth.rotateAmount < -Math.PI*(1 + 1/2) && earth.rotateAmount >= -Math.PI*(1 + 2/3)) this.text = "October";
        else if(earth.rotateAmount < -Math.PI*(1 + 2/3) && earth.rotateAmount >= -Math.PI*(1 + 5/6)) this.text = "November";
        else if(earth.rotateAmount < -Math.PI*(1 + 5/6) && earth.rotateAmount >= -2*Math.PI) this.text = "December";

        ctx.font = "30px garamond";
        ctx.fillStyle = "#fff";
        ctx.fillText(this.text, -225, -210);
    }
};

//Creates moon phase
var moonPhase = {
    phase : "New Moon",
    draw : function(){
        ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.arc(190, -190, 40, 0, 2*Math.PI);
            ctx.fill();
        phases();
        
        //Draws moon phase
        switch(this.phase){
            case "New Moon":
                ctx.beginPath();
                ctx.fillStyle = "#000";
                ctx.arc(190, -190, 41, 0, 2*Math.PI);
                ctx.fill();
            break;
            case "Waxing Crescent":
                ctx.beginPath();
                ctx.fillStyle = "#000";
                ctx.ellipse(190, -190, 25, 40, 0, 0, 2*Math.PI);
                ctx.fill();
                ctx.fillRect(150, -250, 40, 100);
            break;
            case "First Quarter":
                ctx.beginPath();
                ctx.fillStyle = "#000";
                ctx.arc(190, -190, 41, Math.PI/2, Math.PI*1.5);
                ctx.fill();
            break;
            case "Waxing Gibbous":
                ctx.beginPath();
                ctx.fillStyle = "#000";
                ctx.arc(190, -190, 41, Math.PI/2, Math.PI*1.5);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = "#fff";
                ctx.ellipse(190, -190, 25, 40, 0, 0, 2*Math.PI);
                ctx.fill();
            break;
            case "Waning Gibbous":
                ctx.beginPath();
                ctx.fillStyle = "#000";
                ctx.arc(190, -190, 41, Math.PI*1.5, Math.PI/2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = "#fff";
                ctx.ellipse(190, -190, 25, 40, 0, 0, 2*Math.PI);
                ctx.fill();
            break;
            case "Third Quarter":
                ctx.beginPath();
                ctx.fillStyle = "#000";
                ctx.arc(190, -190, 41, Math.PI*1.5, Math.PI/2);
                ctx.fill();
            break;
            case "Waning Crescent":
                ctx.beginPath();
                ctx.fillStyle = "#000";
                ctx.ellipse(190, -190, 25, 40, 0, 0, 2*Math.PI);
                ctx.fill();
                ctx.fillRect(190, -250, 40, 100);
            break;
        }
    }
}

//Creates sun
var sun = {
    draw : function(){
        ctx.beginPath();
            ctx.fillStyle = "#ff0";
            ctx.strokeStyle = "#000";
            ctx.arc(0, 0, 35, 0, 2*Math.PI);
            ctx.fill();
            ctx.stroke();
    }  
}

//Creates tidal bulge
var tide = {
    draw : function(){
        ctx.rotate(earth.rotateAmount);
        ctx.translate(0, earth.y);
            ctx.beginPath();
                ctx.fillStyle = "#0ff";
                ctx.ellipse(0, 0, 25, 32, moon.rotateAmount, 0, 2*Math.PI);
                ctx.fill();
        ctx.translate(0, -earth.y);
        ctx.rotate(-earth.rotateAmount);
    }
}

//Creates Earth
var earth = {
    y : -150,
    rotateAmount : 0,
    draw : function(){
        if(this.rotateAmount <= -2*Math.PI){
            this.rotateAmount = 0;
        }
        this.rotateAmount -= 2*Math.PI/3652.56*3
        ctx.rotate(this.rotateAmount);
            ctx.beginPath();
                ctx.fillStyle = "#000"
                ctx.strokeStyle = "#000"
                ctx.arc(0, this.y, 20, Math.PI, 0);
                ctx.fill();
                ctx.stroke();
            ctx.beginPath();
                ctx.fillStyle = "#fff";
                ctx.strokeStyle = "#000"
                ctx.arc(0, this.y, 20, 0, Math.PI);
                ctx.fill();
                ctx.stroke();
        ctx.rotate(-this.rotateAmount);
    }
}

//Creates Moon
var moon = {
    y : 60,
    rotateAmount : 0,
    draw : function(){
        if(this.rotateAmount <= -2*Math.PI){
            this.rotateAmount = 0;
        }
        this.rotateAmount -= 2*Math.PI/273.2*3;
        ctx.rotate(earth.rotateAmount);
        ctx.translate(0, earth.y);
        ctx.rotate(this.rotateAmount);
            ctx.beginPath();
                ctx.fillStyle = "#ccc";
                ctx.strokeStyle = "#000";
                ctx.arc(0, this.y, 10, 0, 2*Math.PI);
                ctx.fill();
                ctx.stroke();
        ctx.rotate(-this.rotateAmount);
        ctx.translate(0, -earth.y);
        ctx.rotate(-earth.rotateAmount);
        
    }
}

//Updates simulation
function draw(){
    ctx.clearRect(-250, -250, 500, 500);
    sun.draw();
    tide.draw();
    earth.draw();
    moon.draw();
    month.draw();
    moonPhase.draw();
    clearInterval(interval);
    interval = setInterval(draw, speed);
}

//Begins program
draw();