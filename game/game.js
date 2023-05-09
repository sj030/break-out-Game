/*
 * <웹 프로그래밍 8팀 팀프로젝트 구현>
 * README file은 아래의 Notion Page 참고 바랍니다.
 * https://www.notion.so/README-6d405c30ce904e1cbe918d28934eb0a1?pvs=4
 */

// 전역변수 작성 영역
var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");








/** function initialize() : 초기화 함수 */
function initialize() {
    // 너비 : 1280px, 높이 : 720px 지정
    canvas.setAttribute("width", 1280);
    canvas.setAttribute("height", 720);
}

// 실행
initialize();


/** function draw() : 화면 그리기 함수 */
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // 초기화

    // collisionDetection();
}


/** function collisionDetection(objA, objB) : 충돌 감지 함수
 * objA를 멈춰 있는 물체, objB를 움직이는 물체로 가정
 */
function collisionDetection(objA, objB) {
    // ...
}
