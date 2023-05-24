"use strict";
// 전역변수 작성 영역
// 황서진]게임 화면 크기는 width: 1280px; height: 920px; 를 기준으로 하겠습니다. 
const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

const game = {
    isPaused: false,
    isOver: false,
    isCleared: false,
    timeLeft: 180,
    lifeLeft: 3,
    score: 0,
    combo: 0,
};

let interval = null;
let timer = null;

const itemList = ["fire", "water", "stone", "air"];
