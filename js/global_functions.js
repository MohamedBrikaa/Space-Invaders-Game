/*****************Used Functions*****************/

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