//game.js 파일입니다.

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
    paddle = new Paddle(context);
    ball = new Ball("./images/ball.png");
    healthItem = null;
    comboTextArr = [];

    paddle.init();
    stage.init();
    ball.init();
    timer = setInterval(changeTime, 1000);

    // div 화면 초기화
    updateLife();
    updateScore();
    updateTime();

    // 게임 시작
    gameDraw();
}

/** function gameDraw() : 게임 내부 화면 그리기 함수 */
function gameDraw() {
    if (currentStage.isOver && gameOverScene()) return; // 게임오버
    if (currentStage.isCleared && upKirbyAnimation()) return; // 스테이지 클리어
    if (currentStage.isPaused && gamePauseScene()) return; // 일시정지
    if (currentStage.isInitial && initScene()) return; // 시작화면

    // 화면 초기화
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 요소 그리기
    stage.drawStageBrick();
    for (let idx in comboTextArr) {
        if (comboTextArr[idx]?.time > 50) {
            comboTextArr[idx] = null;
            continue;
        }
        comboTextArr[idx]?.draw();
    }
    paddle.drawPaddle(context);
    ball.run();
    if (healthItem !== null && healthItem.avail) healthItem.drop();

    // 충돌 감지
    collisionDetectionPaddle(ball, paddle);
    collisionDetectionBrick(ball);

    // 반복 실행
    interval = requestAnimationFrame(gameDraw);
}

/** function keyDownHandler(e) : 키보드 입력 Event Handler */
function keyDownHandler(e) {
    if (e.key === "Escape") {
        currentStage.isPaused = !currentStage.isPaused;
        if (!currentStage.isPaused) {
            interval = requestAnimationFrame(gameDraw);
            timer = setInterval(changeTime, 1000);
        }
    }
}
