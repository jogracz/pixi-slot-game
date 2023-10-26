import * as PIXI from "pixi.js";
import { Howl } from "howler";

import { images, sounds } from "../assets";
import { ConfigInterface } from "../config";
import Button, { ButtonInterface } from "./Button";
import Screen, { ScreenInterface } from "./Screen";
import { SymbolInterface } from "./Symbol";

export interface GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  isSpinning: boolean;
  isEvaluating: boolean;
  assets: { [key: string]: any };
  score: number;
  winningSymbols: { [key: string]: SymbolInterface[] };
  winningSymbolIds: string[];
  assetsLoaded: boolean;
  isReadyForReset: boolean;
  sounds: { [key: string]: Howl };
  soundPlayed: boolean;

  loader?: PIXI.Text;
  button?: ButtonInterface;
  scoreDisplay?: PIXI.Text;
  screen?: ScreenInterface;

  update(): void;
  createScreen(): void;
  createButton(): void;
  createLoader(): void;
  createScoreDisplay(): void;
  mountComponents(): void;
  evaluate(): void;
  handleWinorLoose(): void;
  handleReadyForReset(): void;
  playLostSound(): void;
  playWonSound(): void;
  spin(): void;
  reset(): void;
}

class Game implements GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  isSpinning: boolean;
  isEvaluating: boolean;
  assets: { [key: string]: any };
  score: number;
  winningSymbols: { [key: string]: SymbolInterface[] };
  winningSymbolIds: string[];
  assetsLoaded: boolean;
  isReadyForReset: boolean;
  sounds: { [key: string]: Howl };
  soundPlayed: boolean;

  loader?: PIXI.Text;
  button?: ButtonInterface;
  scoreDisplay?: PIXI.Text;
  screen?: ScreenInterface;

  constructor(
    app: PIXI.Application<HTMLCanvasElement>,
    config: ConfigInterface
  ) {
    this.app = app;
    this.config = config;
    this.assets = {};
    this.isSpinning = false;
    this.isEvaluating = false;
    this.score = this.config.defaultScore;
    this.winningSymbols = {};
    this.winningSymbolIds = [];
    this.assetsLoaded = false;
    this.isReadyForReset = false;
    this.sounds = {
      symbol: new Howl({ src: sounds.symbolSoundUrl }),
      lost: new Howl({ src: sounds.lostSoundUrl }),
      won: new Howl({ src: sounds.wonSoundUrl }),
    };
    this.soundPlayed = false;

    this.loadAssets();
    this.createLoader();
  }
  async loadAssets() {
    console.log("Loading assets...");
    PIXI.Assets.addBundle("assets", images);
    this.assets = await PIXI.Assets.loadBundle("assets");
  }
  update() {
    if (Object.keys(this.assets).length > 0 && !this.screen) {
      this.assetsLoaded = true;
      this.mountComponents();
    }

    this.screen && this.screen.update();
    if (this.scoreDisplay) {
      this.scoreDisplay.text = `${this.score} $`;
    }

    if (this.screen && this.screen.isReadyForEvaluation && !this.isEvaluating) {
      this.isSpinning = false;
      this.evaluate();
    }

    this.handleReadyForReset();
  }
  createScreen() {
    this.screen = new Screen(this, this.config.numberOfReels);
  }
  createButton() {
    this.button = new Button(
      this,
      (this.config.gameWidth - 200) / 2,
      this.config.gameHeight - 100 - 10,
      200,
      100,
      "Spin!"
    );
  }
  createLoader() {
    this.loader = new PIXI.Text("Loading...", {
      fontFamily: "Arial",
      fontSize: 42,
      fontWeight: "bold",
      fill: "#66CCCC",
    });
    this.loader.x = (this.config.gameWidth - this.loader.width) / 2;
    this.loader.y = (this.config.gameHeight - this.loader.height) / 2;
    this.app.stage.addChild(this.loader);
  }
  createScoreDisplay() {
    this.scoreDisplay = new PIXI.Text(`${this.score} $`, {
      fontFamily: "Arial",
      fontSize: 42,
      fontWeight: "bold",
      fill: "#ffffff",
    });
    this.scoreDisplay.x = (this.config.gameWidth - this.scoreDisplay.width) / 2;
    this.scoreDisplay.y =
      this.config.gameHeight - this.scoreDisplay.height - 130;
    this.app.stage.addChild(this.scoreDisplay);
  }
  mountComponents() {
    this.createScreen();
    this.createButton();
    this.createScoreDisplay();
    this.loader && this.app.stage.removeChild(this.loader);
  }
  spin() {
    console.log("Spinning...");

    this.button && this.button.disable();
    this.isSpinning = true;
    this.screen && this.screen.spin();
  }
  evaluate() {
    console.log("Evaluating...");

    this.isEvaluating = true;

    let symbolsOnScreen: SymbolInterface[] = this.screen?.symbols || [];

    symbolsOnScreen.forEach((symbol) => {
      const numberOfMatching = symbolsOnScreen.filter(
        (symbol2) => symbol.id === symbol2.id
      ).length;

      if (numberOfMatching >= this.config.minMatch) {
        if (this.winningSymbols[symbol.id]) {
          this.winningSymbols[symbol.id].push(symbol);
        } else {
          this.winningSymbols[symbol.id] = [symbol];
        }

        this.winningSymbolIds.push(symbol.id);
      }
    });

    this.handleWinorLoose();
  }
  handleWinorLoose() {
    console.log("Handling Win or Loose...");

    if (this.winningSymbolIds.length === 0) {
      setTimeout(() => {
        this.score -= this.config.prize;
      }, 150);
      !this.soundPlayed && this.playLostSound();
    }

    Object.values(this.winningSymbols).forEach((symbolGroup) => {
      symbolGroup.forEach((symbol) => {
        setTimeout(() => {
          symbol.isWinning = true;
        }, 150);
      });
      setTimeout(() => {
        this.score += this.config.prize;
        !this.soundPlayed && this.playWonSound();
      }, 150);
    });
  }
  handleReadyForReset() {
    if (this.isEvaluating) {
      if (Object.keys(this.winningSymbols).length > 0) {
        if (
          Object.values(this.winningSymbols)[0].every(
            (symbol) => symbol.isTextureUpdated
          )
        ) {
          this.isReadyForReset = true;
        }
      } else {
        this.isReadyForReset = true;
      }
    }

    if (this.isReadyForReset) {
      this.reset();
    }
  }
  playLostSound() {
    this.soundPlayed = true;
    this.sounds.lost.play();
  }
  playWonSound() {
    this.soundPlayed = true;
    this.sounds.won.play();
  }
  reset() {
    console.log("Resetting");
    console.log("--------");

    this.screen?.reset();
    this.isReadyForReset = false;
    this.isSpinning = false;
    this.isEvaluating = false;
    this.winningSymbols = {};
    this.winningSymbolIds = [];
    this.soundPlayed = false;
    this.button?.enable();
  }
}

export default Game;
