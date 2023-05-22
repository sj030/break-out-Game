"use strict";

/** function collisionDetection(paddle, ball) : 충돌 감지 함수
 * paddle를 멈춰 있는 물체, ball를 움직이는 물체로 가정
 */

let bounceAble = true;


var ballx = ball.x + (ball.width/2);

function collisionDetectionPaddle(ball, paddle) {
    if (!bounceAble) {
        bounceAble =
            ball.y + ball.height < canvas.height - paddle.img.height - 10;
        return;
    }

    // y축 방향 튕김
    if (
        ball.x + ball.width + ball.xdir > paddle.paddleX &&
        ball.x + ball.xdir < paddle.paddleX + paddle.img.width &&
        ball.y + ball.height > canvas.height - paddle.img.height &&
        ball.y < canvas.height
    ) {

        
        if(ball.x+20 < paddle.paddleX+81){
            var diff = ((paddle.paddleX+81) - (ball.x+20))/4;
            ball.xdir = -diff;
        }

        if(ball.x+20 > paddle.paddleX+81){
            var diff = ((ball.x+20) - (paddle.paddleX+81))/4;
            ball.xdir = diff;
        }
        ball.ydir *= -1;
        bounceAble = false;
    }
    // x축 방향 튕김 (사실상 필요없을 듯)
    // if (
    //     ball.x + ball.width > paddle.x &&
    //     ball.x < paddle.x + paddle.width &&
    //     ball.y + ball.height + ball.ydir > paddle.y &&
    //     ball.y + ball.ydir < paddle.y + paddle.height
    // ) {
    //     ball.xdir *= -1;
    //     bounceAble = false;
    // }

}

function collisionDetectionBrick(ball) {
    for (var i = 0; i < stage.currentBrickComposition.length; i++) {
        for (var j = 0; j < stage.currentBrickComposition[i].length; j++) {
            var brick = stage.currentBrickComposition[i][j];
            if (brick == null || !brick.getLife()) continue;

            // y축 방향 튕김
            if (
                ball.x + ball.width + ball.xdir > brick.brickX &&
                ball.x + ball.xdir < brick.brickX + brick.brickWidth &&
                ball.y + ball.height + ball.ydir > brick.brickY &&
                ball.y < brick.brickY + brick.brickHeight
            ) {
                ball.ydir *= -1;
                brick.setLife();
            }
            // x축 방향 튕김
            if (
                ball.x + ball.width > brick.brickX &&
                ball.x + ball.dx < brick.brickX + brick.brickWidth &&
                ball.y + ball.height + ball.ydir > brick.brickY &&
                ball.y + ball.ydir < brick.brickY + brick.brickHeight
            ) {
                ball.xdir *= -1;
                brick.setLife();
            }
        }
    }
}
