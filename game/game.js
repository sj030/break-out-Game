/*
 * <웹 프로그래밍 8팀 팀프로젝트 구현>
 * README file은 아래의 Notion Page 참고 바랍니다.
 * https://www.notion.so/README-6d405c30ce904e1cbe918d28934eb0a1?pvs=4
 */

// 전역변수 작성 영역
var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");
var game = {
    isPaused: false,
    isOver: false,
};

/** function initialize() : 초기화 함수 */
function initialize() {
    // 너비 : 1280px, 높이 : 720px 지정
    canvas.setAttribute("width", 1280);
    canvas.setAttribute("height", 720);
    document.addEventListener("keydown", keyDownHandler, false);
    //document.addEventListener("keyup", keyUpHandler, false);
}

/** function draw() : 화면 그리기 함수 */
function draw() {
    if (game.isPaused) {
        gamePauseScene();
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height); // 초기화

    // collisionDetection();
}

/** function keyDownHandler(e) : 키보드 입력 Event Handler */
function keyDownHandler(e) {
    if (e.key === "Escape") {
        game.isPaused = !game.isPaused;
        if (!game.isPaused) {
            interval = setInterval(draw, 10);
        }
    }
}

/** function collisionDetection(objA, objB) : 충돌 감지 함수
 * objA를 멈춰 있는 물체, objB를 움직이는 물체로 가정
 */
function collisionDetection(objA, objB) {
    // x축 방향 튕김
    if (
        objB.x + objB.width + objB.dx > objA.x &&
        objB.x + objB.dx < objA.x + objA.width &&
        objB.y + objB.height > objA.y &&
        objB.y < objA.y + objA.height
    ) {
        objB.dx *= -1;
    } else if (objB.x < 0 || objB.x + objB.width > width) {
        objB.dx *= -1;
    }
    // y축 방향 튕김
    if (
        objB.x + objB.width > objA.x &&
        objB.x < objA.x + objA.width &&
        objB.y + objB.height + objB.dy > objA.y &&
        objB.y + objB.dy < objA.y + objA.height
    ) {
        objB.dy *= -1;
    } else if (objB.y < 0) {
        objB.dy *= -1;
    }

    objB.x += objB.dx;
    objB.y += objB.dy;
}

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

/** function openingScene() : 오프닝 화면 */
function openingScene() {
    // ! TODO
}

/** function startScene() : 게임 시작 화면 */
function startScene() {}

/** function gamePauseScene() : 일시정지 화면 */
function gamePauseScene() {
    context.font = "20pt Arial";
    context.textAlign = "center";
    context.fillText("일시정지됨", canvas.width / 2, canvas.height / 2);
    clearInterval(interval);
}

// 실행
initialize();

var interval = setInterval(draw, 10);
