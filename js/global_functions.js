/*****************Used Functions*****************/

/*****************Resize function*********/
function resize() {
    // Our canvas must cover full height of screen regardless of the resolution
    var height = window.innerHeight;
    // So we need to calculate the proper scaled widththat should work well with every resolution
    var ratio = canvas.width / canvas.height;
    var width = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height - 25 + 'px';
}
/*******************voice functions*********/
function byeBye() {
    byebye.play();
}
function killSound() {
    killHim.play();
}
function heroFail() {
    hero_died.play();
}
function stopFailvoice() {
    hero_died.pause();
}
function GameOverSound() {
    game_overSound.play();
}
function bulletSound() {
    heroBulletSound.play();
}
function main_sound() {
    mainSound.play();
}
function checken_sound() {
    checkenKak.play();
}

//function to move hero bullets
function moveHeroBullets() {
    if (!heroBullets.length) return;
    for (let index = 0; index < heroBullets.length; index++) {
        heroBullets[index].clear();
        heroBullets[index].moveUp(5);
        heroBullets[index].draw();
        if (heroBullets[index].y < 0) {
            heroBullets[index].clear();
            heroBullets.splice(index, 1);
        }
    }
    //function to detect collision with enemy
    collisoinDetection();
}

//function to move enemy bullets
function moveEnemyBullets() {
    if (!enemyBullets.length) return;
    for (let index = 0; index < enemyBullets.length; index++) {
        enemyBullets[index].clear();
        enemyBullets[index].moveDown(bulletStep);
        enemyBullets[index].draw();
        if ((enemyBullets[index].y + enemyBullets[index].height - 5) >= hero.position.y) {
            if ((enemyBullets[index].x > hero.position.x) && (enemyBullets[index].x < hero.position.x + hero.width)) {
                killHero(index)
            }
        }
        if (enemyBullets[index] && enemyBullets[index].y + enemyBullets[index].height > hero.position.y + hero.height) {
            enemyBullets[index].clear();
            enemyBullets.splice(index, 1);
        }
    }
}

//fuction to create enemy array
function creatEnemyArray() {
    steps = Math.floor((canvas_Width - ((enemies.enemyNum / enemies.numberOfLines) * enemies.enemyWidth + 9 * enemies.horEnemiesMargin)) / enemies.enemyMoveStep);
    var yPos = 0;
    var xPos = 0;
    for (let index = 0; index < enemies.enemyNum; index++) {
        if (index % (enemies.enemyNum / enemies.numberOfLines) == 0 && index != 0) {
            yPos += enemies.enemyHeight + enemies.verEnemiesMargin;
            xPos = 0;
        }
        enemyArray[index] = new enemy(enemies.imgSrc, xPos, yPos, enemies.enemyWidth, enemies.enemyHeight, enemies.enemylivesNum);
        xPos += enemies.enemyWidth + enemies.horEnemiesMargin;
        enemyArray[index].draw();
    }
}

//functions to move enemies
function moveEnemies() {
    if (right) {
        //move right
        for (let index = 0; index < enemyArray.length; index++) {
            enemyArray[index].clear();
            enemyArray[index].moveRight(enemies.enemyMoveStep);
            enemyArray[index].draw();
        }
        count++;
        if (count == steps) {
            right = false;
        }
    } else {
        //move left
        for (let index = 0; index < enemyArray.length; index++) {
            enemyArray[index].clear();
            enemyArray[index].moveLeft(enemies.enemyMoveStep);
            enemyArray[index].draw();
        }
        count--;
        if (count == 0) {
            right = true;
        }
    }

}

//function to detect when a hero bullet kill an enemy
function collisoinDetection() {
    var KilledEnemy = [];
    var bulletExist;
    for (let index = 0; index < heroBullets.length; index++) {
        bulletExist = true;
        if (heroBullets[index].y <= (enemies.numberOfLines * enemies.enemyHeight) + (enemies.numberOfLines - 1) * enemies.verEnemiesMargin) {
            for (let j = 0; j < enemyArray.length && bulletExist; j++) {
                if (
                    heroBullets[index].y - (enemyArray[j].y + enemyArray[j].height) <= 5 &&
                    heroBullets[index].x > enemyArray[j].x &&
                    heroBullets[index].x < (enemyArray[j].x + enemyArray[j].width)
                ) {
                    //remove & hide enemy and bullet                                                
                    heroBullets[index].clear();
                    heroBullets.splice(index, 1);
                    bulletExist = false;

                    if (enemyArray[j].lives == 0) {
                        enemyArray[j].img.src = "img/fried-chicken.png";
                        var enemy_timeOut = setTimeout(function () {
                            KilledEnemy = j;
                            enemyArray[KilledEnemy].clear();
                            enemyArray.splice(KilledEnemy, 1);
                            clearInterval(enemy_timeOut);
                        }, 10)
                        totalScore++;
                        score++;
                    } else {
                        enemyArray[j].lives -= 1
                    }
                }
            }
        }
    }
    $updateScore.innerHTML = totalScore;
}

//function to specify game levels
function nextStage() {
    //stage finished
    console.log(progress.stage);
    progress.stage++;
    if (progress.stage > 2) {
        progress.lvl++;
        progress.stage = 1;
        killSound();//kill him comic sound 
    }
    $updateMedal.src = medalsImgSrcArray[progress.lvl - 1]
    enemyBullets.splice(0, enemyBullets.length)
    heroBullets.splice(0, heroBullets.length)
    context.clearRect(0, 0, canvas_Width, canvas_height)
    document.getElementsByClassName("progress")[0].innerHTML = `<h1>Level: ${progress.lvl}</h1><h1>Stage: ${progress.stage}</h1>`
    document.getElementsByClassName("progress")[0].style.background = "#4caf5063";
    document.getElementsByClassName("progress")[0].style.display = "block";
    $updateLevel.innerHTML = progress.lvl;
    var lvlTimeOut = setTimeout(function () {
        document.getElementsByClassName("progress")[0].style.display = "none";
        clearInterval(lvlTimeOut);
    }, 1000)
    init()
}

//function destory hero when it is hit by any of invaders missiles 
//when a hit is detected, the hero image blinks and number of lives decreased by 1
function killHero(bulletIndex) {
    var progressDiv = document.getElementsByClassName("progress")[0];
    if (lives) lives--;
    enemyBullets.splice(0, enemyBullets.length)
    heroBullets.splice(0, heroBullets.length)
    context.clearRect(0, 0, canvas_Width, canvas_height)
    heroFail()//hero killed sound
    progressDiv.style.background = "#ce222287";
    progressDiv.style.display = "block";
    if (lives === 0) {
        byeBye();//byebye sound
        canvas.remove();
        stopFailvoice();
        GameOverSound();//Game over sound
        progressDiv.innerHTML = `<h1>Game Over </h1><h1>Total Score: ${totalScore}</h1>`
    } else {
        progressDiv.innerHTML = `<h1>you have been killed</h1><h1>Lives: ${lives}</h1>`
        hero.heroImage.src = "img/fire.png";
        var killedTimeOut = setTimeout(function () {
            hero.heroImage.src = heroImageSrc;
            progressDiv.style.display = "none";
            clearInterval(killedTimeOut);
        }, 200)
    }
    $updatelives.innerHTML = lives;
}
//function to fire after player press
function enemyFire() {
    if (enemyArray.length) {
        var indexOfFiredEnemy = Math.floor((Math.random() * enemyArray.length) + 0);
        if (enemyArray[indexOfFiredEnemy].img.src != "img/fried-chicken.png") {
            var x = enemyArray[indexOfFiredEnemy].x
            var width = enemyArray[indexOfFiredEnemy].width
            var y = enemyArray[indexOfFiredEnemy].y
            var height = enemyArray[indexOfFiredEnemy].height
            enemyBullets.push(new Bullet("img/egg.png", x + (width / 2), y + height,bulletWidth,bulletHeight));
        }
    }
}