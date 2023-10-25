import * as PIXI from "pixi.js";

import { ConfigInterface } from "../config";
import Screen, { ScreenInterface } from "./Screen";

export interface GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  screen: ScreenInterface;
  isSpinning: boolean;
  // spinButton: PIXI.Sprite;
  update(delta: number): void;
}

class Game implements GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  screen: ScreenInterface;
  isSpinning: boolean;
  // spinButton: PIXI.Sprite;

  constructor(
    app: PIXI.Application<HTMLCanvasElement>,
    config: ConfigInterface
  ) {
    this.app = app;
    this.config = config;
    this.screen = new Screen(this, config.numberOfReels);
    this.isSpinning = false;
    // this.spinButton = undefined

    console.log("Hello, it's the Game!");
  }
  update(delta: number) {}
  spin() {
    this.isSpinning = true;
  }
}

export default Game;
