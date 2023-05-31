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
    deathSoundBGM.currentTime = 0;
    deathSoundBGM.play();
    // 게임 오버 시 배경을 서서히 어둡게 전환
    let i = 0;
    function setDark() {
        if (i == 10) return;
        context.globalAlpha = 0.1;
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(setDark, 300);
    }
    setTimeout(setDark, 300);

    $("#content")
        .delay(3000)
        .fadeOut(1000, () => {
            $("#gameOver").delay(1000).fadeIn(2000);
        });

    $("#showScore").html("score : " + currentStage.score);
    $("#resetButton").hover(
        function () {
            $(this).css({
                width: "120px",
                height: "48px",
                margin_top: "0",
            });
        },
        function () {
            $(this).css({
                width: "100px",
                height: "40px",
            });
        }
    );
    $("#resetButton").off("click").on("click", reset);

    return true;
}

function reset() {
    $("#gameOver").fadeOut(2000, () => {
        $("#startPage").delay(1000).fadeIn(2000);
        startPageAddListner();
    });

    startBGM.loop = true;
    startBGM.play();
}
function upKirbyAnimation() {
    clearInterval(timer);
    // paddle이 상승하는 애니메이션을 구현합니다.
    // paddle의 y 좌표를 일정한 간격으로 변경하여 상승 효과를 만듭니다.
    const paddleSpeed = 2; // paddle이 상승하는 속도를 조절합니다.
    if (!isAscend) {
        // 첫 호출
        isAscend = true;
        InGameBGMArr[InGameBGMIndex].pause();
        ascendingEffect.currentTime = 0; // 상승 효과음
        ascendingEffect.play();
    }
    // 상승 애니메이션을 위해 paddle의 y 좌표를 변경합니다.
    paddle.setPaddleY(paddle.getPaddleY() - paddleSpeed);
    ball.speed = 0;
    // paddle이 상단에 도달했는지 확인합니다.
    if (paddle.getPaddleY() <= 0) {
        isAscend = false;
        ball.speed = 5;
        stageClearScene();
        return true;
    }
    // 애니메이션이 계속 진행되어야 하므로 false를 반환합니다.
    return false;
}
/** function stageClearScene() : 스테이지 클리어 시 처리 */
function stageClearScene() {
    //Author: 황서진 Date: 2023-05-28
    //gameManager 역할 수행
    gameClearBGM.currentTime = 0;
    gameClearBGM.play();
    $("#content").css({ display: "none" });
    $("#gameClear").css({ display: "block" });
    nextStageAddListener();
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
