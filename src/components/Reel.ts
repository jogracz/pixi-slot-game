import * as PIXI from "pixi.js";

import { random } from "../helpers";
import { GameInterface } from "./Game";
import { Symbol, SymbolInterface } from "./Symbol";

export interface ReelInterface {
  game: GameInterface;
  x: number;
  y: number;
  reelLength: number;
  container: PIXI.Container;
  isSpinning: boolean;
  isReadyForEvaluation: boolean;
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
  isReadyForEvaluation: boolean;
  symbols: any[];

  constructor(game: GameInterface, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.symbols = [];
    this.reelLength = game.config.reelLength;
    this.isSpinning = false;
    this.isReadyForEvaluation = false;
    this.container = new PIXI.Container();

    this.game.app.stage.addChild(this.container);

    // symbol
    // when it's outside of the screen view, remove from the array (.markedForDeletion)
    // (from Pixi docs: or set .renderable to false on an object you dont want to render)
  }
  update(delta: number) {
    this.symbols.forEach((symbol) => {
      symbol.update();
    });

    if (this.symbols.length > 0) {
      if (
        this.symbols.every((symbol: SymbolInterface) => symbol.isInTargetPlace)
      ) {
        this.isReadyForEvaluation = true;
      }
    }
  }
  getRandomSymbol(row: number): PIXI.Sprite {
    const symbolIds = this.game.config.symbolIds;
    const randomNumber = random(0, symbolIds.length);
    const randomSymbolId = symbolIds[randomNumber];
    const randomTexture = this.game.assets[randomSymbolId];
    return new Symbol(this.game, randomTexture, this.x, randomSymbolId, row);
  }
  generateSymbols() {
    for (let i = 0; i < this.reelLength; i++) {
      const newSymbol = this.getRandomSymbol(i);
      this.container.addChild(newSymbol);

      this.symbols.push(newSymbol);
    }
  }
  cleanReel() {
    this.symbols = [];
    this.container.removeChildren();
  }
  spin() {
    console.log("Spinning from Reel");
    this.isSpinning = true;
    if (this.symbols.length > 0) {
      this.cleanReel();
    }
    this.generateSymbols();
  }
}
export default Reel;
