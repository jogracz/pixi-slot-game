import * as PIXI from "pixi.js";
import assets from "../assets";
import { ConfigInterface } from "../config";
import Screen, { ScreenInterface } from "./Screen";

export interface GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  screen: ScreenInterface;
  isSpinning: boolean;

  assets?: {};

  // spinButton: PIXI.Sprite;
  update(delta: number): void;
}

class Game implements GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  screen: ScreenInterface;

  isSpinning: boolean;
  // spinButton: PIXI.Sprite;

  assets?: {};

  constructor(
    app: PIXI.Application<HTMLCanvasElement>,
    config: ConfigInterface
  ) {
    this.app = app;
    this.config = config;
    this.screen = new Screen(this, config.numberOfReels);
    this.assets = undefined;
    this.isSpinning = false;
    // this.spinButton = undefined

    this.loadAssets();

    console.log("Hello, it's the Game!");
  }
  async loadAssets() {
    console.log("Loading assets...");
    PIXI.Assets.addBundle("assets", assets);
    this.assets = await PIXI.Assets.loadBundle("assets");
  }
  update(delta: number) {}
  spin() {
    this.isSpinning = true;
  }
}

export default Game;
