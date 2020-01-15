/***************** Variables *****************/
var playerWidth = 150;
var playerHeight = 150;
var player_MaxSpeed = 10;
var lastTime = 0;
var heroImageSrc = "img/ship.png";
var hero;
var spacePressed=false;
var heroBullets = [];
var enemyBullets = [];
var enemyArray = [];
var steps;

var progress={
    lvl:1,
    stage:1
}
var enemyImgSrcArray=["",""]
var enemies={
    imgSrc:enemyImgSrcArray[progress.lvl],
    enemyMoveStep:3,
    enemyWidth:40,
    enemyHeight:30,
    enemylivesNum:0,
    enemyNum:1,
    numberOfLines:1,
    verEnemiesMargin:10,
    horEnemiesMargin:20
}

/***************** Constants *****************/
const game_Width = 1024;
const game_height = 400;
const canvas_Width = 1024;
const canvas_height = 600;
const bulletWidth=8;
const bulletHeight=40;
const bulletStep=5;
/*************** create canvas *************/

var canvas = document.getElementById("myCanvas");
canvas.width = canvas_Width;
canvas.height = canvas_height;
var context = canvas.getContext("2d"); // call all of the rendering APIs

/***************** main functions ************/

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
    moveHeroBullets();
    moveEnemyBullets();
    // Request to do this again
    requestAnimationFrame(gameLoop);
    
}

/**************** calling functions  ***********/
init();
gameLoop();
