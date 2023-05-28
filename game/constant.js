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
backGroundThreeBGM.src = "./sound/Brilliant_Blue_preview.mp3";
// 설정 가능한 3가지 in game BGM
var InGameBGMArr = [backGroundOneBGM, backGroundTwoBGM, backGroundThreeBGM];
var InGameBGMIndex = 0;

const TimeRunningBGM =  new Audio();
TimeRunningBGM.src = "./sound/Gourmet_Race_KDL3.oga";
const gameClearBGM = new Audio();
gameClearBGM.src = "./sound/gameClear.mp3" ;
const deathSoundBGM = new Audio();
deathSoundBGM.src = "./sound/deathSound.mp3";

//audio for soundEffect
const voiceOneEffect = new Audio();
voiceOneEffect.src = "./sound/soundEffect/voiceOne.mp3";
const voiceTwoEffect = new Audio();
voiceTwoEffect.src = "./sound/soundEffect/voiceTwo.mp3";
const voiceThreeEffect = new Audio();
voiceThreeEffect.src = "./sound/soundEffect/voiceThree.oga";

//audio for each itembrick
// fire - 상하좌우의 블록을 부순다
const fireSoundEffect = new Audio();
fireSoundEffect.src = "./sound/soundEffect/fire.mp3";
// ice - 남은 시간을 10초 늘어나게 한다
const iceSoundEffect = new Audio();
iceSoundEffect.src = "./sound/soundEffect/ice.mp3";
// stone - 추가점수 400점을 더 준다
const stoneSoundEffect = new Audio();
stoneSoundEffect.src = "./sound/soundEffect/poyo.mp3";
// air - 체력을 회복시키는 아이템을 준다 >> extraLife 효과음 추가 완료
const airSoundEffect = new Audio();
airSoundEffect.src = "./sound/soundEffect/extraLife.mp3";



//startPage 속 버튼을 위한 변수입니다. 
var isShowedIntroduce = false; // not const
var isShowedSetting = false;