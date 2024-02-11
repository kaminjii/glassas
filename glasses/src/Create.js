import * as PIXI from "pixi.js";
import { setupFrames } from "./functions/functions";
const app = new PIXI.Application({
  background: "#3D253B",
  resizeTo: window,
});

const characterArray = [];
const glassesArray = [];
const wallArray = [];

const background = PIXI.Sprite.from("./Background.svg");
background.scale.x = app.screen.width / 3799;
background.scale.y = app.screen.height / 2268;
app.stage.addChildAt(background);

window.addEventListener("resize", (e) => {
  background.scale.x = app.screen.width / 3799;
  background.scale.y = app.screen.height / 2268;
});

window.onresize = function (e) {
  background.w = app.screen.width;
  background.height = app.screen.height;
};

const create = {};
create.sprite = (x, y, scale, still, animationSpeed, src, arr, callback) => {
  let sprite;
  if (still) sprite = PIXI.Sprite.from(src);
  else
    sprite = new PIXI.AnimatedSprite(
      src.map((frame) => PIXI.Texture.from(frame))
    );

  sprite.x = x;
  sprite.y = y;
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  sprite.anchor.set(0.5);
  if (!still) {
    sprite.animationSpeed = animationSpeed;
    sprite.play();
  }
  if (callback) callback(sprite);
  if (arr) arr.push(sprite);
  // console.log("adding", sprite);
  app.stage.addChild(sprite);
  return sprite;
};

create.character=(x,y,scale,still,animationSpeed,src,type)=>create.sprite(x,y,scale,still,animationSpeed,src,characterArray,sprite=>{
  sprite.velocity = {x: 0, y: 0};
  sprite.type = type;
  sprite.class='character';
  sprite.hp = 100;
  sprite.equip = function (newGlasses) {
    if(newGlasses.type==='button')return;
    // If character already has glasses, add it back to the scene to "drop" it
    if (this.glasses) {
      this.glasses.x = this.x;
      this.glasses.y = this.y;
      app.stage.addChild(this.glasses);
      if(glassesArray.findIndex(val=>val==this.glasses)==-1)
        glassesArray.push(this.glasses);
    }
    // Equip the new glasses and remove it from the scene
    this.glasses = newGlasses;
    app.stage.removeChild(newGlasses);
    glassesArray.splice(glassesArray.findIndex(val=>val==newGlasses),1,0);
        
    // alert(glasses.dialog);
  };
  sprite.shoot=function() {
    if(this.timer&&this.timer%10!=0)
        return;
    let xComponent = this.velocity.x;
    let yComponent = this.velocity.y;
    const fireball = create.character(
      this.x,
      this.y,
      0.25,
      false,
      .1,
      setupFrames("Assets/Fireball", 3),
      "fireball"
    );

    fireball.onCollision = (sprite) => {
      if (sprite && sprite.type !== "player") {
        sprite.hp -= 50;
        if (sprite.hp <= 0) {
          app.stage.removeChild(sprite);
          characterArray.splice(characterArray.findIndex(val=>val==sprite),1);
        }
        app.stage.removeChild(fireball);
        app.ticker.remove(moveFireball);
      }
    }
        
    // Turn it into unit vectors first
    let magnitude = Math.sqrt(xComponent ** 2 + yComponent ** 2);
    xComponent /= magnitude;
    yComponent /= -magnitude;

    const moveFireball = (delta) => {
      if (
        fireball.x < 0 ||
        fireball.x > app.screen.width ||
        fireball.y < 0 ||
        fireball.y > app.screen.height
      ) {
        app.stage.removeChild(fireball);
        app.ticker.remove(moveFireball);
        characterArray.splice(characterArray.findIndex(val=>val==fireball),1)
        return;
      }
      let SPEED = 12;
      fireball.x += xComponent * SPEED;
      fireball.y += yComponent * SPEED;
    };

    app.ticker.add(moveFireball);
    };
  }
);

create.glasses = (x, y, scale, glasses,type) => {
  return create.sprite(x, y, scale, true, 0, glasses.path, glassesArray, (sprite) => {
    sprite.name = glasses.name;
    sprite.dialog = glasses.dialog;
    sprite.type = type||glasses;
    sprite.colliding = new Set();
    sprite.class='glasses';
  });
};

create.walls = (x, y, scale, still, animationSpeed, src, type) =>
  create.sprite(
    x,
    y,
    scale,
    still,
    animationSpeed,
    src,
    wallArray,
    (sprite) => {
      sprite.type = type;
      sprite.class = "walls";
    }
  );

export { create, characterArray, wallArray, glassesArray, app };
