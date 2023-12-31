import * as PIXI from "pixi.js";

import { GameInterface } from "./Game";

export interface SymbolInterface extends PIXI.Sprite {
  game: GameInterface;
  speed: number;
  row: number;
  isInTargetPlace: boolean;
  isSpinning: boolean;
  isWinning: boolean;
  id: string;
  isTextureUpdated: boolean;
  winningTexture: PIXI.Texture;
  isReadyForReset: boolean;
  soundPlayed: boolean;

  update(): void;
  handleWin(): void;
  handleRemove(): void;
  playSound(): void;
}

export class Symbol extends PIXI.Sprite {
  game: GameInterface;
  id: string;
  speed: number;
  row: number;
  isInTargetPlace: boolean;
  isSpinning: boolean;
  isMarkedForDeletion: boolean;
  isWinning: boolean;
  isTextureUpdated: boolean;
  winningTexture: PIXI.Texture;
  isReadyForReset: boolean;
  soundPlayed: boolean;

  constructor(
    game: GameInterface,
    texture: PIXI.Texture,
    x: number,
    id: string,
    row: number
  ) {
    super(texture);
    this.game = game;
    this.id = id;
    this.speed = game.config.spinningSpeed;
    this.x = x;
    this.y = -250 * row;
    this.row = row;
    this.width = game.config.symbolWidth;
    this.height = game.config.symbolHeight;
    this.isInTargetPlace = false;
    this.isSpinning = true;
    this.isMarkedForDeletion = false;
    this.isWinning = false;
    this.winningTexture = this.game.assets[`${id}_connect`];
    this.isTextureUpdated = false;
    this.isReadyForReset = false;
    this.soundPlayed = false;
  }
  update() {
    if (
      this.y <
      this.game.config.srceenHeight - this.height - this.height * this.row
    ) {
      this.y += this.speed;
    } else {
      this.isInTargetPlace = true;
      !this.soundPlayed && this.playSound();
    }

    this.handleWin();
    this.handleRemove();
  }
  handleWin() {
    if (this.isWinning && !this.isTextureUpdated) {
      this.texture = this.winningTexture;
      this.isTextureUpdated = true;
      this.isReadyForReset = true;
    }
  }
  handleRemove() {
    if (this.y > this.game.config.srceenHeight) {
      this.isMarkedForDeletion = true;
    }
  }
  playSound() {
    this.soundPlayed = true;
    this.game.sounds.symbol.play();
  }
}
