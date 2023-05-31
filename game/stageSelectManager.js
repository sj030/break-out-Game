function stageSelectAddListener() {
    $("#stage1").off("click").on("click", { stageNum: 1, score: 0 }, loadStage);
    $("#stage2").off("click").on("click", { stageNum: 2, score: 0 }, loadStage);
    $("#stage3").off("click").on("click", { stageNum: 3, score: 0 }, loadStage);
    $("#stageback")
        .off("click")
        .on("click", function () {
            $("#stageSelect").css({ display: "none" });
            $("#startPage").css({ display: "block" });
            startPageAddListner();
            openingBGM.pause();
            openingBGM.currentTime = 0;
            startBGM.currentTime = 0;
            startBGM.play();
        });
}

function loadStage(e) {
    cancelAnimationFrame(interval);
    clearInterval(timer);
    if (e.data.stageNum > 3) {
        stage = null;
        InGameBGMArr[InGameBGMIndex].pause();
        $("#content").fadeOut(3000, function () {
            $("#stageSelect").css({ display: "none" });
            $("#gameClear").css({ display: "none" });
            $("#gameAllClear").fadeIn(2000);
        });
        $("#goback").off("click").on("click", goback);
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
    gameClearBGM.pause();
    InGameBGMArr[InGameBGMIndex].currentTime = 0;
    InGameBGMArr[InGameBGMIndex].loop = true;
    InGameBGMArr[InGameBGMIndex].play();
    // 필요시 currentTime
    gameInit();
}

function goback() {
    $("#goback").off("click");
    startPageAddListner();
    $("#gameAllClear").fadeOut(3000, () => {
        $("#startPage").fadeIn(2000);
    });
    openingBGM.pause();
    gameClearBGM.pause();
    startBGM.loop = true;
    startBGM.play();
}
