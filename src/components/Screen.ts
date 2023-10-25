import * as PIXI from "pixi.js";
import { GameInterface } from "./Game";
import Reel, { ReelInterface } from "./Reel";
import { SymbolInterface } from "./Symbol";

export interface ScreenInterface {
  game: GameInterface;
  reels: ReelInterface[];
  numberOfReels: number;
  isSpinning: boolean;
  isReadyForEvaluation: boolean;
  container: PIXI.Container;
  symbols: SymbolInterface[];

  update(): void;
  createReels(): void;
  spin(): void;
  saveSymbols(): void;
  reset(): void;
}

class Screen implements ScreenInterface {
  game: GameInterface;
  reels: ReelInterface[];
  numberOfReels: number;
  isSpinning: boolean;
  isReadyForEvaluation: boolean;
  container: PIXI.Container;
  symbols: SymbolInterface[];

  constructor(game: GameInterface, numberOfReels: number) {
    this.game = game;
    this.reels = [];
    this.numberOfReels = numberOfReels;
    this.isSpinning = false;
    this.isReadyForEvaluation = false;
    this.symbols = [];
    this.container = new PIXI.Container();

    this.container.x =
      (this.game.config.gameWidth - this.game.config.screenWidth) / 2;
    this.game.app.stage.addChild(this.container);

    this.createReels();
  }
  update() {
    this.reels.forEach((reel, index) => {
      reel.update();
    });

    if (this.isSpinning) {
      this.reels.forEach((reel, index) => {
        if (!reel.isSpinning) {
          if (index === 0) {
            reel.spin();
          } else if (this.reels[index - 1].isReadyForEvaluation) {
            reel.spin();
          }
        }
      });
    }

    if (this.reels.every((reel: ReelInterface) => reel.isReadyForEvaluation)) {
      this.isReadyForEvaluation = true;
      this.isSpinning = false;
      if (this.symbols.length === 0) {
        this.saveSymbols();
      }
    }
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
    this.isSpinning = true;
    this.removeOldReels();
  }
  saveSymbols() {
    this.reels.forEach((reel) => {
      this.symbols.push(...reel.symbols);
    });
  }
  removeOldReels() {
    if (this.container.children.length > this.numberOfReels) {
      for (let i = 0; i < this.numberOfReels; i++) {
        this.container.removeChildAt(0);
      }
    }
  }
  reset() {
    this.isReadyForEvaluation = false;
    this.reels = [];
    this.isSpinning = false;
    this.symbols = [];
    this.createReels();
  }
}

export default Screen;
