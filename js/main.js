/***************** Constants *****************/
const game_Width = 1024;
const game_height = 400;
const canvas_Width = 1024;
const canvas_height = 600;
const bulletWidth=8;
const bulletHeight=40;
const bulletStep=5;
const enemyWidth=40;
const enemyHeight=30;
const enemylivesNum=1
const enemyNum=40
const verEnemiesMargin=10;
const horEnemiesMargin=20;

/***************** Variables *****************/
var playerWidth = 150;
var playerHeight = 150;
var player_MaxSpeed = 10;
var lastTime = 0;
var heroImageSrc = localStorage.getItem("src"); //get src for choosen hero
var hero;
var spacePressed=false;
var heroBullets = [];
var enemyBullets = [];


var enemyArray = [];
var steps;
var gameON= true;
var enemyImageSrc = "img/enemy.png";
var steps=Math.floor( (canvas_Width-((enemyNum/4)*enemyWidth + 9*horEnemiesMargin)) /enemyMoveStep);


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


/*************** create canvas *************/

var canvas = document.getElementById("myCanvas");
canvas.width = canvas_Width;
canvas.height = canvas_height;
var context = canvas.getContext("2d"); // call all of the rendering APIs

resize(); //resize call function

/***************** main functions ************/

//init the game
function init() {
    hero = new player(heroImageSrc, game_Width, game_height);
    hero.draw();
    new inputHandler(hero);
    creatEnemyArray(enemyArray,enemyImageSrc);
}

// game loop
function gameLoop(timeStamp) {
    //get how many milliseconds have passed since the last interval
    var deltaT = timeStamp - lastTime;
    lastTime = timeStamp;
    hero.update(deltaT);
    hero.clear();
    hero.draw(context);
    moveEnemies();
    moveHeroBullets();
    moveEnemyBullets();
    // Request to do this again
    requestAnimationFrame(gameLoop);
    
}

/**************** calling functions  ***********/
init();
gameLoop();



/**************** Menu Buttons  ***********/

//pause/resume button
var $pauseBtn = document.querySelector("#pauseBtn");
$pauseBtn.addEventListener('click', function(){
    if ( $pauseBtn.innerHTML === "Pause" ){
        $pauseBtn.innerHTML = "Resume";
        gameON = false;
    }
    else{
        $pauseBtn.innerHTML = "Pause";
        gameON = true;
        gameLoop();
    }
});

//exit button
var $exitBtn = document.querySelector("#exitBtn");
$exitBtn.addEventListener("click", function(){ 
    window.close();
});

//go to button
var $homeBtn = document.querySelector("#homeBtn");
$homeBtn.addEventListener("click", function(){ 
    window.location.href = "index.html";
});
