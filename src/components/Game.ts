import * as PIXI from "pixi.js";

import { ConfigInterface } from "../config";

export interface GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  isSpinning: boolean;
  // spinButton: PIXI.Sprite;
  update(delta: number): void;
}

export class Game implements GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  isSpinning: boolean;
  // spinButton: PIXI.Sprite;

  constructor(
    app: PIXI.Application<HTMLCanvasElement>,
    config: ConfigInterface
  ) {
    this.app = app;
    this.config = config;
    this.isSpinning = false;
    // this.spinButton = undefined
  }
  update(delta: number) {}
  spin() {
    this.isSpinning = true;
  }
}
