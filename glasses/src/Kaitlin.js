import * as PIXI from "pixi.js";

const app = new PIXI.Application({ background: "#e0e0e0", resizeTo: window });

function setup(sprite, character, speed){
  function followCharacter (delta) {
    const dx = character.x - sprite.x;
    const dy = character.y - sprite.y;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const directionX = dx / distance;
    const directionY = dy / distance;
    
    sprite.x += directionX * speed * delta;
    sprite.y += directionY * speed * delta;
  };

  const activateFollow = () => {
    app.ticker.add(followCharacter);
  };

  const deactivateFollow = () => {
    app.ticker.remove(followCharacter);
  }

  return {activateFollow, deactivateFollow}
};

function getXEdges(object) {
  return [object.x - object.width / 2, object.x + object.width / 2];
}

function getYEdges(object) {
  return [object.y - object.height / 2, object.y + object.height / 2];
}

function distBetweenEdge(sprite, character) {
  let spriteEdgeX = getXEdges(sprite);
  let spriteEdgesY = getYEdges(sprite);

  let characterEdgeX = getXEdges(character);
  let characterEdgesY = getYEdges(character);

}

const moveSprite(sprite, character) => {
  app.ticker.add(() => {
    const dx = character.x - sprite.x;
    const dy = character.y - sprite.y;
      
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5){

    };
  })
};

const canvas = app.view;
export { canvas };
