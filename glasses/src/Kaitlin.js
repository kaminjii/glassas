import * as PIXI from "pixi.js";

const app = new PIXI.Application({ background: "#e0e0e0", resizeTo: window });

const temp = PIXI.Sprite.from("./assets/actual/crab1/1.gif");

app.stage.addChild(temp);
temp.anchor.set(0.5);
temp.x = window.innerWidth / 2;
temp.y = window.innerHeight / 2;

const canvas = app.view;
export { canvas };
