import * as PIXI from "pixi.js";
import { GameInterface } from "./Game";

export interface ReelInterface {
  game: GameInterface;
  x: number;
  y: number;
  reelLength: number;
  container: PIXI.Container;
  isSpinning: boolean;
  symbols: any[];

  update(delta: number): void;
  spin(): void;
}

class Reel implements ReelInterface {
  game: GameInterface;
  x: number;
  y: number;
  reelLength: number;
  container: PIXI.Container;
  isSpinning: boolean;
  symbols: any[];

  constructor(game: GameInterface, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.symbols = [];
    this.reelLength = game.config.reelLength;
    this.isSpinning = false;
    this.container = new PIXI.Container();

    this.game.app.stage.addChild(this.container);

    // symbol
    // when it's outside of the screen view, remove from the array (.markedForDeletion)
    // (from Pixi docs: or set .renderable to false on an object you dont want to render)
  }
  update(delta: number) {
    this.symbols.forEach((symbol, index) => {
      symbol.update();
    });
  }
  createSymbols() {}
  cleanReel() {
    this.symbols = [];
    this.container.removeChildren();
  }
  spin() {
    this.isSpinning = true;
    if (this.symbols.length > 0) {
      this.cleanReel();
    }
    this.createSymbols();
  }
}
export default Reel;
