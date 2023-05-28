function nextStageAddListener() {
    let resultString =
        "점수 : " + currentStage.score + "<br>시간 :" + currentStage.timeLeft;
    currentStage.score += currentStage.timeLeft * 10;
    resultString +=
        "<br>최종점수 : " +
        currentStage.score +
        " + " +
        currentStage.timeLeft +
        " * 10 = " +
        currentStage.score;
    $("#result").html(resultString);
    $("#nextButton").on(
        "click",
        { stageNum: stage.currentStage + 2, score: currentStage.score },
        loadStage
    );
}
