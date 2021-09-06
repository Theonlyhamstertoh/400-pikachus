import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  // what this does is chose the already created canvas as the app canvas
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  backgroundColor: 0x6495ed,
  width: 640,
  height: 480,
});

const image = new Image();

const bunny: PIXI.Sprite = PIXI.Sprite.from("assets/bunny.png");
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
app.stage.addChild(bunny);
