// gameManager.js 파일의 역할 간소화를 위해 제작된 js파일입니다.
// 초기 첫 화면의 모든 제어를 담당합니다. (첫 화면의 버튼들)

//unsolved mission : 첫 화면 실행시 오디오 재생

function startPageAddListner() {
    // js파일업로드시 가장 먼저 호출 될 함수입니다.
    // 버튼의 listner들을 추가합니다.
    $("#ruleButton").off("click").on("click", showIntroduceCanvas);
    $("#startButton").off("click").on("click", startToOpening);
    $("#setButton").off("click").on("click", settingToGame);
    $("#overButton").off("click").on("click", exitGame);
}

function showIntroduceCanvas() {
    // 화면 중앙에 배치
    $("#main_start").css({ display: "none" });
    $("#rulePage").css({ display: "block" });
    $("#back_rule")
        .off("click")
        .on("click", function () {
            $("#rulePage").css({ display: "none" });
            $("#main_start").css({ display: "block" });
        });
}

function startToOpening() {
    // 다른 버튼 누르기 방지
    $("#ruleButton").off("click");
    $("#startButton").off("click");
    $("#setButton").off("click");
    $("#overButton").off("click");

    //case1. by using fadeInNOut
    $("#startPage").fadeOut(2000);
    $("#opening").delay(3000).fadeIn(2000);

    textLineAni();

    //audio change
    startBGM.pause();
    openingBGM.loop = true;
    openingBGM.play();
}
function textLineAni() {
    $("#line1, #opening1, #line2, #opening2, #line3, #opening3")
        .stop(true, true)
        .css({ display: "none" });

    $("#line1, #opening1")
        .delay(3000)
        .fadeIn(3000)
        .fadeOut(3000)
        .delay(300, () => {
            $("#line2, #opening2")
                .fadeIn(3000)
                .fadeOut(3000)
                .delay(300, () => {
                    $("#line3, #opening3").delay(300).fadeIn(3000);
                });
        });
}

function settingToGame() {
    // 이미 존재하는 이벤트 제거
    $(".settingbgm").off("click");
    $(".settingsound").off("click");
    $(".settingskin").off("click");

    // 화면 보여주기
    $("#main_start").css({ display: "none" });
    $("#setPage").css({ display: "block" });
    $("#back_set")
        .off("click")
        .on("click", function () {
            $("#setPage").css({ display: "none" });
            $("#main_start").css({ display: "block" });
        });

    $(".settingbgm")[1].addEventListener("click", function () {
        $(".settingbgm")[0].classList.remove("on");
        $(".settingbgm")[1].classList.add("on");
    });

    $(".settingbgm")[0].addEventListener("click", function () {
        $(".settingbgm")[1].classList.remove("on");
        $(".settingbgm")[0].classList.add("on");
    });

    $(".settingsound")[1].addEventListener("click", function () {
        $(".settingsound")[0].classList.remove("on");
        $(".settingsound")[1].classList.add("on");
    });

    $(".settingsound")[0].addEventListener("click", function () {
        $(".settingsound")[1].classList.remove("on");
        $(".settingsound")[0].classList.add("on");
    });

    $(".settingskin")[0].addEventListener("click", function () {
        $(".settingskin")[1].classList.remove("on_2");
        $(".settingskin")[2].classList.remove("on_3");
        $(".settingskin")[0].classList.add("on");
        $("#top").css({ "background-color": "#4793d7" });
        $("#bottom").css({ "background-color": "#4793d7" });
        //$("#screen").css({"background" : "url(../images/skin1.jpg) no-repeat"});
    });

    $(".settingskin")[1].addEventListener("click", function () {
        $(".settingskin")[2].classList.remove("on_3");
        $(".settingskin")[0].classList.remove("on");
        $(".settingskin")[1].classList.add("on_2");
        $("#top").css({ "background-color": "#e482b5" });
        $("#bottom").css({ "background-color": "#e482b5" });
        //$("#screen").css({"background" : "url(../images/skin2.jpg) no-repeat"});
    });

    $(".settingskin")[2].addEventListener("click", function () {
        $(".settingskin")[0].classList.remove("on");
        $(".settingskin")[1].classList.remove("on_2");
        $(".settingskin")[2].classList.add("on_3");
        $("#top").css({ "background-color": "#91d745" });
        $("#bottom").css({ "background-color": "#91d745" });
        //$("#screen").css({"background" : "url(../images/skin3.jpg) no-repeat"});
    });
}

function exitGame() {
    window.close();
}

function enterHandler(e) {
    if (e.key === "Enter") {
        if ($("#opening").css("display") != "block") return;
        $("#opening #line1, #opening1, #line2, #opening2, #line3, #opening3")
            .stop(true, true)
            .css({ display: "none" });
        openingToStageSelect();
    }
}

document.addEventListener("keydown", enterHandler, false);

startPageAddListner();
