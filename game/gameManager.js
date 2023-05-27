// for startPage
function inPageAddListner() {
    //1. start page
    $("#introduceButton")[0].addEventListener("click", showIntroduceCanvas);
    $("#startButton")[0].addEventListener("click", startToOpening);

    //2. opening page
    $("#skipButton")[0].addEventListener("click", openingToContent);

    //3. content page
    // gameover 시 > #gameOver
    // gameclear 시 > #gameClear
}

function showIntroduceCanvas() {
    var canvas = document.getElementById("introducePage");
    // 화면 중앙에 배치
    $("#startPage").css({ position: "relative" });
    $("#introducePage").css({
        display: "inline",
        position: "absolute",
        width: "400px",
        height: "800px",
        top: "15%",
        left: "35%",
    });

    if (canvas.getContext) {
        //이미지로 변경할 예정.
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(0, 0, 500, 500);
    }
}

function startToOpening() {
    //case1. by using fadeInNOut
    $("#startPage").fadeOut(2000);
    $("#opening").delay(3000).fadeIn(2000);
}

function openingToContent() {
    //case2. by using display
    $("#opening").css({ display: "none" });
    $("#content").css({ display: "block" });
    // 실행
    gameInit();
}

inPageAddListner();
