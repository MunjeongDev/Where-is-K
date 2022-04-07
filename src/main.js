"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const K_COUNT = 4;
const YONGSOOK_COUNT = 5;
const JEHEE_COUNT = 5;
const GUNWOOK_COUNT = 5;
const GAME_DURATION_SEC = 15;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame;
});

const gameField = new Field(
  K_COUNT,
  YONGSOOK_COUNT,
  GUNWOOK_COUNT,
  JEHEE_COUNT
);
gameField.setClickListener(onItemClick);

function onItemClick(event) {
  if (!started) {
    return;
  }

  if (item === "K") {
    // 케이다!

    score++;
    updateScoreBoard();
    if (score === K_COUNT) {
      finishGame(true);
    }
  } else if (item === "Gunwook") {
    finishGame(false);
  } else if (item === "Yongsook") {
    finishGame(false);
  } else if (item === "Jehee") {
    finishGame(false);
  }
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.playBackground();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText("REPLAY❓");
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playOthers();
  }
  stopGameTimer();
  sound.stopBackground();
  gameFinishBanner.showWithText(
    win ? "구경이 대본집을 얻었어🎉" : "케이를 찾지 못했어💩"
  );
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(K_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
  score = 0;
  gameScore.innerText = K_COUNT;
  gameField.init();
}

function updateScoreBoard() {
  gameScore.innerText = K_COUNT - score;
}
