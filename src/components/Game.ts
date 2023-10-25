import * as PIXI from "pixi.js";

export interface GameInterface {
  isSpinning: boolean;
  app: PIXI.Application<HTMLCanvasElement>;
  // spinButton: PIXI.Sprite;
  update(delta: number): void;
}

export class Game implements GameInterface {
  isSpinning: boolean;
  app: PIXI.Application<HTMLCanvasElement>;
  // spinButton: PIXI.Sprite;

  constructor(app: PIXI.Application<HTMLCanvasElement>) {
    this.app = app;
    this.isSpinning = false;
    // this.spinButton = undefined
  }
  update(delta: number) {}
  spin() {
    this.isSpinning = true;
  }
}
