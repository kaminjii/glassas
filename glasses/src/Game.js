import * as PIXI from "pixi.js";

const app = new PIXI.Application({ resizeTo: window });

const characterList = [];
class character extends PIXI.Sprite {
  #velocity = { x: 0, y: 0 };
  #direction = { x: 0, y: 0 };
  constructor() {
    characterList.push(this);
  }
}

const MAX_DIST = 5;
const checkCollision = (a, b) => {
  const dist = (characterList[a].x - b.x) ** 2 + (a.y - b.y) ** 2;
  return dist < MAX_DIST;
};

const resolveCollision = (a, b) => {};

app.ticker.add(() => {
  for (let i = 0; i < characterList.length - 1; i++)
    for (let j = i + 1; j < characterList.length; j++)
      if (checkCollision(i, j)) resolveCollision(i, j);
});

const canvas = app.view;
export { canvas };
