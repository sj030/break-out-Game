//"use strict";

/*
Author: 황서진
Date: 2023.05.19
- stageBrick 클래스
	[소개]: "현재" 스테이지의 전체 벽돌들을 구성합니다.
	[멤버 변수]: currentBrickComposition 배열(충돌 결과를 포함, 진행중인 게임 상에서의 배열을 저장합니다.)
	[멤버 함수]
		생성자 함수/ (ctx, (int)stage 정보)
		init함수/ 초기에 한 번 실행됩니다. 
		drawStageBrick함수/ 전체 블럭 구성을 draw합니다. 
						단일 벽돌 클래스인 Brick의 draw함수를 호출하며, main의 draw함수에서 반복되며 호출됩니다.
						멤버 변수인 currentBrickComposition배열을 기준으로 벽돌을 생성합니다.
	[more]
		init 함수/ stage값을 기준으로 constant.js의 stageBrickComposition[][] (스테이지 블럭 구성 정보)를 가져옵니다.
					** 
						constant.js에서는 
						stageBrickInformation = [stageOne, stageTwo];
						stageone = [[1,1,1,1,0,0,0], [1,2,0,0,0,2,1]];
						과 같은 형식으로 저장할 것입니다. (stageBrickInformation는 포인터 저장)
					**
					currentBrickComposition = stageBrickInformation[stage];
*/

class stageBrick {
    constructor(ctx, stage) {
        this.ctx = ctx;
        this.currentStage = stage;
        this.currentBrickComposition = stageOne; //스테이지 블럭 구성 정보를 저장할 배열입니다.
    }

    init() {
        var info = stageBrickInformation[this.currentStage];
        var brickArr = this.currentBrickComposition;
        /*
			가져온 스테이지 정보에 맞게, 멤버 변수를 구성합니다. 1이면 일반 벽돌, 2이면 아이템 벽돌, 0이면 공백입니다. 
		*/
        for (let i = 0; i < info.length; i++) {
            for (let j = 0; j < info[i].length; j++) {
                if (info[i][j] == 1) {
                    brickArr[i][j] = new Brick(this.ctx, i, j);
                } else if (info[i][j] == 2) {
                    const tmp = new itemBrick(this.ctx, i, j);
                    brickArr[i][j] = tmp;
                    tmp.destroy = function () {
                        if (this.life) {
                            this.life = false;
                            switch (this.itemType) {
                                case 0: // fire - 상하좌우의 블록을 부순다
                                    fireSoundEffect.play();
                                    fireSoundEffect.currentTime = 0;
                                    if (i < stageOne.length - 1)
                                        brickArr[i + 1][j].destroy();
                                    if (i > 0) brickArr[i - 1][j].destroy();
                                    if (j < stageOne[0].length - 1)
                                        brickArr[i][j + 1].destroy();
                                    if (j > 0) brickArr[i][j - 1].destroy();
                                    break;
                                case 1: // ice - 남은 시간을 10초 늘어나게 한다
                                    currentStage.timeLeft += 10;
                                    iceSoundEffect.play();
                                    iceSoundEffect.currentTime = 0;
                                    updateTime();
                                    break;
                                case 2: // stone - 추가점수 400점을 더 준다
                                    currentStage.score += 400;
                                    stoneSoundEffect.play(); //add soundEffect author: 황서진 date:05-28
                                    stoneSoundEffect.currentTime = 0;
                                    break;
                                case 3: // air - 체력을 회복시키는 아이템을 준다
                                    if (!healthItem?.avail)
                                        healthItem = new HealthItem(
                                            this.brickX + this.brickWidth / 2,
                                            this.brickY + this.brickHeight
                                        );
                                    break;
                            }
                            currentStage.score +=
                                100 *
                                (1 +
                                    currentStage.combo *
                                        currentStage.combo++ *
                                        0.1);
                            updateScore();
                        }
                    };
                } else {
                    this.currentBrickComposition[i][j] = null;
                }
            }
        }
    }

    drawStageBrick() {
        // 그릴 벽돌이 없으면 게임 클리어로 처리합니다.
        let isGameClear = true;
        //멤버 변수인 currentBrickComposition 배열에 맞게 블럭을 그립니다.
        for (let i = 0; i < this.currentBrickComposition.length; i++) {
            for (let j = 0; j < this.currentBrickComposition[i].length; j++) {
                // null인 경우, 이미 충돌된 경우 continue;
                if (
                    this.currentBrickComposition[i][j] != null &&
                    this.currentBrickComposition[i][j].life == true
                ) {
                    this.currentBrickComposition[i][j].draw(); // itemBrick클래스는 Brick을 상속합니다.
                    isGameClear = false; // 벽돌을 하나라도 그렸으면 게임 진행 중입니다.
                }
            }
        }
        if (isGameClear) currentStage.isCleared = true;
    }
}

/*
Author: 황서진
Date: 2023.05.19
- 단일 벽돌 클래스입니다.
	[소개]: 단일 벽돌 
	[멤버 변수]: ctx, location x좌표, location y좌표, life (충돌 or not),(이하는 constant.js에서) brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft
	[멤버 함수]
		생성자 함수/ (ctx, x 좌표, y 좌표)
		init함수/ 초기에 한 번 실행됩니다. 
		drawBrick() 함수/ stageBrick클래스에서 호출됩니다. 
		setLife() 함수/ main.js에서 collision발생 시 호출됩니다. false로 바꿉니다. 
		getLife() 함수/ 멤버 변수 life의 getter 함수입니다. 
*/

class Brick {
    constructor(ctx, Lx, Ly) {
        //Lx, Ly는 배열의 인덱스 번호 array[i][j]
        //이하 내용은 constant.js에 들어가는 것도 적합해 보임

        this.brickHeight = 50;
        this.brickPadding = 20;
        this.brickOffsetTop = 30;
        this.brickOffsetOneSide = 45;
        this.image = new Image();
        this.image.src = "../webP/images/brick_origin.png";
        this.brickWidth =
            (canvas.width - this.brickOffsetOneSide * 2) / 7 -
            this.brickPadding;
        //멤버 변수
        this.ctx = ctx;
        this.life = true;
        this.brickX =
            Lx * (this.brickWidth + this.brickPadding) +
            this.brickOffsetOneSide;
        this.brickY =
            Ly * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
    }

    draw() {
        context.drawImage(
            this.image,
            this.brickX,
            this.brickY,
            this.brickWidth,
            this.brickHeight
        );
    }

    destroy() {
        if (this.life) {
            this.life = false;
            currentStage.score +=
                100 * (1 + currentStage.combo * currentStage.combo++ * 0.1);
            updateScore();
        }
    }

    //getter 함수
    getLife() {
        return this.life;
    }
}

/*
Author: 황서진
Date: 2023.05.19
- js의 상속 활용에 대한 부분의 이해가 미흡한 상태로 작성한 코드입니다. 주의 부탁드립니다. 
- 아이템 벽돌 클래스입니다.
	[소개]: 아이템 벽돌 > Brick을 상속받습니다.  
	[멤버 변수]: "skinType 변수" (아이템 스킬 지정),ctx, location x좌표, location y좌표, life (충돌 or not),(이하는 constant.js에서) brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft
	[멤버 함수]
		init함수/ 초기에 한 번 실행됩니다. 아이템 블럭의 type을 결정합니다. 
		생성자 함수/ (ctx, x 좌표, y 좌표)
		+ itemList는 constant.js에서 가져올 예정입니다. 임시로 멤버 변수에 저장했습니다. 
		+ 아이템 종류는 랜덤으로 결정할 예정입니다. 

		**이하는 Brick과 같습니다. 
		drawBrick() 함수/ stageBrick클래스에서 호출됩니다. 
		destroy() 함수/ main.js에서 collision발생 시 호출됩니다. 반대로 바꿉니다.
*/
class itemBrick extends Brick {
    constructor(ctx, Lx, Ly) {
        //Lx, Ly는 배열의 인덱스 번호 array[i][j]
        super(ctx);

        //이하 내용은 constant.js에 들어가는 것도 적합해 보임
        // this.brickWidth = 75;
        // this.brickHeight = 20;
        // this.brickPadding = 10;
        // this.brickOffsetTop = 30;
        // this.brickOffsetLeft = 30;

        // ** 변화한 부분
        this.itemType = Math.floor(Math.random() * itemList.length); // 랜덤으로 설정
        this.image = new Image();
        this.imageArr = [
            "./images/brick_fire_origin.png",
            "./images/brick_ice_origin.png",
            "./images/brick_stone_origin.png",
            "./images/brick_snow_origin.png",
        ];

        this.image.src = this.imageArr[this.itemType];

        //멤버 변수
        this.ctx = ctx;
        this.life;
        this.brickX =
            Lx * (this.brickWidth + this.brickPadding) +
            this.brickOffsetOneSide;
        this.brickY =
            Ly * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
    }
}

class HealthItem {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.avail = true;
        this.image = new Image();
        this.image.src = "./images/heart.png";
        this.width = 27;
        this.height = 27;
    }

    draw() {
        context.drawImage(this.image, this.x, this.y);
    }

    drop() {
        if (this.y < canvas.width) {
            this.y++;
        }
        if (this.avail) {
            this.draw();
            collisionDetectionHeart(this, paddle);
        }
    }

    destroy() {
        airSoundEffect.play();//add sound effec
        airSoundEffect.currentTime = 0;
        this.avail = false;
        currentStage.lifeLeft++;
        updateLife();
    }
}
