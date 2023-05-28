function loadPageAddListner(){
	$("#loadButton")[0].addEventListener("click", loading);
}

function loading(){
	$("#loadingPage").css({
		display:"none"
	});
	$("#startPage").css({
		display:"block"
	});
	startBGM.loop = true;
    startBGM.play();
}
loadPageAddListner();