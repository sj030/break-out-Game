// gameManager.js 파일의 역할 간소화를 위해 제작된 js파일입니다.
// 초기 첫 화면의 모든 제어를 담당합니다. (첫 화면의 버튼들)

//unsolved mission : 첫 화면 실행시 오디오 재생

function startPageAddListner() {
    // js파일업로드시 가장 먼저 호출 될 함수입니다. 
    // 버튼의 listner들을 추가합니다.
    $("#ruleButton")[0].addEventListener("click", showIntroduceCanvas);
    $("#startButton")[0].addEventListener("click", startToOpening);
    $("#setButton")[0].addEventListener("click", settingToGame);
    $("#overButton")[0].addEventListener("click", exitGame);
}

function showIntroduceCanvas() {
    // 화면 중앙에 배치
    $("#main_start").css({"display" : "none"});
    $("#rulePage").css({"display" : "block"});
    $("#back_rule")[0].addEventListener('click', function () {
        $("#rulePage").css({"display" : "none"});
        $("#main_start").css({"display" : "block"});
    });
}

function startToOpening() {
    //case1. by using fadeInNOut
    $("#startPage").fadeOut(2000);
    $("#opening").delay(3000).fadeIn(2000);

    textLineAni();

    //audio change
    startBGM.pause();
    openingBGM.loop = true;
    openingBGM.play();
}
function textLineAni(){
    
    $("#line1").delay(3000).fadeIn(3000);
    $("#line1").fadeOut(3000);
    $("#opening1").delay(3000).fadeIn(3000);
    $("#opening1").fadeOut(3000);
    $("#line2").delay(9000).fadeIn(3000);
    $("#line2").fadeOut(3000);
    $("#opening2").delay(9000).fadeIn(3000);
    $("#opening2").fadeOut(3000);
    $("#line3").delay(15000).fadeIn(3000);
    $("#opening3").delay(15000).fadeIn(3000);
    
}

function settingToGame(){
    $("#main_start").css({"display" : "none"});
    $("#setPage").css({"display" : "block"});
    $("#back_set")[0].addEventListener('click', function () {
        $("#setPage").css({"display" : "none"});
        $("#main_start").css({"display" : "block"});
    });

    $(".settingbgm")[1].addEventListener('click', function () {
        $(".settingbgm")[0].classList.remove("on");
        $(".settingbgm")[1].classList.add("on");
    });

    $(".settingbgm")[0].addEventListener('click', function () {
        $(".settingbgm")[1].classList.remove("on");
        $(".settingbgm")[0].classList.add("on");
    });

    $(".settingsound")[1].addEventListener('click', function () {
        $(".settingsound")[0].classList.remove("on");
        $(".settingsound")[1].classList.add("on");
    });

    $(".settingsound")[0].addEventListener('click', function () {
        $(".settingsound")[1].classList.remove("on");
        $(".settingsound")[0].classList.add("on");
    });

    $(".settingskin")[0].addEventListener('click', function () {
        $(".settingskin")[1].classList.remove("on_2");
        $(".settingskin")[2].classList.remove("on_3");
        $(".settingskin")[0].classList.add("on");
        $("#top").css({"background-color" : "#4793d7"});
        $("#bottom").css({"background-color" : "#4793d7"});
        //$("#screen").css({"background" : "url(../images/skin1.jpg) no-repeat"});
    });

    $(".settingskin")[1].addEventListener('click', function () {
        $(".settingskin")[2].classList.remove("on_2");
        $(".settingskin")[0].classList.remove("on");
        $(".settingskin")[1].classList.add("on_2");
        $("#top").css({"background-color" : "#e482b5"});
        $("#bottom").css({"background-color" : "#e482b5"});
        //$("#screen").css({"background" : "url(../images/skin2.jpg) no-repeat"});
    });

    $(".settingskin")[2].addEventListener('click', function () {
        $(".settingskin")[0].classList.remove("on");
        $(".settingskin")[1].classList.remove("on_2");
        $(".settingskin")[2].classList.add("on_3");
        $("#top").css({"background-color" : "#91d745"});
        $("#bottom").css({"background-color" : "#91d745"});
        //$("#screen").css({"background" : "url(../images/skin3.jpg) no-repeat"});
    });
}


function exitGame(){
    window.close();
}
startPageAddListner();