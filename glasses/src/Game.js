import {setUpGui} from './setWalls'
import {create,characters,glasses,walls,app} from "./Create";
import { setUpMovement } from './functions/functions';
import { MOVEMENT_KEYS } from './enums/enums';

setUpGui.createWall=create.walls;
const MAX_DIST=5;

const dot=(a,b)=>a.x*b.x+a.y*b.y;
const reflect=(dir,norm)=>{
  const d=dot(dir,norm);
  return {x:(dir.x-2*d*norm.x),y:(dir.y-2*d*norm.y)};
}

const checkCollisionWithCharacter=(charA,charB)=>{
  const dist=(charA.x-charB.x)**2+(charA.y-charB.y)**2;
  return dist<MAX_DIST;
};

const resolveCollisionWithCharacter=(charA,charB)=>{
  if(charA.type==charB.type)
    return;
  const norm={
    x:charA.x-charB.x,
    y:charA.y-charB.y
  };
  charA.velocity=reflect(charA.velocity,norm);
  charB.velocity=reflect(charB.velocity,norm);
}

const checkCollisionWithGlasses=(char,glass)=>{
  const dist=(char.x-glass.x)**2+(char.y-glass.y)**2;
  return dist<MAX_DIST;
};

const resolveCollisionWithGlasses=(char,glass)=>{
  char.equip(glass);
};

const checkCollisionWithWalls=(char,wall)=>{
  const bounds1 = char.getBounds();
  const bounds2 = wall.getBounds();

  return bounds1.x < bounds2.x + bounds2.width
      && bounds1.x + bounds1.width > bounds2.x
      && bounds1.y < bounds2.y + bounds2.height
      && bounds1.y + bounds1.height > bounds2.y;
};

const resolveCollisionWithWalls=(char,wall)=>{
  const norm={
    x:char.x-wall.x,
    y:char.y-wall.y
  };
  char.velocity=reflect(char.velocity,norm);
};


app.ticker.add(()=>{
  for(let i=0;i<characters.length-1;i++){
    for(let j=i+1;j<characters.length;j++)
      if(checkCollisionWithCharacter(characters[i],characters[j]))
        resolveCollisionWithCharacter(characters[i],characters[j]);
    for(let j=i+1;j<glasses.length;j++)
      if(checkCollisionWithGlasses(characters[i],glasses[j]))
        resolveCollisionWithGlasses(characters[i],glasses[j]);
    for(let j=i+1;j<walls.length;j++)
      if(checkCollisionWithWalls(characters[i],walls[j]))
        resolveCollisionWithWalls(characters[i],walls[j])
  }
});

window.play1=create.character(100,200,1,true,0,'walls/UpperWall.svg');
window.play2=create.character(200,200,1,true,0,'walls/UpperWall.svg');
setUpMovement(app,window.play1,MOVEMENT_KEYS.ARROWS,1)
setUpMovement(app,window.play2,MOVEMENT_KEYS.WASD,1)

const canvas = app.view;
export { canvas };
