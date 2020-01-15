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