function loadPageAddListner() {
    $("#loadButton").on("click", loading);
}

function loading() {
    $("#loadingPage").hide();
    $("#startPage").show();
    startBGM.loop = true;
    startBGM.play();
}
loadPageAddListner();
