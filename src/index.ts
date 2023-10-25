import * as PIXI from "pixi.js";

import "./style.css";
import config from "./config";
import { Game } from "./components/Game";

const app = new PIXI.Application<HTMLCanvasElement>({
  width: config.gameWidth,
  height: config.gameHeight,
  backgroundColor: config.backgroundColor,
  // resizeTo: window,
});

window.onload = async () => {
  document.body.appendChild(app.view);
};

const game = new Game(app, config);

app.ticker.add((delta) => {
  game.update(delta);
});
