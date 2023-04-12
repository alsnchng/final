//// CANVAS
const canvas = document.querySelector("#canvasOne");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");


var oneDegree = 2*Math.PI/360;
var allCircles = [];
var o1 = {
    x: canvas.width,
    y: canvas.height,
    r: 5,
    c: 50,
    a: 1
}

//// MOUSE INTERACTION BETWEEN CONSTELLATION/STARS
let mouse = {
    x: 0,
    y: 0
}
window.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})
//// CLICK ON CANVAS TO INSERT MORE STARS TO COORDINATES
document.querySelector("#canvasOne").onclick = onclick

function onclick(event){
    console.log("click");
    o1.x = event.offsetX;
    o1.y = event.offsetY;
    circle(o1);
}


//// BUBLE CORD
let bubleCord = [];
let balls = 50;

for(let i=0; i<balls; i++){
    bubleCord.push({
        x: Math.random()*innerWidth,
        y: Math.random()*innerHeight,
        radius: Math.floor(Math.random()*5),
        dx: (Math.random()-0.5)*2,
        dy: (Math.random()-0.5)*2,
    });
}

//// DRAW BUBLE
function draw(){
    for(let i=0; i<bubleCord.length; i++){
        let buble = bubleCord[i];
        c.beginPath();
        c.arc(buble.x, buble.y, buble.radius, 5, 0, Math.PI*2, false);
        c.stroke();
        c.fillStyle = "white";
        c.fill();
    }
    //// DRAW LINE
    c.beginPath();
    for(let i=0; i<bubleCord.length; i++){
        let l1 = bubleCord[i];
        c.moveTo(l1.x, l1.y);
    //// MOUSE INTERACTION BETWEEN LINES
        if(distance(mouse, l1) < 70){
            c.lineTo(mouse.x, mouse.y);
        }

        for(let j=0; j<bubleCord.length; j++){
            let l2 = bubleCord[j];
            if(distance(l1,l2) < 10){
            c.lineTo(l2.x, l2.y);
            }
        }
    }
    c.lineWidth = "0.10";
    c.strokeStyle = "white";
    c.stroke();
}
draw();

function circle(o1){
    c.beginPath();
    c.arc(o1.x, o1.y, o1.r, 0, 2*Math.PI);
    c.fillStyle = "white"
    c.fill();
}


function distance(point1, point2){
    let dx = 0;
    let dy = 0;

    dx = point2.x - point1.x;
    dx = dx*dx;
    dy = point2.y - point2.y;
    dy = dy*dy

    return Math.sqrt(dx+dy);
}

function update(){
    for(let i=0; i<bubleCord.length; i++){
        let s = bubleCord[i];
        if(s.x < 0 || s.x > canvas.width){
            s.dx = -s.dx;
        }
        if(s.y < 0 || s.y > canvas.height){
            s.dy = -s.dy;
        }
        s.x += s.dx;
        s.y += s.dy;
    }

    draw();
}

function animationLoop(){
    c.clearRect(0,0,canvas.width,canvas.height);
    update();
    draw();
    circle(o1);

    requestAnimationFrame(animationLoop);
}
animationLoop();


function randn(range){
    var r = Math.random()*range-range/2;
    return r
}




//// PARTICLE FUNCTION ONLY RUN IF SETUPCANVAS() HASN'T BEEN CALLED

// function setUpCanvas(){
//     canvas = document.querySelector("#myCanvas");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     canvas.style.border = "3px solid black";
//     ctx = canvas.getContext("2d");
// }
// setUpCanvas();