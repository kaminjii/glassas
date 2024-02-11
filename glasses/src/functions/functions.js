const setupFrames = (directory, numberOfFrames) => {
  return Array(numberOfFrames)
    .fill()
    .map((_, i) => `${directory}/${i + 1}.gif`);
};

const setUpMovement = (entity, movementKeys, movementSpeed) => {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case movementKeys[0]:
        entity.y -= movementSpeed;
        break;
      case movementKeys[1]:
        entity.x -= movementSpeed;
        break;
      case movementKeys[2]:
        entity.y += movementSpeed;
        break;
      case movementKeys[3]:
        entity.x += movementSpeed;
        break;
    }
  });
};

export { setupFrames, setUpMovement };
