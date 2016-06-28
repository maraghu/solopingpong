// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
		function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		};
})();

window.cancelRequestAnimFrame = ( function() {
	return  window.cancelAnimationFrame          ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame    ||
			window.oCancelRequestAnimationFrame      ||
			window.msCancelRequestAnimationFrame     ||
		clearTimeout;
} )();

//DO NOT TOUCH CODE ABOVE 

//console.log('Holla');

//STEP 1 .. MAR .. Create a game canvas and track mouse position 
var gameCanvas = document.getElementById("canvas");
// Store HTML5 canvas tag into a javascript variable 
var ctx = gameCanvas.getContext("2d"); // Create context 2d
var W = window.innerWidth;
var H = window.innerHeight;
var mouseobj = {};

console.log('browswer width is currently: ' + W);
console.log('browswer height is currently: ' + H);

gameCanvas.width = W; 
gameCanvas.height = H; 


function paintCanvas(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);
}
paintCanvas();



function trackPosition(evt) {
    mouseobj.x = evt.pageX; 
    mouseobj.y = evt.pageY; 
    console.log("cursor x is :" + mouseobj.x + "cursor y is :" + mouseobj.y); 
}
gameCanvas.addEventListener("mousemove", trackPosition, true); 










