function loadPageAddListner() {
    $("#loadButton").off("click").on("click", loading);
}

function loading() {
    $("#loadingPage").hide();
    $("#startPage").show();
    startBGM.loop = true;
    startBGM.play();
}
loadPageAddListner();
