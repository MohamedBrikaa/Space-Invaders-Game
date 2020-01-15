/*****************Used Classes*****************/

//class hero 
class player {
    constructor(heroImgSrc, game_Width, game_height) {
        this.heroImage = new Image();
        this.heroImage.src = heroImgSrc
        this.game_Width = game_Width;
        this.width = playerWidth;
        this.height = playerHeight;
        this.maxspeed = player_MaxSpeed;
        this.speed = 0     //current speed

        this.position = {
            x: game_Width / 2 - this.width / 2,
            y: game_height - 10
        };
    }

    draw() {
        context.drawImage(this.heroImage, this.position.x, this.position.y, this.width, this.height);
    }

    clear() {
        context.clearRect(this.position.x - 10, this.position.y, this.width + 20, this.height)
    }
    // update every 5 pixels per time passed 
    update(deltaTime) {
        if (!deltaTime) return;
        this.position.x += this.speed;
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > game_Width) {
            this.position.x = this.game_Width - this.width;
        }
    }
    // move left 
    moveleft() { this.speed = -this.maxspeed; }
    // move right
    moveRight() { this.speed = this.maxspeed; }
    //  stop hero
    stop() { this.speed = 0; }
    //fire 
    fire(){
        console.log("n");
        heroBullets.push(new Bullet("img/laser.png",this.position.x+(this.width/2)-5, this.position.y-35 ))
        console.log(heroBullets);
    }
}

// user input handler 
class inputHandler {
    constructor(hero) {
        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case 37:
                    hero.moveleft();
                    break;
                case 39:
                    hero.moveRight();
                    break;
                case 32:                 
                    if (spacePressed) {
                        hero.fire();
                        spacePressed=false;
                    }
                    break;
            }
        })

        document.addEventListener('keyup', event => {
            switch (event.keyCode) {
                case 37:
                    if (hero.speed < 0) {
                        hero.stop();
                    }
                    break;
                case 39:
                    if (hero.speed > 0) {
                        hero.stop();
                    }
                    break;
                case 32:   
                    spacePressed = true;
                    break;
            }
        })

    }
}

//class bullet
class Bullet {
    constructor( imgSrc,x, y){
        this.image = new Image();
        this.image.src = imgSrc;
        this.x=x;
        this.y=y;
        this.speed = {x:0, y:2};
        this.width = bulletWidth;
        this.height = bulletHeight;
    }
    draw(){
        context.drawImage(this.image, this.x, this.y, this.width, this.height );
    }
    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
    moveUp(speed){
        this.y -= speed;
    }
    moveDown(speed){
        this.y += speed;
    }
    clear(){
        context.clearRect(this.x, this.y,this.width,this.height)
    }
}