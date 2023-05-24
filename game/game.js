/*
 * <웹 프로그래밍 8팀 팀프로젝트 구현>
 * README.md file 참고 바랍니다.
 */
"use strict";

/** function gameInit() : 게임 내부 초기화 함수 */
function gameInit() {
    // 너비 : 1280px, 높이 : 720px 지정
    canvas.setAttribute("width", 1280);
    canvas.setAttribute("height", 720);

    // 전체 화면
    // canvas.setAttribute("width", window.innerWidth);
    // canvas.setAttribute("height", window.innerHeight);

    // 이벤트 리스너
    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);

    // 스테이지별 init
    paddle.init();
    stage.init();
    ball.init();
    game.timeLeft = 180;
    game.isCleared = false;
    game.isOver = false;
    game.isPaused = false;
    game.lifeLeft = 3;
    game.score = 0;
    timer = setInterval(changeTime, 1000);

    // div 화면 초기화
    updateLife();
    updateScore();
    updateTime();
}

/** function gameDraw() : 게임 내부 화면 그리기 함수 */
function gameDraw() {
    if (game.isPaused && gamePauseScene()) return; // 일시정지
    if (game.isCleared && stageClearScene()) return; // 스테이지 클리어
    if (game.isOver && gameOverScene()) return; // 게임오버

    // 화면 초기화
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 요소 그리기
    stage.drawStageBrick();
    paddle.drawPaddle(context);
    ball.run();

    // 충돌 감지
    collisionDetectionPaddle(ball, paddle);
    collisionDetectionBrick(ball);

    // 반복 실행
    interval = requestAnimationFrame(gameDraw);
}

/** function keyDownHandler(e) : 키보드 입력 Event Handler */
function keyDownHandler(e) {
    if (e.key === "Escape") {
        game.isPaused = !game.isPaused;
        if (!game.isPaused) interval = requestAnimationFrame(gameDraw);
    }
}

// 요소 생성
const stage = new stageBrick(context, 0);
const paddle = new Paddle(context);
const ball = new Ball("./images/ball.png");

// 실행
gameInit();
gameDraw();
