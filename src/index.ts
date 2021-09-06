import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  backgroundColor: 0x6495ed,
  width: 640,
  height: 480,
});
