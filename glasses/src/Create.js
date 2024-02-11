import * as PIXI from "pixi.js";
import { setupFrames } from "./functions/functions";
const app = new PIXI.Application({ resizeTo: window });

const characters=[];
const glasses=[];
const walls=[];

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
create.character=(x,y,scale,still,animationSpeed,src,type)=>create.sprite(x,y,scale,still,animationSpeed,src,characters,sprite=>{
  sprite.velocity={x:0,y:0};
  sprite.type=type;
  sprite.equip=function(glasses){
    app.stage.removeChild(glasses);
    this.glasses = glasses;
  };
  sprite.shoot=function(xComponent, yComponent){
    const fireball = create.character(
      this.x,
      this.y,
      0.25,
      false,
      10,
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
      let SPEED = 15;
      fireball.x += xComponent * SPEED;
      fireball.y += yComponent * SPEED;
    };

    app.ticker.add(moveFireball);
  };
});
create.glasses=(x,y,scale,still,animationSpeed,src,powerUp)=>create.sprite(x,y,scale,still,animationSpeed,src,glasses,(sprite)=>{
  sprite.powerUp=powerUp;
});
create.walls=(x,y,scale,still,animationSpeed,src,type)=>create.sprite(x,y,scale,still,animationSpeed,src,walls,(sprite)=>{
  sprite.type=type
});




export {create,characters,walls,glasses,app};