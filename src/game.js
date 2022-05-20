"use strict";

import Field from "./field.js";
import * as sound from "./sound.js";

// Builder Pattern
export default class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  K_COUNT(num) {
    this.K_COUNT = num;
    return this;
  }
  YONGSOOK_COUNT(num) {
    this.YONGSOOK_COUNT = num;
    return this;
  }
  GUNWOOK_COUNT(num) {
    this.GUNWOOK_COUNT = num;
    return this;
  }
  JEHEE_COUNT(num) {
    this.JEHEE_COUNT = num;
    return this;
  }
  build() {
    return new Game(
      this.gameDuration,
      this.K_COUNT,
      this.GUNWOOK_COUNT,
      this.JEHEE_COUNT,
      this.YONGSOOK_COUNT
    );
  }
}

class Game {
  constructor(
    gameDuration,
    K_COUNT,
    YONGSOOK_COUNT,
    GUNWOOK_COUNT,
    JEHEE_COUNT
  ) {
    this.gameDuration = gameDuration;
    this.K_COUNT = K_COUNT;
    this.YONGSOOK_COUNT = YONGSOOK_COUNT;
    this.JEHEE_COUNT = JEHEE_COUNT;
    this.GUNWOOK_COUNT = GUNWOOK_COUNT;

    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameBtn = document.querySelector(".game__button");

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(
      K_COUNT,
      YONGSOOK_COUNT,
      GUNWOOK_COUNT,
      JEHEE_COUNT
    );
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop("cancel");
  }

  finish(win) {
    this.started = false;
    this.hideGameButton();
    if (win) {
      sound.playWin();
    } else {
      sound.playOthers();
    }
    this.stopGameTimer();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }

    if (item === "K") {
      // 케이다!

      this.score++;
      this.updateScoreBoard();
      if (this.score === this.K_COUNT) {
        this.finish(true);
      }
    } else if (item === "Gunwook") {
      this.finish(false);
    } else if (item === "Yongsook") {
      this.finish(false);
    } else if (item === "Jehee") {
      this.finish(false);
    }
  };

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.K_COUNT === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.K_COUNT;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.K_COUNT - this.score;
  }
}
