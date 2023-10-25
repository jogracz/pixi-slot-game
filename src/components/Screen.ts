import * as PIXI from "pixi.js";
import { GameInterface } from "./Game";
import Reel, { ReelInterface } from "./Reel";

export interface ScreenInterface {
  game: GameInterface;
  reels: ReelInterface[];
  numberOfReels: number;
  isSpinning: boolean;
  container: PIXI.Container;

  update(delta: number): void;
  spin(): void;
}

class Screen implements ScreenInterface {
  game: GameInterface;
  reels: ReelInterface[];
  numberOfReels: number;
  isSpinning: boolean;
  container: PIXI.Container;

  constructor(game: GameInterface, numberOfReels: number) {
    this.game = game;
    this.reels = [];
    this.numberOfReels = numberOfReels;
    this.isSpinning = false;
    this.container = new PIXI.Container();
    this.container.x =
      (this.game.config.gameWidth - this.game.config.screenWidth) / 2;

    this.game.app.stage.addChild(this.container);

    this.createReels();
  }
  update(delta: number) {
    this.reels.forEach((reel) => {
      reel.update(delta);
    });
  }
  createReels() {
    // create reels
    for (let i = 0; i < this.numberOfReels; i++) {
      const x = i * this.game.config.reelWidth;
      const y = 0;
      this.reels.push(new Reel(this.game, x, y));
    }
    this.reels.forEach((reel) => {
      this.container.addChild(reel.container);
    });
  }
  spin() {
    console.log("SPINNING from Screen");
    this.reels.forEach((reel) => {
      reel.spin();
    });
  }
}

export default Screen;
