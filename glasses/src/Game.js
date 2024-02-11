import * as PIXI from "pixi.js";

const app = new PIXI.Application({ resizeTo: window });

const characters=[];
const glasses=[];
const walls=[];
const createCharacter=(src,type)=>{
  const sprite=PIXI.Sprite.from(src);
  sprite.type=type;
  characters.push(sprite);
  return sprite;
}
const createGlasses=(src)=>{
  const sprite=PIXI.Sprite.from(src);
  glasses.push(sprite);
  return sprite;
}
const createWalls=(src)=>{
  const sprite=PIXI.Sprite.from(src);
  walls.push(sprite);
  return sprite;
}

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


const canvas = app.view;
export { canvas };
