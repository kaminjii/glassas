import * as PIXI from "pixi.js";

const app = new PIXI.Application({ background: "#e0e0e0", resizeTo: window });

function setFollowCharacter(sprite, character, speed) {
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

function setPushObject(sprite, character) {
  function pushObject(delta) {
    if (collision) {
      if (!sprite.parent) {
        sprite.parentGroup = character;
        spriteRelativeX = sprite.x - character.x;
        spriteRelativeY = sprite.y - character.y;
      }
    } else {
      if (sprite.parent === character) {
        app.stage.addChild(sprite);
        spriteRelativeX = 0;
        spriteRelativeY = 0;
      }
    }

    if (sprite.parent === character) {
      sprite.x = character.x + spriteRelativeX;
      sprite.y = character.y + spriteRelativeY;
    }
  }

  const activatePush = () => {
    app.ticker.add(pushObject);
  };

  const deactivatePush = () => {
    app.ticker.remove(pushObject);
  };
}

if (detectCollision(sprite, character)) {
  sprite.parent = character;
}

const canvas = app.view;
export { canvas };
