import * as PIXI from "pixi.js";
import { setupFrames } from "./functions/functions";
const app = new PIXI.Application({
  background: "#1099bb",
  resizeTo: window
});

const characterArray=[];
const glassesArray=[];
const wallArray=[];

const create={};
create.sprite=(x,y,scale,still,animationSpeed,src,arr,callback)=>{
  let sprite;
  if(still)
    sprite=PIXI.Sprite.from(src);
  else
    sprite = new PIXI.AnimatedSprite(
      src.map((frame) => PIXI.Texture.from(frame))
    );

  sprite.x = x;
  sprite.y = y;
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  sprite.anchor.set(0.5);
  if(!still){
    sprite.animationSpeed = animationSpeed;
    sprite.play();
  }
  if(callback)
    callback(sprite);
  if(arr)
    arr.push(sprite);
  console.log('adding',sprite)
  app.stage.addChild(sprite);
  return sprite;
};
create.character=(x,y,scale,still,animationSpeed,src,type)=>create.sprite(x,y,scale,still,animationSpeed,src,characterArray,sprite=>{
  sprite.velocity = {x: 0, y: 0};
  sprite.type = type;
  sprite.equip = function (glasses) {
    this.glasses = glasses;
    app.stage.removeChild(glasses);
    alert(glasses.dialog);
  };
  sprite.shoot=function(){
    let xComponent = this.velocity.x;
    let yComponent = this.velocity.y;
    const fireball = create.character(
      this.x,
      this.y,
      0.25,
      false,
      .1,
      setupFrames("assets/actual/fireball", 3)
    );

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
        return;
      }
      let SPEED = 12;
      fireball.x += xComponent * SPEED;
      fireball.y += yComponent * SPEED;
    };

    app.ticker.add(moveFireball);
  };
});

create.glasses = (x, y, scale, glasses) => {
  return create.sprite(x, y, scale, true, 0, glasses.path, glassesArray, (sprite) => {
    sprite.name = glasses.name;
    sprite.dialog = glasses.dialog;
  });
};

create.walls=(x,y,scale,still,animationSpeed,src,type)=>create.sprite(x,y,scale,still,animationSpeed,src,wallArray,(sprite)=>{
  sprite.type=type
});

export {create, characterArray, wallArray, glassesArray, app};