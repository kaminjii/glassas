import * as PIXI from "pixi.js";
import {setUpGui} from './setWalls'
import { setupFrames,setUpMovement } from "./functions/functions";

const app = new PIXI.Application({ resizeTo: window });

const characters=[];
const glasses=[];
const walls=[];
const createSprite=(x,y,scale,still,animationSpeed,src,arr,callback)=>{
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
  arr.push(sprite);
  app.stage.addChild(sprite);
  return sprite;
};
const createCharacter=(x,y,scale,still,animationSpeed,src,type)=>createSprite(x,y,scale,still,animationSpeed,src,characters,sprite=>{
  sprite.velocity={x:0,y:0};
  sprite.type=type;
  sprite.equip=function(glasses){
    app.stage.removeChild(glasses);
    this.glasses = glasses;
  };
  sprite.shoot=function(xComponent, yComponent){
    const fireball = createCharacter(
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
const createGlasses=(x,y,scale,still,animationSpeed,src,powerUp)=>createSprite(x,y,scale,still,animationSpeed,src,glasses,(sprite)=>{
  sprite.powerUp=powerUp;
});
const createWalls=(x,y,scale,still,animationSpeed,src,type)=>createSprite(x,y,scale,still,animationSpeed,src,walls,(sprite)=>{
  sprite.type=type
});
setUpGui.createWall=createCharacter;
const MAX_DIST=5;
const checkCollision=(charA,charB)=>{
  const dist=(charA.x-charB.x)**2+(charA.y-charB.y)**2;
  return dist<MAX_DIST;
};

const resolveCollision=(charA,charB)=>{
  const dir={
    x:charA.x-charB.x,
    y:charA.y-charB.y
  };

}

const checkCollisionWithGlasses=(char,glass)=>{

};

const resolveCollisionWithGlasses=(char,glass)=>{

};

const checkCollisionWithWalls=(char,wall)=>{
  const bounds1 = char.getBounds();
  const bounds2 = wall.getBounds();

  return bounds1.x < bounds2.x + bounds2.width
      && bounds1.x + bounds1.width > bounds2.x
      && bounds1.y < bounds2.y + bounds2.height
      && bounds1.y + bounds1.height > bounds2.y;
};
const dot=(a,b)=>a.x*b.x+a.y*b.y;

const resolveCollisionWithWalls=(char,wall)=>{
  const norm={
    x:char.x-wall.x,
    y:char.y-wall.y
  };
  const d=dot(char.velocity,norm);
  char.velocity={x:(char.velocity.x-2*d*norm.x),y:(char.velocity.y-2*d*norm.y)};
};


app.ticker.add(()=>{
  for(let i=0;i<characters.length-1;i++){
    for(let j=i+1;j<characters.length;j++)
      if(checkCollision(characters[i],characters[j]))
        resolveCollision(characters[i],characters[j]);
    for(let j=i+1;j<glasses.length;j++)
      if(checkCollisionWithGlasses(characters[i],glasses[j]))
        resolveCollisionWithGlasses(characters[i],glasses[j]);
    for(let j=i+1;j<walls.length;j++)
      if(checkCollisionWithWalls(characters[i],walls[j]))
        resolveCollisionWithWalls(characters[i],walls[j])
  }
});

window.crab=createCharacter(200,200,1,true,0,'UpperWall.svg');

const canvas = app.view;
export { canvas };
