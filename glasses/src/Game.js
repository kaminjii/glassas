import { create, characterArray, glassesArray, wallArray, app } from "./Create";
import { setUpMovement } from "./functions/functions";
import { GLASSES, MOVEMENT_KEYS } from "./enums/enums";
import { setupFrames, normalize } from "./functions/functions";
import "./setWalls";

const MAX_DIST = 5000;

const dot = (a, b) => a.x * b.x + a.y * b.y;
const reflect = (dir, norm) => {
  const d = dot(dir, norm);
  return { x: dir.x - 2 * d * norm.x, y: dir.y - 2 * d * norm.y };
};

const checkCollisionWithCharacter = (charA, charB) => {
  if (charA.timer) {
    charA.timer--;
    return false;
  }
  if (charB.timer) {
    charB.timer--;
    return false;
  }
  const dist = (charA.x - charB.x) ** 2 + (charA.y - charB.y) ** 2;
  return dist < MAX_DIST;
};

const resolveCollisionWithCharacter = (charA, charB) => {
  if(charA.onCollision)charA.onCollision(charB);
  if(charB.onCollision)charB.onCollision(charA);
  charA.timer = 25;
  charB.timer = 25;
  const norm = {
    x: charA.x - charB.x,
    y: charA.y - charB.y,
  };
  normalize(norm);
  const push=(char,dir)=>{
    if(char.velocity.x<.05&&char.velocity.y<.05)
      char.velocity=dir;
    else
      char.velocity = normalize(reflect(char.velocity, norm));
    char.velocity.x *= 0.01;
    char.velocity.y *= 0.01;
    char.x += char.velocity.x * 1000;
    char.y += -char.velocity.y * 1000;
  }
  push(charB,{x:-norm.x,y:-norm.y});
  push(charA,norm);
};

const checkCollisionWithGlasses = (char, glass) => {
  if (char.timer) {
    char.timer--;
    return false;
  }
  const dist = (char.x - glass.x) ** 2 + (char.y - glass.y) ** 2;
  return dist < MAX_DIST;
};

// To be used in funcions.js to pick up glasses
export { checkCollisionWithGlasses };

const resolveCollisionWithGlasses=(char,glass)=>{
  if(char.onCollision)char.onCollision();
  if(glass.onCollision)glass.onCollision();
  char.timer = 10;
  glass.colliding.add(char);
};

const checkCollisionWithWalls = (char, wall) => {
  if (char.timer) {
    char.timer--;
    return false;
  }
  const bounds1 = char.getBounds();
  const bounds2 = wall.getBounds();
  // console.log(bounds1,bounds2)
  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
};

const resolveCollisionWithWalls = (char, wall) => {
  if(char.onCollision)char.onCollision();
  if(wall.onCollision)wall.onCollision();
  char.timer = 10;
  const norm = {
    x: char.x - wall.x,
    y: char.y - wall.y,
  };
  // console.log(char,wall)
  
  char.velocity = normalize(reflect(char.velocity, norm));
  char.velocity.x *= 0.01;
  char.velocity.y *= 0.01;
  char.x += char.velocity.x * 100;
  char.y += -char.velocity.y * 100;
  // console.log(char.velocity, char.x, char.y);
};

app.ticker.add(() => {
  for (let i = 0; i < characterArray.length; i++) {
    for (let j = i + 1; j < characterArray.length; j++)
      if (checkCollisionWithCharacter(characterArray[i], characterArray[j]))
        resolveCollisionWithCharacter(characterArray[i], characterArray[j]);
    for (let j = 0; j < glassesArray.length; j++)
      if (checkCollisionWithGlasses(characterArray[i], glassesArray[j]))
        resolveCollisionWithGlasses(characterArray[i], glassesArray[j]);
    for (let j = 0; j < wallArray.length; j++)
      if (checkCollisionWithWalls(characterArray[i], wallArray[j]))
        resolveCollisionWithWalls(characterArray[i], wallArray[j]);
  }
});

const canvas = app.view;
export { canvas };

//window.play1 = create.walls(100, 100, 1, true, 0, "walls/UpperWall.svg");

// window.crab = create.character(
//   250,
//   350,
//   0.3,
//   false,
//   0.1,
//   setupFrames("Assets/Crab", 4)
// );

// setUpMovement(app, window.crab, MOVEMENT_KEYS.ARROWS, 1500);

window.eye = create.character(
  550,
  350,
  0.5,
  false,
  0.1,
  setupFrames("Assets/Eye", 3)
);

window.cat = create.character(
  550,
  600,
  0.5,
  false,
  0.1,
  ["./Assets/Cat/cat1.png","./Assets/Cat/cat2.png","./Assets/Cat/cat3.png","./Assets/Cat/cat4.png"]
)
// window.defaultGlasses = create.glasses(
//   50, 600, 0.25, GLASSES.DEFAULT,
// );

// window.fireGlasses = create.glasses(
//   200, 600, 0.25, GLASSES.FIRE,
// );

// window.xrayGlasses = create.glasses(
//   350, 600, 0.25, GLASSES.XRAY,
// );

// window.loveGlasses = create.glasses(
//   500, 600, 0.25, GLASSES.LOVE,
// );

// window.hateGlasses = create.glasses(
//   650, 600, 0.25, GLASSES.HATE,
// );

// Check Love/Hate Glasses
const button=create.glasses(200,200,.01,{
  name: "Button",
  path: "Assets/button.png",
  dialog: "hold to open door.",
});
const moveWall=create.walls(100,100,.4,true,0,"walls/VerticalWall4.svg",'move')
let buttonPressed=false;
button.onCollision=()=>{
  buttonPressed=true;
};
app.ticker.add(()=>{
  if(buttonPressed)
    moveWall.alpha=.2;
  else
    moveWall.alpha=1;
  buttonPressed=false;
},0)


const loveHate = (delta) => {
  let dx = window.eye.x - window.crab.x;
  let dy = window.eye.y - window.crab.y;
  let angle = Math.atan2(dy, dx);
  if (window.crab?.glasses?.name === GLASSES.LOVE.name) {
    window.eye.velocity.x += -(Math.cos(angle) / 250);
    window.eye.velocity.y += Math.sin(angle)  / 250;
  } else if (window.crab?.glasses?.name === GLASSES.HATE.name) {
    window.eye.velocity.x -= -(Math.cos(angle) / 10);
    window.eye.velocity.y -= Math.sin(angle)  / 10;
  }
};
app.ticker.add(loveHate);
