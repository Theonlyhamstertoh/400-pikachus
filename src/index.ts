import * as PIXI from "pixi.js";

import { AsciiFilter } from "@pixi/filter-ascii";
import { DotFilter } from "@pixi/filter-dot";
import "./styles.css";
const app = new PIXI.Application({
  // what this does is chose the already created canvas as the app canvas
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  width: window.innerWidth,
  height: window.innerHeight,
  // backgroundColor: 0x222222,
  backgroundAlpha: 0.8,
  autoDensity: true,
  antialias: true,
});

interface Bunny {
  sprite: PIXI.Sprite;
  initialPosition: Position;
  speed: number;
  direction: number;
}

interface Position {
  x: number;
  y: number;
}

const bunnies: Array<Bunny> = [];
const totalBunnies: Number = 400;

// container
const bunnyContainer: PIXI.Container = new PIXI.Container();
const colorMatrixFilter = new PIXI.filters.ColorMatrixFilter();
app.stage.filters = [new AsciiFilter(5)];
// loader
const loader = PIXI.Loader.shared;
loader.add("assets/pikachu.png").load(assetManager);

function assetManager(loader, resources) {
  const texture = resources["assets/pikachu.png"].texture;

  for (let i = 0; i < totalBunnies; i++) {
    const bunny: PIXI.Sprite = new PIXI.Sprite(texture);
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    bunny.rotation = Math.random() * Math.PI * 2;
    // random color generator
    const color: number = Math.floor(Math.random() * 0xffffff) + 12345;
    bunny.tint = color;
    bunny.scale.set(Math.random() * 0.5 + 0.4);
    bunnies.push({
      sprite: bunny,
      initialPosition: { x, y },
      speed: Math.random() * 0.01,
      direction: Math.random() * Math.PI * 2,
    });
    bunnyContainer.addChild(bunny);
  }
}

let hue = 219;
app.ticker.add((delta) => {
  const elapsedTime = app.ticker.lastTime / 1000;
  hue += 0.3;
  document.body.style.backgroundColor = `hsl(${hue}, 79%, 66%)`;
  bunnies.forEach((bunny: Bunny) => {
    bunny.sprite.rotation += bunny.speed * delta;
    bunny.sprite.x =
      bunny.initialPosition.x +
      Math.cos(bunny.direction + elapsedTime) +
      Math.sin(bunny.direction + elapsedTime) * 100 * Math.cos(Math.PI * 2 + elapsedTime);
    bunny.sprite.y = bunny.initialPosition.y + Math.sin(bunny.direction + elapsedTime) * 100;
    // bunny.sprite.position.y = Math.sin(bunny.direction + elapsedTime) * 10;
    // bunny.rotation += 0.05 * delta;
    // bunny.position.x += Math.cos(-Math.PI) * 4;
    // bunny.position.y += Math.sin(Math.PI) * 4;
  });
});

app.stage.addChild(bunnyContainer);
