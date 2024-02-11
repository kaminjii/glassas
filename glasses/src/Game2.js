import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  background: "#1099bb",
  resizeTo: window,
});

export { app };

const { Entity, Glasses } = require("./classes/classes");
const { MOVEMENT_KEYS, POWER_UPS } = require("./enums/enums");
const { setupFrames } = require("./functions/functions");

document.body.appendChild(app.view);

let crab = new Entity(
  app.screen.width / 2,
  app.screen.height / 2,
  0.5,
  setupFrames("assets/actual/crab1", 4),
  0.1,
  MOVEMENT_KEYS.ARROWS,
  15
);

let basicGlasses = new Glasses(
  app.screen.width / 2 + 100,
  app.screen.height / 2 + 100,
  0.1,
  ["assets/actual/glasses.png"],
  0.1,
  POWER_UPS.SIGHT
);

window.crab = crab;
window.basicGlasses = basicGlasses;

const canvas = app.view;
export { canvas };
