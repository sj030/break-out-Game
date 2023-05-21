"use strict";
// 전역변수 작성 영역

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

const game = {
    isPaused: false,
    isOver: false,
};

let interval = null;
