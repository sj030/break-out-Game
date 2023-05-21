"use strict";
class Paddle {
    constructor(width, height) {
        this.height = height;
        this.width = width;
    }

    init() {
        this.width = 162;
        this.height = 57;
        this.paddleX = (canvas.width - this.width) / 2;
        this.img = new Image();
        this.paddleimgarr = [
            "../webP/images/kirby_origin.png",
            "../webP/images/fire_origin.png",
            "../webP/images/ice_origin.png",
            "../webP/images/stone_origin.png",
        ];
        this.imgarridx = 0;
        //스테이지 변경이 되면 imgarridx가 바뀌어야 함.
        this.img.src = this.paddleimgarr[this.imgarridx];
    }
    draw() {
        context.drawImage(
            this.img,
            this.paddleX,
            canvas.height - this.height,
            this.width,
            this.height
        );
    }
    drawPaddle() {
        context.drawImage(img, this.paddleX, canvas.height - this.height);
    }

    getWidth() {
        return this.width;
    }

    getPaddleX() {
        return this.paddleX;
    }

    setPaddleX(x) {
        this.paddleX = x;
    }
}

/** mouseMoveHandler(e) : 마우스 이동 Event Handler */
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    relativeX = Math.min(
        Math.max(paddle.width / 2, relativeX),
        canvas.width - paddle.width / 2
    );
    paddle.setPaddleX(relativeX - paddle.width / 2);
}