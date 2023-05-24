"use strict";
// 씬 작성 영역

/** function slideTo(ctx, target, fromX, fromY, toX, toY, speed) : 슬라이드 애니메이션
 * target - 움직일 이미지(image 속성) 또는 글자(text 속성)가 있는 대상
 * speed - 1회 refresh 당 이동할 거리
 */
function slideTo(ctx, target, fromX, fromY, toX, toY, speed) {
    if (target.image !== undefined)
        ctx.drawImage(target.image, target.x, target.y);
    else {
        ctx.font = target.fontSize.toString() + "pt Arial";
        ctx.fillText(target.text, target.x, target.y);
    }
    var diffX = toX - fromX;
    var diffY = toY - fromY;
    if ((fromX < toX && target.x < toX) || (fromX > toX && target.x > toX))
        target.x += (speed * diffX) / Math.sqrt(diffX * diffX + diffY * diffY);
    if ((fromY < toY && target.y < toY) || (fromY > toY && target.y > toY))
        target.y += (speed * diffY) / Math.sqrt(diffX * diffX + diffY * diffY);
}

/** function playEffect(ctx, target, time) : 이펙트 효과 장면
 * target - 이펙트 이미지 대상
 * target.image / target.x / target.y / target.timeVar / target.imageArr[] / target.imageIndex 필요
 * time - 각 이미지별로 넘어갈 시간 (단위 : ms)
 */
function playEffect(ctx, target, time) {
    ctx.drawImage(target.image, target.x, target.y);
    if (target.timeVar < time) {
        target.timeVar++;
        return;
    }
    target.image.src =
        target.imageArr[++target.imageIndex % target.imageArr.length];
    target.timeVar = 0;
}

/** function gamePauseScene() : 일시정지 화면 */
function gamePauseScene() {
    context.font = "20pt Arial";
    context.textAlign = "center";
    context.fillText("일시정지됨", canvas.width / 2, canvas.height / 2);
    cancelAnimationFrame(interval);
    return true;
}

/** function ballOutScene() : 공 떨어졌을 때 처리 */
function ballOutScene() {
    cancelAnimationFrame(interval);
    if (--game.lifeLeft <= 0) game.isOver = true;
    updateLife();
    ball.init();
    ball.speed = 5;
}

/** function gameOverScene() : 게임 오버 처리 */
function gameOverScene() {
    clearInterval(timer);
    cancelAnimationFrame(interval);
    return true;
}

// div 관리영역
function updateLife() {
    document.getElementById("life").innerText = "♥".repeat(
        Math.max(game.lifeLeft, 0)
    );
}

function updateTime() {
    document.getElementById("time").innerText = game.timeLeft;
}

function updateScore() {
    document.getElementById("score").innerText = game.score;
}

function changeTime() {
    if (--game.timeLeft >= 0) updateTime();
    else game.isOver = true;
}
