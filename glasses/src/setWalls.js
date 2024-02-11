// import * as PIXI from "pixi.js";
import {create} from "./Create";
import GUI from "lil-gui";
import { GLASSES } from "./enums/enums";
import { setupFrames } from "./functions/functions";
const key = "evj&#%^hE']gsn2";

const walls = {
  newWall: "",
  wallType: "UpperWall",
  wallTypes: ["UpperWall","UpperWall6","UpperWall9","UpperWall13", "LowerWall","LowerWall5", "VerticalWall", "VerticalWall4"],
  glassType: GLASSES.FIRE,
  glassTypes: GLASSES,
  curWall: "",
  wallList: [],
  wallMap: {},
  addNewWall() {
    if (this.newWall == "" || this.wallMap[this.newWall]) return;
    this.wallList.push(this.newWall);

    this.wallMap[this.newWall] = create.walls(10,0,.4,true,0,
      'walls/'+this.wallType + ".svg",
      this.wallType
    );

    console.log(this.wallMap[this.newWall])
    this.curWall = this.newWall;
    this.newWall = "";
    
    addWallOptions();
  },
  addNewGlasses(){
    if (this.newWall == "" || this.wallMap[this.newWall]) return;
    this.wallList.push(this.newWall);

    this.wallMap[this.newWall] = create.glasses(10,0,.4,this.glassType);
    
    this.curWall = this.newWall;
    this.newWall = "";
    
    addWallOptions();
  },
  addNewCharacter(){
    if (this.newWall == "" || this.wallMap[this.newWall]) return;
    this.wallList.push(this.newWall);

    this.wallMap[this.newWall] = create.character(2,5,.4,false,3,setupFrames('assets/actual/crab1',4),'enemy');
    
    this.curWall = this.newWall;
    this.newWall = "";
    
    addWallOptions();
  },
  save() {
    const out={};
    for (let wall in this.wallMap) {
      const obj = {
        position: {x:this.wallMap[wall].x,y:this.wallMap[wall].y},
        rotation: this.wallMap[wall].rotation,
        scale: this.wallMap[wall].scale.x,
        class: this.wallMap[wall].class,
        type: this.wallMap[wall].type
      };
      out[wall]=obj;
      console.log(this.wallMap[wall])
    }
    const str=JSON.stringify(out);
    console.log(str);
    localStorage.setItem(key,str);
  },
};
//load
const loaded=JSON.parse(localStorage.getItem(key))
for(let obj in loaded){
  walls.wallList.push(obj);
  const x=loaded[obj].position.x,y=loaded[obj].position.y,s=loaded[obj].scale;
  if(loaded[obj].class=='character'){
    walls.wallMap[obj] = create.character(x,y,s,false,3,setupFrames('assets/actual/crab1',4),'enemy');
  }else if(loaded[obj].class=='glasses'){
    walls.wallMap[obj] = create.glasses(x,y,s,loaded[obj].type);
  }else if(loaded[obj].class=='walls'){
    walls.wallMap[obj] = create.walls(x,y,s,true,0,
      'walls/'+loaded[obj].type + ".svg",
      loaded[obj].type
    );
  }else{continue;}
  walls.wallMap[obj].rotation=loaded[obj].rotation;
}

const wallList = ["newWall", "save", "addNewWall","addNewGlasses", "addNewCharacter"];

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
  const add = (name,min,max,step) => {
    const pos = transform.addFolder(name);
    pos.add(walls.wallMap[wall][name], "x", min,max,step);
    pos.add(walls.wallMap[wall][name], "y", min,max,step);
  };
  transform.add(walls.wallMap[wall], "rotation", 0, 2 * Math.PI, 0.01);
  add("position",0, window.innerWidth, 0.1);
  add("scale",0.001,1.2,.001);
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

