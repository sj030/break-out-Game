class drawpaddle{
    constructor(width, height){
        this.height = height;
        this.width = width;
    }

    init(){
        this.width = 162;
        this.height = 57;
        this.paddleX = (canvas.width-width)/2;
        this.paddleimgarr = ["kirby_origin.png", "fire_origin.png", "ice_origin.png", "stone_origin.png"]
        this.imgarridx = 0;
        //스테이지 변경이 되면 imgarridx가 바뀌어야 함.
    }

    drawPaddle() {
        var img = new Image;
        img.src = paddleimgarr[imgarridx];
        context.drawImage(img, paddleX, canvas.height-height);
    }

    getWidth(){
        return this.width;
    }

    getPaddleX(){
        return this.paddleX;
    }
}

//dom 객체는 어떻게..

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > paddleWidth/2 && relativeX < canvas.width-paddleWidth/2){
      paddleX = relativeX - paddleWidth/2;
    }
}
//x좌표와 width 값을 어떻게 마우스이벤트와 연결할지 연구해야 합니다.