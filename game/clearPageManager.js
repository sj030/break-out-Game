function nextStageAddListener() {
    $("#nextButton").on(
        "click",
        { stageNum: stage.currentStage + 2, score: currentStage.score },
        loadStage
    );
}
