// import * as PIXI from "pixi.js";
import GUI from "lil-gui";
import { GLASSES } from "./enums/enums";
// const key = "thomasheheh";

const setUpGui = {};
const walls = {
  newWall: "",
  wallType: "UpperWall",
  wallTypes: ["UpperWall","UpperWall6","UpperWall9","UpperWall13", "LowerWall","LowerWall5", "VerticalWall", "VerticalWall4"],
  glassType: GLASSES.FIRE,
  glassTypes: GLASSES,
  curWall: "",
  wallList: [],
  wallMap: {},
  addNew() {
    if (this.newWall == "" || this.wallMap[this.newWall]) return;
    this.wallList.push(this.newWall);

    this.wallMap[this.newWall] = setUpGui.create.wall(10,0,4,true,0,
      'walls/'+this.wallType + ".svg",
      this.type
    );
    console.log(this.wallMap[this.newWall])
    this.curWall = this.newWall;
    this.newWall = "";
    
    addWallOptions();
  },
  save() {
    for (let wall in this.wallMap) {
      const obj = {
        position: wall.position,
        scale: wall.scale,
        type: wall.type
      };
      console.log(obj);
    }
  },
  addNewGlasses(){
    if (this.newWall == "" || this.wallMap[this.newWall]) return;
    this.wallList.push(this.newWall);

    this.wallMap[this.newWall] = setUpGui.create.glasses(10,0,4,this.glassType);
    
    this.curWall = this.newWall;
    this.newWall = "";
    
    addWallOptions();
  }
};
const wallList = ["newWall", "addNew", "save","addNewGlasses"];

const gui = new GUI();
for (let i of wallList) gui.add(walls, i);

gui.add(walls, "wallType", walls.wallTypes);

let selector;
let transform;
function addTransformFolder(wall) {
  if (transform) transform.destroy();
  transform = gui.addFolder("transform");
  if (wall == "") return;
  console.log(wall);
  const add = (name) => {
    const pos = transform.addFolder(name);
    pos.add(walls.wallMap[wall][name], "x", 0, window.innerWidth, 0.1);
    pos.add(walls.wallMap[wall][name], "y", 0, window.innerHeight, 0.1);
  };
  transform.add(walls.wallMap[wall], "rotation", 0, 2 * Math.PI, 0.01);
  add("position");
  add("scale");
}

function addWallOptions() {
  if (selector) {
    selector.destroy();
    if(transform){
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

export { setUpGui };
