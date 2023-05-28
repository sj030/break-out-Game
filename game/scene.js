"use strict";
// 씬 작성 영역

/** function gamePauseScene() : 일시정지 화면 */
function gamePauseScene() {
    context.font = "20pt PFStarDust";
    context.textAlign = "center";
    context.fillText("Paused", canvas.width / 2, canvas.height / 2);
    cancelAnimationFrame(interval);
    clearInterval(timer);
    return true;
}

/** function ballOutScene() : 공 떨어졌을 때 처리 */
function ballOutScene() {
    cancelAnimationFrame(interval);
    if (--currentStage.lifeLeft <= 0) currentStage.isOver = true;
    updateLife();
    ball.init();

}

/** function gameOverScene() : 게임 오버 처리 */
function gameOverScene() {
    clearInterval(timer);
    cancelAnimationFrame(interval);

    //Author: 황서진 Date: 2023-05-28
    //gameManager 역할 수행
    InGameBGMArr[InGameBGMIndex].pause();
    deathSoundBGM.play();
    deathSoundBGM.currentTime = 0;
    // 게임 오버 색상 반전 효과 추가 예정

    $("#content").css({display:"none"});
    $("#gameOver").css({display:"block"});
    return true;
}

/** function stageClearScene() : 스테이지 클리어 시 처리 */
function stageClearScene() {
    context.font = "20pt PFStarDust";
    context.textAlign = "center";
    context.fillText("Stage Clear", canvas.width / 2, canvas.height / 2);
    cancelAnimationFrame(interval);
    clearInterval(timer);

    //Author: 황서진 Date: 2023-05-28
    //gameManager 역할 수행
    InGameBGMArr[InGameBGMIndex].pause();
    gameClearBGM.play();
    gameClearBGM.currentTime = 0;
    $("#content").css({display:"none"});
    $("#gameClear").css({display:"block"});
    return true;
}

// div 관리영역
function updateLife() {
    $("#life").text("♥".repeat(Math.max(currentStage.lifeLeft, 0)));
}

function updateTime() {
    $("#time").text(currentStage.timeLeft);
}

function updateScore() {
    $("#score").text(currentStage.score);
}

function changeTime() {
    currentStage.timeLeft--;
    if (currentStage.timeLeft >= 0) updateTime();
    else currentStage.isOver = true;
}
