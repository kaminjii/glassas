import * as PIXI from "pixi.js";

const app = new PIXI.Application({ background: "#e0e0e0", resizeTo: window });

function setup(sprite, character, speed) {
  function followCharacter(delta) {
    const dx = character.x - sprite.x;
    const dy = character.y - sprite.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const directionX = dx / distance;
    const directionY = dy / distance;

    sprite.x += directionX * speed * delta;
    sprite.y += directionY * speed * delta;
  }

  const activateFollow = () => {
    app.ticker.add(followCharacter);
  };

  const deactivateFollow = () => {
    app.ticker.remove(followCharacter);
  };

  return { activateFollow, deactivateFollow };
}

const canvas = app.view;
export { canvas };
