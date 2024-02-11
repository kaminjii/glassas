import { setUpGui } from './setWalls'
import {create, characterArray, glassesArray, wallArray, app} from "./Create";
import { setUpMovement } from './functions/functions';
import { GLASSES, MOVEMENT_KEYS } from './enums/enums';
import { setupFrames } from './functions/functions';

setUpGui.createWall = create.walls;
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
  // console.log(bounds1,bounds2)
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
  // console.log(char,wall)
  char.velocity=reflect(char.velocity,norm);
};


app.ticker.add(()=>{
  for(let i=0;i<characterArray.length;i++){
    for(let j=i+1;j<characterArray.length;j++)
      if(checkCollisionWithCharacter(characterArray[i],characterArray[j]))
        resolveCollisionWithCharacter(characterArray[i],characterArray[j]);
    for(let j=0;j<glassesArray.length;j++)
      if(checkCollisionWithGlasses(characterArray[i],glassesArray[j]))
        resolveCollisionWithGlasses(characterArray[i],glassesArray[j]);
    for(let j=0;j<wallArray.length;j++)
      if(checkCollisionWithWalls(characterArray[i],wallArray[j]))
        resolveCollisionWithWalls(characterArray[i],wallArray[j])
  }
});

const canvas = app.view;
export { canvas };

window.play1=create.walls(100,200,1,true,0,'walls/UpperWall.svg');

window.crab = create.character(
  250,
  350,
  0.5,
  false,
  0.1,
  setupFrames("Assets/Crab", 4)
);
setUpMovement(app,window.crab,MOVEMENT_KEYS.ARROWS,250)

window.defaultGlasses = create.glasses(
  100, 600, 0.25, GLASSES.DEFAULT,
);

window.fireGlasses = create.glasses(
  300, 600, 0.25, GLASSES.FIRE,
);

window.xrayGlasses = create.glasses(
  500, 600, 0.25, GLASSES.XRAY,
);