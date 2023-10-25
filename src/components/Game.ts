import * as PIXI from "pixi.js";
import assets from "../assets";
import { ConfigInterface } from "../config";
import Button from "./Button";
import Screen, { ScreenInterface } from "./Screen";

export interface GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  screen: ScreenInterface;
  isSpinning: boolean;
  assets: { [key: string]: any };
  button: PIXI.Graphics;

  update(delta: number): void;
  spin(): void;
}

class Game implements GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  screen: ScreenInterface;
  isSpinning: boolean;
  assets: { [key: string]: any };
  button: PIXI.Graphics;

  constructor(
    app: PIXI.Application<HTMLCanvasElement>,
    config: ConfigInterface
  ) {
    this.app = app;
    this.config = config;
    this.screen = new Screen(this, config.numberOfReels);
    this.assets = {};
    this.isSpinning = false;
    this.button = new Button(
      this,
      (this.config.gameWidth - 200) / 2,
      this.config.gameHeight - 100 - 10,
      200,
      100,
      "Spin!"
    );

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
    console.log("Spinning!");
    this.isSpinning = true;
  }
}

export default Game;
