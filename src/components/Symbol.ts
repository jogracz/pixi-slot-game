import * as PIXI from "pixi.js";

import { random } from "../helpers";
import { GameInterface } from "./Game";

export interface SymbolInterface {
  game: GameInterface;
  speed: number;
  isSpinning: boolean;
  isWinning: boolean;
  symbolName: string;

  update(delta: number): void;
  getRandomSymbol(): void;
  handleWin(): void;
}

export class Symbol extends PIXI.Sprite {
  game: GameInterface;
  id: string;
  speed: number;
  isSpinning: boolean;
  isMarkedForDeletion: boolean;
  isWinning: boolean;

  constructor(
    game: GameInterface,
    texture: PIXI.Texture,
    x: number,
    id: string
  ) {
    super(texture);
    this.game = game;
    this.id = id;
    this.speed = game.config.spinningSpeed;
    this.x = x;
    this.y = 0;
    this.isSpinning = true;
    this.isMarkedForDeletion = false;
    this.isWinning = false;

    // todo
    // generate random number from 0 to symbols.length
    // and add this symbol sprite to the scene with y position = -spriteHeight
    // and add speed to it on every render (y += speed),
    // add symbol to visibleSymbols array
    // when it's outside of the screen view, remove from the array (.markedForDeletion) (from Pixi docs: or set .renderable to false on an object you dont want to render)
  }
  update(delta: number) {
    this.handleRemove();
  }
  getRandomSymbol() {}
  handleWin() {}
  handleRemove() {
    if (this.y > this.game.config.srceenHeight) {
      this.isMarkedForDeletion = true;
    }
  }
}
