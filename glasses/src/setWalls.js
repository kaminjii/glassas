// import * as PIXI from "pixi.js";
import { create,app } from "./Create";
import GUI from "lil-gui";
import { GLASSES } from "./enums/enums";
import { setupFrames,setUpMovement } from "./functions/functions";
import { MOVEMENT_KEYS } from "./enums/enums";
const key = "evj&#%^hE']gsn2";

const walls = {
  newWall: "",
  wallType: "UpperWall",
  wallTypes: [
    "UpperWall",
    "UpperWall6",
    "UpperWall9",
    "UpperWall13",
    "LowerWall",
    "LowerWall5",
    "VerticalWall",
    "VerticalWall4",
  ],
  glassType: GLASSES.FIRE,
  glassTypes: GLASSES,
  curWall: "",
  wallList: [],
  wallMap: {},
  player1:create.character(0,0,.7,false,.1,["Assets/Character/Char1.png","Assets/Character/Char2.png","Assets/Character/Char3.png","Assets/Character/Char4.png"],'player'),
  addNewWall() {
    if (this.newWall == "" || this.wallMap[this.newWall]) return;
    this.wallList.push(this.newWall);

    this.wallMap[this.newWall] = create.walls(
      10,
      0,
      0.3,
      true,
      0,
      "walls/" + this.wallType + ".svg",
      this.wallType
    );

    console.log(this.wallMap[this.newWall]);
    this.curWall = this.newWall;
    this.newWall = "";

    addWallOptions();
  },
  addNewGlasses() {
    if (this.newWall == "" || this.wallMap[this.newWall]) return;
    this.wallList.push(this.newWall);

    this.wallMap[this.newWall] = create.glasses(10, 0, 0.4, this.glassType);

    this.curWall = this.newWall;
    this.newWall = "";

    addWallOptions();
  },
  addNewCharacter() {
    if (this.newWall == "" || this.wallMap[this.newWall]) return;
    this.wallList.push(this.newWall);

    this.wallMap[this.newWall] = create.character(
      2,
      5,
      0.4,
      false,
      .1,
      setupFrames("Assets/Crab", 4),
      "enemy"
    );
    console.log(this.wallMap[this.newWall]);
    this.curWall = this.newWall;
    this.newWall = "";

    addWallOptions();
  },
  remove(){
    if (this.curWall=='' || !this.wallMap[this.curWall]) return;
    this.wallList.splice(this.wallList.findIndex(val=>val==this.wallMap[this.curWall]),1)
    this.wallMap[this.curWall]=undefined;
    this.curWall='';
    this.newWall='';
    addWallOptions();
  },
  save() {
    const out = {};
    for (let wall in this.wallMap) {
      if(!this.wallMap[wall]) continue;
      const obj = {
        position: { x: this.wallMap[wall].x, y: this.wallMap[wall].y },
        rotation: this.wallMap[wall].rotation,
        scale: this.wallMap[wall].scale.x,
        class: this.wallMap[wall].class,
        type: this.wallMap[wall].type,
      };
      out[wall] = obj;
      console.log(this.wallMap[wall]);
    }
    out.pos1={x:this.player1.x,y:this.player1.y};
    const str = JSON.stringify(out);
    console.log(str);
    localStorage.setItem(key, str);
  },
};
//load
const loaded = JSON.parse(localStorage.getItem(key));
for (let obj in loaded) {
  if(obj=='pos1'||obj=='pos2')
    continue;
  walls.wallList.push(obj);
  const x = loaded[obj].position.x,
    y = loaded[obj].position.y,
    s = loaded[obj].scale;
  if (loaded[obj].class == "character") {
    walls.wallMap[obj] = create.character(
      x,
      y,
      s,
      false,
      .1,
      setupFrames("Assets/Crab", 4),
      "enemy"
    );
  } else if (loaded[obj].class == "glasses") {
    walls.wallMap[obj] = create.glasses(x, y, s, loaded[obj].type);
  } else if (loaded[obj].class == "walls") {
    walls.wallMap[obj] = create.walls(
      x,
      y,
      s,
      true,
      0,
      "walls/" + loaded[obj].type + ".svg",
      loaded[obj].type
    );
  } else {
    continue;
  }
  walls.wallMap[obj].rotation = loaded[obj].rotation;
}
if(loaded?.pos1){
  walls.player1.x=loaded.pos1.x||0;
  walls.player1.y=loaded.pos1.y||0;
}
setUpMovement(app, walls.player1, MOVEMENT_KEYS.ARROWS, 200);
window.crab=walls.player1

const wallList = [
  "newWall",
  "save",'remove',
  "addNewWall",
  "addNewGlasses",
  "addNewCharacter",
];

const gui = new GUI();
for (let i of wallList) gui.add(walls, i);

gui.add(walls, "wallType", walls.wallTypes);
gui.add(walls, "glassType", walls.glassTypes);

let selector;
let transform;
function addTransformFolder(wall) {
  if (transform) transform.destroy();
  transform = gui.addFolder("transform");
  if (wall == "") return;
  console.log(wall);
  const add = (name, min, max, step) => {
    const pos = transform.addFolder(name);
    pos.add(walls.wallMap[wall][name], "x", min, max, step);
    pos.add(walls.wallMap[wall][name], "y", min, max, step);
  };
  transform.add(walls.wallMap[wall], "rotation", 0, 2 * Math.PI, 0.01);
  add("position", 0, window.innerWidth, 0.1);
  add("scale", 0.001, 1.2, 0.001);
}

function addWallOptions() {
  if (selector) {
    selector.destroy();
    if (transform) {
      transform.destroy();
      transform = null;
    }
  }
  selector = gui.addFolder("selector");
  selector
    .add(walls, "curWall", walls.wallList)
    .onChange((wall) => addTransformFolder(wall));
  addTransformFolder(walls.curWall);
}

addWallOptions();

export {walls}