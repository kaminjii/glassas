import * as PIXI from "pixi.js";

const MOVEMENT_KEYS = {
  WASD: ["w", "a", "s", "d"],
  ARROWS: ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"],
};

const setUpMovement = (entity, movementKeys, movementSpeed) => {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case movementKeys[0]:
        entity.y -= movementSpeed;
        break;
      case movementKeys[1]:
        entity.x -= movementSpeed;
        break;
      case movementKeys[2]:
        entity.y += movementSpeed;
        break;
      case movementKeys[3]:
        entity.x += movementSpeed;
        break;
    }
  });
};

const app = new PIXI.Application({
  background: "#1099bb",
  resizeTo: window,
});

document.body.appendChild(app.view);

const setupFrames = (directory, numberOfFrames) => {
  return Array(numberOfFrames)
    .fill()
    .map((_, i) => `${directory}/${i + 1}.gif`);
};

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

    this.sprite.animationSpeed = 0.1;
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

    let SPEED = 15;

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

let crab = new Entity(
  app.screen.width / 2,
  app.screen.height / 2,
  0.5,
  setupFrames("assets/actual/crab1", 4),
  0.1,
  MOVEMENT_KEYS.ARROWS,
  15
);

const POWER_UPS = {
  SIGHT: "Sight",
  SPEED: "Speed",
  DAMAGE: "Damage",
};

let basicGlasses = new Glasses(
  app.screen.width / 2 + 100,
  app.screen.height / 2 + 100,
  0.1,
  ["assets/actual/glasses.png"],
  0.1,
  POWER_UPS.SIGHT
);

const canvas = app.view;
export { canvas };
