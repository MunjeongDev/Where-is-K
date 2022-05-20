"use strict";

import * as sound from "./sound.js";

const imgSize = 100;

export default class Field {
  constructor(K_COUNT, YONGSOOK_COUNT, JEHEE_COUNT, GUNWOOK_COUNT) {
    this.K_COUNT = K_COUNT;
    this.YONGSOOK_COUNT = YONGSOOK_COUNT;
    this.JEHEE_COUNT = JEHEE_COUNT;
    this.GUNWOOK_COUNT = GUNWOOK_COUNT;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();

    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("K", this.K_COUNT, "img/k.png");
    this._addItem("Yongsook", this.YONGSOOK_COUNT, "img/yongsook.png");
    this._addItem("Jehee", this.JEHEE_COUNT, "img/jehee.png");
    this._addItem("Gunwook", this.GUNWOOK_COUNT, "img/gunwook.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - imgSize;
    const y2 = this.fieldRect.height - imgSize;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".K")) {
      // 케이다!
      target.remove();
      sound.playK();
      this.onItemClick && this.onItemClick(".K");
    } else if (target.matches(".Gunwook")) {
      this.onItemClick && this.onItemClick(".Gunwook");
      playSound(gunwookSound);
    } else if (target.matches(".Yongsook")) {
      this.onItemClick && this.onItemClick(".Yongsook");
      playSound(yongsookSound);
    } else if (target.matches(".Jehee")) {
      this.onItemClick && this.onItemClick(".Jehee");
      playSound(jeheeSound);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
