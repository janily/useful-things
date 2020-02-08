import { detec } from './Detection.js'

export default class Ball {
    
    constructor(game) {
        this.image = document.getElementById("ball");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.size = 16;

        this.reset();
    }

    reset() {
        this.position = {x:10,y:200};

        this.speed = {x:4,y:-2};
    }

    draw(ctx) {
        ctx.drawImage(this.image,this.position.x,this.position.y,this.size,this.size);
    }

    update(deltaTime) {

        // console.log(this.game.paddle.position.x)
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //

        if(this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }



        if(this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        if(this.position.y + this.size > this.gameHeight ) {
            this.game.lives--;
            this.reset();
        }

       

        if(detec(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }

}