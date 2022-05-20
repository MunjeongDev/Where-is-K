"use strict";
import PopUp from "./popup.js";
import GameBuilder from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder();
.gameDuration(15)
.K_COUNT(4)
.YONGSOOK_COUNT(5)
.GUNWOOK_COUNT(5)
.JEHEE_COUNT(5)
.build();

game.setGameStopListener(reason => {
  console.log(reason);
  let message;
  switch (reason) {
    case "cancel":
      message = "Replay❓";
      break;
    case "win":
      message = "구경이 대본집을 찾았어!🎉";
      break;
    case "lose":
      message = "아..내 대본집을 찾아줘..💧";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
