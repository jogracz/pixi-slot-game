import * as PIXI from "pixi.js";

import "./style.css";

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 800,
  height: 600,
  backgroundColor: "black",
  // resizeTo: window,
});

window.onload = async () => {
  document.body.appendChild(app.view);
};
