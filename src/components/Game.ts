import * as PIXI from "pixi.js";
import assets from "../assets";
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
  button: ButtonInterface;
  score: number;
  winningSymbols: { [key: string]: SymbolInterface[] };
  winningSymbolIds: string[];

  scoreDisplay?: PIXI.Text;
  screen?: ScreenInterface;

  update(delta: number): void;
  spin(): void;
}

class Game implements GameInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  config: ConfigInterface;
  isSpinning: boolean;
  isEvaluating: boolean;
  assets: { [key: string]: any };
  button: ButtonInterface;
  score: number;
  winningSymbols: { [key: string]: SymbolInterface[] };
  winningSymbolIds: string[];

  scoreDisplay?: PIXI.Text;
  screen?: ScreenInterface;

  constructor(
    app: PIXI.Application<HTMLCanvasElement>,
    config: ConfigInterface
  ) {
    this.app = app;
    this.config = config;
    this.screen = undefined;
    this.assets = {};
    this.isSpinning = false;
    this.isEvaluating = false;
    this.score = this.config.defaultScore;
    this.scoreDisplay = undefined;
    this.winningSymbols = {};
    this.winningSymbolIds = [];
    this.button = new Button(
      this,
      (this.config.gameWidth - 200) / 2,
      this.config.gameHeight - 100 - 10,
      200,
      100,
      "Spin!"
    );

    this.loadAssets();
    this.createScoreDisplay();
  }
  async loadAssets() {
    console.log("Loading assets...");
    PIXI.Assets.addBundle("assets", assets);
    this.assets = await PIXI.Assets.loadBundle("assets");
  }
  createScreen() {
    this.screen = new Screen(this, this.config.numberOfReels);
  }
  createScoreDisplay() {
    this.scoreDisplay = new PIXI.Text(this.score, {
      fontFamily: "Arial",
      fontSize: 42,
      fontWeight: "bold",
      fill: "#ffffff",
    });
    this.scoreDisplay.x = (this.config.gameWidth - this.scoreDisplay.width) / 2;
    this.scoreDisplay.y =
      this.config.gameHeight -
      this.scoreDisplay.height -
      this.button.height -
      30;
    this.app.stage.addChild(this.scoreDisplay);
  }
  update(delta: number) {
    if (Object.keys(this.assets).length === 0) {
      console.log("Loading...");
    } else if (!this.screen) {
      this.createScreen();
    }

    this.screen && this.screen.update(delta);
    if (this.scoreDisplay) {
      this.scoreDisplay.text = this.score.toString();
    }

    if (this.screen && this.screen.isReadyForEvaluation && !this.isEvaluating) {
      this.isSpinning = false;
      this.evaluate();
    }
  }
  spin() {
    this.button.disable();
    this.isSpinning = true;
    this.screen && this.screen.spin();
  }
  evaluate() {
    console.log("Evaluating...");
    this.isEvaluating = true;

    let symbolsOnScreen: SymbolInterface[] = this.screen?.symbols || [];
    // let allSymbolsCopy = [...allSymbolsOnScreen];

    symbolsOnScreen.forEach((symbol) => {
      const numberOfMatching = symbolsOnScreen.filter(
        (symbol2) => symbol.id === symbol2.id
      ).length;

      if (numberOfMatching >= this.config.minMatch) {
        console.log(numberOfMatching, symbol.id);
        // TODO: winningSymbols = {[symbolName]: [symbol, symbol, symbol]}
        if (this.winningSymbols[symbol.id]) {
          this.winningSymbols[symbol.id].push(symbol);
        } else {
          this.winningSymbols[symbol.id] = [symbol];
        }

        this.winningSymbolIds.push(symbol.id);
      }
    });

    // this.willBeEvaluated = false;

    console.log(symbolsOnScreen);
    console.log(this.winningSymbols);
    this.handleWin();
  }
  handleWin() {
    console.log("Handle Win...");

    let uniqueWinningSymbols = new Set(this.winningSymbolIds);
    console.log(uniqueWinningSymbols);
    Object.values(this.winningSymbols).forEach((symbolGroup) => {
      symbolGroup.forEach((symbol) => {
        symbol.isWinning = true;
        console.log(symbol);
        setTimeout(() => {
          symbol.isWinning = true;
        }, 1000);
      });

      this.score += this.config.prize;
    });
    this.winningSymbols = {};
  }
}

export default Game;
