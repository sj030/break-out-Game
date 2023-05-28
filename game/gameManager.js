// for startPage
function inPageAddListner() {
    //0. start audio (audio for every page)
    // openingBGM.loop = true;
    // openingBGM.play();
    // implement by using event trigger

    //2. opening page
    $("#skipButton")[0].addEventListener("click", openingToStageSelect);

    //3. content page
    //scene.js에서 수행
}

function openingToContent() {
    //case2. by using display
    $("#opening").css({ display: "none" });
    $("#content").css({ display: "block" });
    // 실행
    openingBGM.pause();
    InGameBGMArr[InGameBGMIndex].currentTime = 0;
    InGameBGMArr[InGameBGMIndex].loop = true;
    InGameBGMArr[InGameBGMIndex].play();
    // 필요시 currentTime
    gameInit();
}

function openingToStageSelect() {
    $("#opening").css({ display: "none" });
    $("#stageSelect").css({ display: "block" });
    stageSelectAddListener();
}

inPageAddListner();
