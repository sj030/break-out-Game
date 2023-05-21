/*
 * <웹 프로그래밍 8팀 팀프로젝트 구현>
 * README.md file 참고 바랍니다.
 */
"use strict";

/** function init() : 초기화 함수 */
function init() {
    // 너비 : 1280px, 높이 : 720px 지정
    canvas.setAttribute("width", 1280);
    canvas.setAttribute("height", 720);

    // 전체 화면
    // canvas.setAttribute("width", window.innerWidth);
    // canvas.setAttribute("height", window.innerHeight);

    // 이벤트 리스너
    // window.addEventListener("resize", resizeHandler);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);
    // init
    paddle.init();
    stage.init();
}

const stage = new stageBrick(context, 0);
const paddle = new Paddle(context);
const ball = new Ball("./images/fireball.png");

/** function draw() : 화면 그리기 함수 */
function draw() {
    if (game.isPaused && gamePauseScene()) return; // 일시정지
    context.clearRect(0, 0, canvas.width, canvas.height); // 초기화

    stage.drawStageBrick();
    paddle.draw(context);
    ball.run();
    collisionDetectionPaddle(ball, paddle);
    collisionDetectionBrick(ball);
    interval = requestAnimationFrame(draw);
}

/** function keyDownHandler(e) : 키보드 입력 Event Handler */
function keyDownHandler(e) {
    if (e.key === "Escape") {
        game.isPaused = !game.isPaused;
        if (!game.isPaused) interval = requestAnimationFrame(draw);
    }
}

function resizeHandler() {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
}

// 실행
init();
interval = requestAnimationFrame(draw);
