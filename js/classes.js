/*****************Used Classes*****************/
class shape{
    constructor(imgSrc, x, y, width, height) {
        this.img = new Image();
        this.img.src = imgSrc;
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    draw(){
        console.log(this.width);
        
        context.drawImage(this.img, this.x, this.y, this.width, this.height );
    }
    clear(){
        context.clearRect(this.x, this.y,this.width,this.height)
    }

}
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
            y: game_height +90
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
        heroBullets.push(new Bullet("img/laser.png",this.position.x+(this.width/2)-5, this.position.y-8 ,bulletWidth,bulletHeight))
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
                        main_sound();// background cover
                        bulletSound();//bullet sound
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
class Bullet extends shape{
    constructor( imgSrc,x, y,bulletWidth,bulletHeight){        
        super(imgSrc, x, y, bulletWidth, bulletHeight);
        this.speed = {x:0, y:2};
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
}
//Enemy class
class enemy extends shape{
    constructor(imgSrc, x, y, width, height,lives) {
        super(imgSrc, x, y, width, height);
        this.lives=lives
    }
    moveRight(speed){
        this.x += speed;
    }
    moveLeft(speed){
        this.x -=speed;
    }

}