var gameDiv;
var gameInterval;

var newBell;
var bellY = 0;
var bellSpeed = 5;


// When the page structure (the DOM) is loaded...
document.addEventListener("DOMContentLoaded", function(event)
{
    // Get a reference to that black area <div>
    gameDiv = document.getElementById("game-area");
    
    // Create a new <div> element that's going to be our new falling bell
    newBell = createBellElement(Math.random()*350, bellY);
    // and
    gameDiv.appendChild(newBell);
    
    // Run gameLoop() 40 times per second
    gameInterval = setInterval(gameLoop, 25);
});

var createBellElement = function(x,y) {
    var element = document.createElement("div");
    element.className = "bell";
    element.style.left = x + "px";
    element.style.top = y + "px";
    return element;
};

var gameLoop = function() {
    bellY += bellSpeed;
    if (bellY > 400){
        bellY = -50;
        newBell.style.left = Math.random()*350 + "px";
    }
    newBell.style.top = bellY + "px";
};