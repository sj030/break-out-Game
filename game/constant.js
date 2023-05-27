"use strict";
// 전역변수 작성 영역
// 황서진]게임 화면 크기는 width: 1280px; height: 920px; 를 기준으로 하겠습니다.
const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

class StageStatus {
    constructor(stageData, timeLeft, lifeLeft, score) {
        this.stageData = stageData;
        this.isPaused = false;
        this.isOver = false;
        this.isCleared = false;
        this.timeLeft = timeLeft;
        this.lifeLeft = lifeLeft;
        this.score = score;
        this.combo = 0;
    }
}

let interval = null;
let timer = null;

const itemList = ["fire", "ice", "stone", "air"];

let currentStage = null;
let stage = null;
let paddle = null;
let ball = null;
let healthItem = null;

//audio for BGM
const startBGM = new Audio();
startBGM.src = "./sound/opening.oga";
const openingBGM = new Audio();
openingBGM.src = "./sound/Remembering_the_Sky_and_the_Scent_of_Flowers_preview.mp3";
const backGroundOneBGM = new Audio();
backGroundOneBGM.src = "./sound/backGroundOne.mp3";
const backGroundTwoBGM = new Audio();
backGroundTwoBGM.src = "./sound/A_Sparkling_Star_is_Born_preview.mp3";
const backGroundThreeBGM = new Audio();
// 설정 가능한 3가지 in game BGM
var InGameBGMArr = [backGroundOneBGM, backGroundTwoBGM, backGroundThreeBGM];
var InGameBGMIndex = 0;
backGroundThreeBGM.src = "./sound/Brilliant_Blue_preview.mp3";
const TimeRunningBGM =  new Audio();
TimeRunningBGM.src = "./sound/BGourmet_Race_KDL3.oga";
const gameClearBGM = new Audio();
gameClearBGM.src = "./sound/gameClear.mp3" ;
const deathSoundBGM = new Audio();
deathSoundBGM.src = "./sound/deathSound.mp3";


//"게임 소개" 버튼을 위한 변수입니다. 
var isShowedIntroduce = false; // not const