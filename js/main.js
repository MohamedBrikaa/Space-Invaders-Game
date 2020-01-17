/***************** Constants *****************/
const game_Width = 1024;
const game_height = 400;
const canvas_Width = 1024;
const canvas_height = 600;
const bulletWidth=8;
const bulletHeight=40;
const bulletStep=5;
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

var count = 0;
var fireSpeed = 0;
var score;
var totalScore = 0;
var lives = 50;
var enemyArray = [];
var steps;
var gameON= true;
var enemyImageSrc = "img/enemy.png";
var right = true;

var progress={
    lvl:1,
    stage:1
}
var enemyImgSrcArray = ["", "img/BigChickenCIU.png","img/BigChicken.png"]
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
    score = 0;
    if (progress.lvl == 1 && progress.stage == 1) {
        window.addEventListener('load', resize, false);
        window.addEventListener('resize', resize, false);
        hero = new player(heroImageSrc, game_Width, game_height);
        hero.draw();
        new inputHandler(hero);
        creatEnemyArray();
    }
    else if(progress.lvl<4){
        count = 0;
        right = true;
        enemies.imgSrc=enemyImgSrcArray[progress.stage]
        enemies.enemylivesNum= (progress.lvl-1);
        enemies.numberOfLines =  progress.stage*2;
        enemies.enemyNum = enemies.numberOfLines*10;
        creatEnemyArray();
    }else{
        document.getElementsByClassName("progress")[0].innerHTML = `<h1>Congratulation !!</h1><h1>Total score is : ${totalScore}</h1>`
        document.getElementsByClassName("progress")[0].style.background = "#4caf5063";
        document.getElementsByClassName("progress")[0].style.display = "block";
    }
}

// game loop
function gameLoop(timeStamp) {
    //get how many milliseconds have passed since the last interval
    var deltaT = timeStamp - lastTime;
    moveEnemies();
    if (fireSpeed == 20) {
        enemyFire();
        fireSpeed = 0;
    }
    else {
        fireSpeed++;
    }
    moveEnemyBullets();
    moveHeroBullets();
    hero.update(deltaT);
    hero.clear();
    hero.draw();
    if (!enemyArray.length) {
        nextStage();
    }
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
