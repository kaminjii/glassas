import * as PIXI from "pixi.js";
MOVEMENT_SPEED = 5;

function setUpMovement(character, keys) {
  window.addEventListener("keydown", (e) => {
    keyPressed = e.key();

    switch (keyPressed) {
      case keys[0]:
        character.y += MOVEMENT_SPEED;
      case keys[1]:
        character.x -= MOVEMENT_SPEED;
      case keys[2]:
        character.y -= MOVEMENT_SPEED;
      case keys[3]:
        character.x += MOVEMENT_SPEED;
    }
  });
}
