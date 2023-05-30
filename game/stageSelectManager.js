function stageSelectAddListener() {
    $("#stage1").on("click", { stageNum: 1, score: 0 }, loadStage);
    $("#stage2").on("click", { stageNum: 2, score: 0 }, loadStage);
    $("#stage3").on("click", { stageNum: 3, score: 0 }, loadStage);
     $("#stageback").on("click", function(){
        $("#stageSelect").css({ display: "none" });
        $("#startPage").css({ display: "block" });
    });
}

function loadStage(e) {
    cancelAnimationFrame(interval);
    clearInterval(timer);
    if (e.data.stageNum > 3) {
        stage = null;
        $("#content").css({display: "none"});
        InGameBGMArr[InGameBGMIndex].pause();
        $("#stageSelect").css({ display: "none" });
        $("#gameClear").css({ display: "none" });
        $("#gameAllClear").delay(3000).fadeIn(2000);
        $("#goback").on("click", goback);
        return;
    }
    currentStage = new StageStatus(
        stageBrickInformation[e.data.stageNum - 1],
        180,
        4 - e.data.stageNum,
        e.data.score
    );
    stage = new stageBrick(context, e.data.stageNum - 1);

    $("#stageSelect").css({ display: "none" });
    $("#gameClear").css({ display: "none" });
    $("#content").css({ display: "block" });
    // 배경음 시작
    openingBGM.pause();
    InGameBGMArr[InGameBGMIndex].currentTime = 0;
    InGameBGMArr[InGameBGMIndex].loop = true;
    InGameBGMArr[InGameBGMIndex].play();
    // 필요시 currentTime
    gameInit();
}

function goback(){
    $("#gameAllClear").fadeOut(3000);
    $("#startPage").delay(3000).fadeIn(2000);
    startBGM.loop = true;
    startBGM.play();
}

function changeStage(){
    
}