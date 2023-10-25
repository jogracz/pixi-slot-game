import * as PIXI from "pixi.js";

import { GameInterface } from "./Game";

export interface ButtonInterface extends PIXI.Graphics {
  game: GameInterface;
  text: string;
  isDisabled: boolean;

  draw(): void;
  addText(): void;
  handleOnlick(): void;
  disable(): void;
  enable(): void;
}

class Button extends PIXI.Graphics {
  game: GameInterface;
  text: string;
  isDisabled: boolean;

  constructor(
    game: GameInterface,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
  ) {
    super();
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.isDisabled = false;
    this.cursor = "pointer";

    this.draw();
    this.addText();
    this.handleOnlick();

    this.game.app.stage.addChild(this);
  }
  draw() {
    this.beginFill("#c45fb3");
    this.drawRect(0, 0, 200, 100);
    this.endFill();
  }
  addText() {
    const text = new PIXI.Text(this.text, {
      fontFamily: "Arial",
      fontSize: 34,
      fontWeight: "bold",
      fill: "#e6c42e",
    });
    text.x = (this.width - text.width) / 2;
    text.y = (this.height - text.height) / 2;

    this.addChild(text);
  }
  handleOnlick() {
    this.onpointerdown = () => {
      if (!this.isDisabled) {
        this.game.spin();
      }
    };
    this.eventMode = "static";
  }
  disable() {
    this.isDisabled = true;
    this.cursor = "auto";
    this.alpha = 0.5;
  }
  enable() {
    this.isDisabled = false;
    this.cursor = "pointer";
    this.alpha = 1;
  }
}
export default Button;
