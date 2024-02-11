const setupFrames = (directory, numberOfFrames) => {
  return Array(numberOfFrames)
    .fill()
    .map((_, i) => `${directory}/${i + 1}.gif`);
};
const MAX_SPEED=200;

const normalize=vec2=>{
  const len=Math.sqrt(vec2.x**2+vec2.y**2);
  vec2.x/=len;
  vec2.y/=len;
};

const setUpMovement = (app, entity, movementKeys, movementSpeed) => {
  entity.moveBackward=0;
  entity.moveForward=0;
  entity.moveRight=0;
  entity.moveLeft=0;
  window.addEventListener("keydown",ev=>{
    switch ( ev.key ) {
      case movementKeys[2]:
        entity.moveForward = 1;
        break;
      case movementKeys[3]:
        entity.moveLeft = 1;
        break;
      case movementKeys[0]:
        entity.moveBackward = 1;
        break;
      case movementKeys[1]:
        entity.moveRight = 1;
        break;
      case "e":
        if (entity?.glasses?.name === "Fire") {
          entity.shoot();
        }
        break;
    }
  });
  window.addEventListener("keyup",ev=> {
    switch ( ev.key ) {
      case movementKeys[2]:
        entity.moveForward = 0;
        break;
      case movementKeys[3]:
        entity.moveLeft = 0;
        break;
      case movementKeys[0]:
        entity.moveBackward = 0;
        break;
      case movementKeys[1]:
        entity.moveRight = 0;
        break;
    }
  });
  entity.direction={x:0,y:0};
  app.ticker.add(delta=>{
    entity.velocity.x -= entity.velocity.x * .005 * delta;
    entity.velocity.y -= entity.velocity.y * .005 * delta;
    entity.velocity.x=entity.velocity.x||0;
    entity.velocity.y=entity.velocity.y||0;
    
    entity.direction.y = entity.moveForward-entity.moveBackward;
    entity.direction.x = entity.moveRight-entity.moveLeft;
    
    normalize(entity.direction);
    const len=Math.sqrt(entity.velocity.x**2+entity.velocity.y**2);
    const sign=entity.velocity.x>0?-1:1;

    entity.rotation=(sign*Math.acos(-entity.velocity.y/len));
    entity.rotation=entity.rotation||0;

    if ( entity.moveForward || entity.moveBackward ) 
      entity.velocity.y -= entity.direction.y * movementSpeed * delta;
    if ( entity.moveLeft || entity.moveRight ) 
      entity.velocity.x -= entity.direction.x * movementSpeed * delta;
    
    if(len>MAX_SPEED){
      normalize(entity.velocity);
      entity.velocity.x*=MAX_SPEED;
      entity.velocity.y*=MAX_SPEED;
    }
    entity.x += entity.velocity.x * delta/200;
    entity.y += -entity.velocity.y * delta/200;
    entity.x=entity.x||0;
    entity.y=entity.y||0;
  });
};

export { setupFrames, setUpMovement };
