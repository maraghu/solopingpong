// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout;
})();

// DO NOT TOUCH CODE ABOVE


// Step 01 .. jwt .. Create game canvas and track mouse position
var gameCanvas = document.getElementById('canvas'); // Store HTML5 canvas tag into a JS variable

var ctx = gameCanvas.getContext('2d'); // Create context 2D

var W = window.innerWidth;
var H = window.innerHeight;
var mouseObj = {};

// console.log('browser width is currently:' + W);
// console.log('browser height is currently:' + H);

gameCanvas.width = W;
gameCanvas.height = H;


// Step 02 .. jwt .. Clear page canvas by covering it in black.

function paintCanvas() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
}

paintCanvas();

function trackPosition(evt) {
    mouseObj.x = evt.pageX;
    mouseObj.y = evt.pageY;
    // console.log("cursor x is : " + mouseObj.x + "cursor y is : " + mouseObj.y);
}

gameCanvas.addEventListener("mousemove", trackPosition, true);


// Step 03 .. jwt .. Place a ball on the canvas
var ball = {}; // Ball Object
ball = {
    x: 50
    , y: 50
    , r: 5
    , c: "#fff"
    , vx: 4
    , vy: 8
    , draw: function () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
    }
}

ball.draw();


// Step 04 .. jwt .. Place a start button on canvas
var startBtn = {}; // Start button object
startBtn = {
    w: 100
    , h: 50
    , x: W / 2 - 50
    , y: H / 2 - 25,

    draw: function () {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.fillText("START", W/2, H/2);
    }
}

startBtn.draw();

// Step 05 .. jwt .. Place score and points on canvas
var points = 0; // game points
function paintScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "18px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("SCORE: " + points, 20, 20);
}
paintScore();

//STEP 6 . . MR . . PLACE PADDLES (TOP AND BOTTOM) ON CANVAS 

function paddlePosition(TB) {

    this.w = 150;
    this.h = 5;

    this.x = W / 2 - this.w / 2;

    if (TB == "top") {

        this.y = 0;
    } else {
        this.y = H - this.h;

    }
}

var paddlesArray = []; //PADDLES ARRAY 
paddlesArray.push(new paddlePosition("top"));
paddlesArray.push(new paddlePosition("bottom"));

//console.log("top paddle y is: " + paddlesArray[0].y);
//console.log("bottom paddle y is: " + paddlesArray[1].y);

function paintPaddles() {
    for (var lp = 0; lp < paddlesArray.length; lp++) {
        p = paddlesArray[lp];

        ctx.fillStyle = "#fff";
        ctx.fillRect(p.x, p.y, p.w, p.h);
    }
}

paintPaddles();

//Step 7 . . MR . . DETECT WHEN THE USER CLICKS ON THE SCREEN 

gameCanvas.addEventListener("mousedown", btnClick, true);

function btnClick(evt) {
    var mx = evt.pageX;
    var my = evt.pageY;


    //USER CLICKED ON START BUTTON  
    if (mx >= startBtn.x && mx <= startBtn.x + startBtn.w) {
        if (my >= startBtn.y && my <= startBtn.y + startBtn.h) {
            //            console.log ("Start button clicked");
            startBtn = {};

            // start game animation loop 
            animloop();
        }
    }
        if (flagGameOver == 1){
        if (mx >= restartBtn.x && mx <= restartBtn.x + restartBtn.w) {
        if (my >= restartBtn.y && my <= restartBtn.y + restartBtn.h) {
            //  restart my game 
            points = 0;
            ball.x = 20;
            ball.y = 20;
            ball.vx = 4;
            ball.vy = 8;
            
            
            flagGameOver = 0;
            // start game animation loop 
            animloop();
            }
        }
    
    }
}


//Function for running the whole game animation 
var init; //variable to initialize animation 
function animloop() {
    init = requestAnimFrame(animloop);
    refreshCanvasFun();
}

// STEP 8 . . MR . . DRAW EVERYTHING ON CANVAS OVER AND OVER AGAIN 
function refreshCanvasFun() {
    paintCanvas();
    paintPaddles();
    ball.draw();
    paintScore();
    update();
}

function update() {

    //move the paddles, track the mouse

    for (var lp = 0; lp < paddlesArray.length; lp++) {
        p = paddlesArray[lp];
        p.x = mouseObj.x - p.w / 2;

    }

    //move the ball 
    ball.x += ball.vx;
    ball.y += ball.vy;
    //check for ball paddle collision 
    check4collision();
}

function check4collision() {

    var pTop = paddlesArray[0];
    var pBot = paddlesArray[1];

    if (collides(ball, pTop)) {
        collideAction(ball, pTop);

    } else if (collides(ball, pBot)) {
        collideAction(ball, pBot);
    } else {
        //ball when off the top or bottom of screen 

        if (ball.y + ball.r > H) {

            // game over

            gameOver();


        } else if (ball.y < 0) {
            //game over 
              gameOver();
        }

        //ball hits the side of the screen
        if (ball.x + ball.r > W) {

            ball.vx = -ball.vx;
            ball.x = W - ball.r;
        } else if (ball.x - ball.r < 0) {
            ball.vx = -ball.vx;
            ball.x = ball.r;

        }

    }

    //sparkles
    if (flagCollision == 1){
        
        for(var k = 0; k < particleCount; k++){
            particles.push(new createParticles(particlePos.x, particlePos.y, particleDir));
        }
    }
//     EMIT PARTICLES 
    emitParticles();
    //reset flagCollison
    flagCollision = 0;
}

function createParticles(x, y, d){
    this.x = x || 0; 
    this.y = y || 0;
    
    this.radius = 2;
    
    this.vx = -1.5 + Math.random()*3;
    this.vy = d * Math.random()*1.5; 
}

function emitParticles(){
    for(var j = 0; j < particles.length; j++){
        par = particles [j];
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        if (par.radius > 0 ){
            ctx.arc(par.x, par.y, par.radius, 0, Math.PI*2, false);
        }
        ctx.fill();
        
        par.x += par.vx;
        par.y += par.vy;
        
        //reduce rad of particle 
        par.radius = Math.max(par.radius - 0.05, 0.0);
    }
}

var paddleHit; // which paddle was hit 0=top, 1=bottom 
function collides(b, p) {
    if (b.x + b.r >= p.x && b.x - b.r <= p.x + p.w) {
        if (b.y >= (p.y - p.h) && p.y > 0) {
            paddleHit = 0;
            return true;
        } else if (b.y <= p.h && p.y === 0) {
            paddleHit = 1;
            return true;
        } else {
            return false;
        }
    }
}


var collisionSnd = document.getElementById("collide")

function collideAction(b, p) {

    //    console.log ("sound and then bounce");
    if (collisionSnd) {

    }
    collisionSnd.play();

    //     reverse ball y velocity 
    ball.vy = -ball.vy;
    
    if(paddleHit == 0){
        //ball hit top paddle
    ball.y = p.y - p.h;
        
    particlePos.y = ball.y + ball.r;
    particleDir = -1; 
        
    }else if (paddleHit ==1){
        // increase the score by 1
    particlePos.y = ball.y - ball.r;
    particleDir = 1; 

        ball.y = p.h + ball.r;
    
    }
        
        
    points++;
    increaseSpd();
    //SPARKLES 
    particlePos.x = ball.x;
    flagCollision =1;  
}

//SPARKLES
var flagCollision = 0 ; // flag var for when ball collides with paddle for particles 
var particles = []; //array for particles
var particlePos = {}; // object for to contain the position of collision 
var particleDir = 1; // var to control the directon of sparks
var particleCount = 50; // number of sparks when the ball hits the paddle 


function increaseSpd(){
    
    //increase ball speed after every 4 points 
    if(points % 4 === 0 ){
        if(Math.abs<ball.vx < 15){
        ball.vx += (ball.vx < 0 ) ? -1 : 1; 
        ball.vx += (ball.vx < 0 ) ? -2 : 2; 
        }
    }
}

var flagGameOver =0;
//Function to run when the game is over
function gameOver(){
    
    //display final score 
    
    
    
    ctx.fillStyle = "red";
    ctx.font = "20px Arial, san-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over - You Scored " + points + " points!", W/2, H/2 + 25);
//    ctx.fillText("game over", W / 2, H / 2 + 25);
//    ctx.fillText("game over");
    
    
    //display replay button 
    
    restartBtn.draw();
    
    //set the game over flag
    flagGameOver = 1; 
    
    
    //stop the animation 
    cancelRequestAnimFrame(init);
}

var restartBtn = {}; // Start button object
restartBtn = {
    w: 100,
     h: 50,
     x: W / 2 - 50,
     y: H / 2 - 50,

    draw: function () {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Replay?",W/2, H/2 - 25);
        
    }
}


















