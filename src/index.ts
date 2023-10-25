import * as PIXI from "pixi.js";

import "./style.css";
import config, { ConfigInterface } from "./config";

const app = new PIXI.Application<HTMLCanvasElement>({
  width: config.gameWidth,
  height: config.gameHeight,
  backgroundColor: config.backgroundColor,
  // resizeTo: window,
});

window.onload = async () => {
  document.body.appendChild(app.view);
};
