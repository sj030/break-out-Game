function stageSelectAddListener() {
    $("#stage1").on("click", { stageNum: 1, score: 0 }, loadStage);
    $("#stage2").on("click", { stageNum: 2, score: 0 }, loadStage);
    $("#stage3").on("click", { stageNum: 3, score: 0 }, loadStage);
}

function loadStage(e) {
    cancelAnimationFrame(interval);
    clearInterval(timer);
    if (e.data.stageNum == 4) {
        stage = null;
        // 엔딩 처리 필요
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
    InGameBGMArr[InGameBGMIndex].loop = true;
    InGameBGMArr[InGameBGMIndex].play();
    // 필요시 currentTime
    gameInit();
}
