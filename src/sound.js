"use strict";

const kSound = new Audio("./sound/k.wav");
const gunwookSound = new Audio("./sound/gunwook.wav");
const jeheeSound = new Audio("./sound/jehee.wav");
const yongsookSound = new Audio("./sound/yongsook.wav");

const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.wav");
const othersSound = new Audio("./sound/koo.wav");
const winSound = new Audio("./sound/game_win.mp3");

export function playK() {
  playSound(kSound);
}

export function playGunwook() {
  playSound(gunwookSound);
}
export function playJehee() {
  playSound(jeheeSound);
}

export function playYongsook() {
  playSound(yongsookSound);
}
export function playAlert() {
  playSound(alertSound);
}
export function playBackground() {
  playSound(bgSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

export function playOthers() {
  playSound(othersSound);
}
export function playWin() {
  playSound(winSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
