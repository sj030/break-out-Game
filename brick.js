class Brick{
	constructor(ctx, Lx, Ly){ //Lx, Ly는 배열의 인덱스 번호 array[i][j]

		//이하 내용은 constant.js에 들어가는 것도 적합해 보임
		this.brickWidth = 75;
		this.brickHeight = 20;
		this.brickPadding = 10;
		this.brickOffsetTop = 30;
		this.brickOffsetLeft = 30;

		//멤버 변수
		this.ctx = ctx;
		this.life = true; // 충돌시 false
		this.brickX = (Lx * (this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
		this.brickY = (Ly*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
	}

	draw(){
		this.ctx.beginPath();
		this.ctx.rect(this.brickX, this.brickY, this.brickWidth, this.brickHeight);
		this.ctx.fillStyle = "#0095DD";
		this.ctx.fill();
		this.ctx.closePath();
	}

	collisionBrick(){
		this.life = false;
	}

	isAlive(){
		return this.life;
	}

}