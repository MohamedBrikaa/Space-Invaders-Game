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

//function to move hero bullets
function moveHeroBullets() {
    if(! heroBullets.length) return;
        for (let index = 0; index < heroBullets.length; index++) {
            heroBullets[index].clear();
            heroBullets[index].moveUp(5);             
            heroBullets[index].draw(); 
            if( heroBullets[index].y<0) {
                heroBullets[index].clear();
                heroBullets.splice(index,1);
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
function creatEnemyArray(enemyArray,imgSrc,enemylivesNum) {
    steps = Math.floor((canvas_Width - ((enemies.enemyNum / enemies.numberOfLines) * enemies.enemyWidth + 9 * enemies.horEnemiesMargin)) / enemies.enemyMoveStep);
    var yPos=0;
    var xPos=0;
    for (let index = 0; index < enemyNum; index++) {        
        if(index%10 == 0) 
        {            
            yPos+=enemyHeight+verEnemiesMargin;
            xPos=0;
        }
        enemyArray[index]= new enemy(imgSrc,xPos,yPos,enemyWidth,enemyHeight,enemylivesNum);
        xPos+=enemyWidth+horEnemiesMargin;
        enemyArray[index].draw();
    } 
}

//functions to move enemies
function moveEnemies() {
    if(right){
        //move right
        for (let index = 0; index < enemyArray.length; index++) {            
            enemyArray[index].clear();
            enemyArray[index].moveRight(enemyMoveStep); 
            enemyArray[index].draw();
        } 
        count++;
        if(count==steps) 
        {
            right=false; 
        }
    }else{        
        //move left
        for (let index = 0; index < enemyArray.length; index++) {
            enemyArray[index].clear();
            enemyArray[index].moveLeft(enemyMoveStep); 
            enemyArray[index].draw();
        }  
        count--; 
         if(count==0) 
         {
            right=true;
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
                        enemyArray[j].img.src = "img/200w_d.gif";
                        var enemy_timeOut = setTimeout(function () {
                            KilledEnemy = j;
                            enemyArray[KilledEnemy].clear();
                            enemyArray.splice(KilledEnemy, 1);
                            clearInterval(enemy_timeOut);
                        },30)
                        totalScore++;
                        score++;
                    } else {
                        enemyArray[j].lives -= 1
                    }
                }
            }
        }
    }
}
