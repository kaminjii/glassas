import * as PIXI from "pixi.js";

import { app } from "../Game2";
import { setupFrames, setUpMovement } from "../functions/functions";

class Entity {
  constructor(
    x,
    y,
    scale,
    frames,
    animationSpeed = null,
    movementKeys = null,
    movementSpeed = null
  ) {
    this.sprite = new PIXI.AnimatedSprite(
      frames.map((frame) => PIXI.Texture.from(frame))
    );

    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.scale.x = scale;
    this.sprite.scale.y = scale;
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = animationSpeed;
    this.sprite.play();

    if (movementKeys && movementSpeed)
      setUpMovement(this.sprite, movementKeys, movementSpeed);

    app.stage.addChild(this.sprite);
  }
  equip(glasses) {
    app.stage.removeChild(glasses.sprite);
    this.glasses = glasses;
  }
  shoot(xComponent, yComponent) {
    let fireball = new Entity(
      this.sprite.x,
      this.sprite.y,
      0.25,
      setupFrames("assets/actual/fireball", 3)
    );

    // Turn it into unit vectors first
    let magnitude = Math.sqrt(xComponent ** 2 + yComponent ** 2);
    xComponent /= magnitude;
    yComponent /= -magnitude;

    const moveFireball = (delta) => {
      if (
        fireball.sprite.x < 0 ||
        fireball.sprite.x > app.screen.width ||
        fireball.sprite.y < 0 ||
        fireball.sprite.y > app.screen.height
      ) {
        app.stage.removeChild(fireball.sprite);
        app.ticker.remove(moveFireball);
        return;
      }
      let SPEED = 15;
      fireball.sprite.x += xComponent * SPEED;
      fireball.sprite.y += yComponent * SPEED;
    };

    app.ticker.add(moveFireball);
  }
}

class Glasses extends Entity {
  constructor(x, y, scale, frames, animationSpeed, powerUp) {
    super(x, y, scale, frames, animationSpeed, null, null);
    this.powerUp = powerUp;
  }
}

export { Entity, Glasses };
