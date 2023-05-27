// for startPage
function inPageAddListner() {
	//0. start audio (audio for every page)
	// openingBGM.loop = true;
    // openingBGM.play();
    // implement by using event trigger

    //1. start page
    $("#introduceButton")[0].addEventListener("click", showIntroduceCanvas);
    $("#startButton")[0].addEventListener("click", startToOpening);

    //2. opening page
    $("#skipButton")[0].addEventListener("click", openingToContent);

    //3. content page
    //scene.js에서 수행
}

function showIntroduceCanvas() {
    var canvas = document.getElementById("introducePage");
    // 화면 중앙에 배치
    
    if(!isShowedIntroduce){ // false인 상황
    	isShowedIntroduce = true;
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
    openingBGM.loop = true;
    openingBGM.play();
}

function openingToContent() {
    //case2. by using display
    $("#opening").css({ display: "none" });
    $("#content").css({ display: "block" });
    // 실행
    openingBGM.pause();
    InGameBGMArr[InGameBGMIndex].loop = true;
    InGameBGMArr[InGameBGMIndex].play();
    gameInit();
}

inPageAddListner();