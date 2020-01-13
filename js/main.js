/***************** Variables *****************/
var playerWidth = 150;
var playerHeight = 150;
var player_MaxSpeed = 10;
var lastTime = 0;
var heroImageSrc = "img/ship.png";
var hero;


/***************** Constants *****************/
const game_Width = 1024;
const game_height = 400;
const canvas_Width = 1024;
const canvas_height = 600;

/*************** create canvas *************/

var canvas = document.getElementById("myCanvas");
canvas.width = canvas_Width;
canvas.height = canvas_height;
var context = canvas.getContext("2d");// call all of the rendering APIs

/***************** man functions ************/

//init the game
function init() {
    hero = new player(heroImageSrc, game_Width, game_height);
    hero.draw();
    new inputHandler(hero);
}

// game loop
function gameLoop(timeStamp) {
    //get how many milliseconds have passed since the last interval
    var deltaT = timeStamp - lastTime;
    lastTime = timeStamp;
    hero.update(deltaT);
    hero.clear();
    hero.draw(context);
    // Request to do this again
    requestAnimationFrame(gameLoop);
}

/**************** calling functions  ***********/
init();
gameLoop();
