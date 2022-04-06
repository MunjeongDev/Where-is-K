"use strict";
import PopUp from "./popup.js";

const imgSize = 100;
const K_COUNT = 4;
const YONGSOOK_COUNT = 5;
const JEHEE_COUNT = 5;
const GUNWOOK_COUNT = 5;
const GAME_DURATION_SEC = 15;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const kSound = new Audio("./sound/k.wav");
const gunwookSound = new Audio("./sound/gunwook.wav");
const jeheeSound = new Audio("./sound/jehee.wav");
const yongsookSound = new Audio("./sound/yongsook.wav");

const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.wav");
const othersSound = new Audio("./sound/koo.wav");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame;
});

field.addEventListener("click", onFieldClick);
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
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText("REPLAY❓");
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(othersSound);
  }
  stopGameTimer();
  stopSound(bgSound);
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
  field.innerHTML = "";
  gameScore.innerText = K_COUNT;

  // 케이와 다른 등장인물을 생성한 뒤 field에 추가한다

  addItem("K", K_COUNT, "img/k.png");
  addItem("Yongsook", YONGSOOK_COUNT, "img/yongsook.png");
  addItem("Jehee", JEHEE_COUNT, "img/jehee.png");
  addItem("Gunwook", GUNWOOK_COUNT, "img/gunwook.png");
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".K")) {
    // 케이다!
    target.remove();
    score++;
    playSound(kSound);
    updateScoreBoard();
    if (score === K_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".Gunwook")) {
    finishGame(false);
    playSound(gunwookSound);
  } else if (target.matches(".Yongsook")) {
    finishGame(false);
    playSound(yongsookSound);
  } else if (target.matches(".Jehee")) {
    finishGame(false);
    playSound(jeheeSound);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = K_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - imgSize;
  const y2 = fieldRect.height - imgSize;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
