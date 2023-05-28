// gameManager.js 파일의 역할 간소화를 위해 제작된 js파일입니다.
// 초기 첫 화면의 모든 제어를 담당합니다. (첫 화면의 버튼들)

//unsolved mission : 첫 화면 실행시 오디오 재생

function startPageAddListner() {
    // js파일업로드시 가장 먼저 호출 될 함수입니다. 
    // 버튼의 listner들을 추가합니다.
    $("#introduceButton")[0].addEventListener("click", showIntroduceCanvas);
    $("#startButton")[0].addEventListener("click", startToOpening);
    $("#settingButton")[0].addEventListener("click", setting);
    $("#exitButton")[0].addEventListener("click", exitGame);
}

function showIntroduceCanvas() {
    var canvas = document.getElementById("introducePage");
    // 화면 중앙에 배치
    
    if(!isShowedIntroduce){ // false인 상황
        isShowedIntroduce = true;
        $("#introducePage").css({
            display: "inline",
        });
        if (canvas.getContext) {
        //이미지로 변경할 예정.
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect(0, 0, 500, 500);
        }
    }
    else{
        isShowedIntroduce = false;
        $("#introducePage").css({
            display:"none"
        });
    }
}

function startToOpening() {
    //case1. by using fadeInNOut
    $("#startPage").fadeOut(2000);
    $("#opening").delay(3000).fadeIn(2000);

    //audio change
    startBGM.pause();
    openingBGM.loop = true;
    openingBGM.play();
}

function setting(){
    if(!isShowedSetting){
        isShowedSetting = true;
        $("#settingDiv").css({
            display:"block"
        });
    }else{
        isShowedSetting = false;
        $("#settingDiv").css({
            display:"none"
        });
    }
}

function exitGame(){

}
startPageAddListner();