import * as PIXI from 'pixi.js'
import GUI from 'lil-gui'

const key='thomasheheh';

const setUpGui={}
const walls={
  newWall:'',
  wallType:'Upper',
  wallTypes:['Upper','Lower','Vertical'],
  curWall:'',
  wallList:[],
  wallMap:{},
  addNew(){
    if(this.newWall==''||this.wallMap[this.newWall])
      return;
    this.wallList.push(this.newWall);

    this.wallMap[this.newWall]=setUpGui.createWall(0,0,.4,true,0,this.wallType+'Wall.svg',this.type)
    
    this.curWall=this.newWall;
    this.newWall='';
    //gui.reset();
    addWallOptions();
  },
  save(){
    console.log(this.wallMap)
  }
};
const wallList=['newWall','addNew','save'];

const gui=new GUI();
for(let i of wallList)
  gui.add(walls,i);

gui.add(walls,'wallType',walls.wallTypes);

let selector;
let transform;
function addTransformFolder(wall){
  if(transform)
   transform.destroy();
  transform=gui.addFolder('transform');
  if(wall=='')return;
  console.log(wall)
  const add=(name,min,max,step)=>{
    const pos=transform.addFolder(name);
    pos.add(walls.wallMap[wall][name],'x',min,max,step)
    pos.add(walls.wallMap[wall][name],'y',min,max,step)
  }
  transform.add(walls.wallMap[wall],'rotation',0,2*Math.PI,.01)
  add('position',0,window.innerHeight,.1);
  add('scale',0,2,.01);
}

function addWallOptions(){
  if(selector){
    selector.destroy();
    if(transform){
      transform.destroy();
      transform=null;
    }
  }
  selector=gui.addFolder('selector');
  selector.add(walls,'curWall',walls.wallList).onChange(wall=>addTransformFolder(wall));
  addTransformFolder(walls.curWall)
}

addWallOptions();

export {setUpGui};