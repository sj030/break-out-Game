"use strict";

class Ball {
    constructor(imagesrc) {
        this.x = 400;
        this.y = 500;
        this.width = 40;
        this.height = 40;
        this.xdir = 5;
        this.ydir = 5;
        this.ballImage = new Image();
        this.ballImage.src = imagesrc;
    }

    run() {
        this.x += this.xdir;
        if (this.x < 0) {
            this.x = 0;
            this.xdir = -this.xdir;
        }
        if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
            this.xdir = -this.xdir;
        }
        this.y += this.ydir;
        if (this.y < 0) {
            this.y = 0;
            this.ydir = -this.ydir;
        }
        if (this.y > canvas.height - this.height) {
            this.ydir = 0;
            this.xdir = 0;
            // this.y = canvas.height - this.height;
            // this.ydir = -this.ydir;
        }
        this.draw();
    }

    draw() {
        context.drawImage(
            this.ballImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
