const MOVEMENT_KEYS = {
  WASD: ["w", "a", "s", "d"],
  ARROWS: ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"],
};

const GLASSES = {
  FIRE: {
    name: "Fire Glasses",
    path: "assets/actual/glasses.png",
    dialog: "You got fire glasses, bitch. Press E to shoot flames!",
  },
  XRAY: {
    name: "X-Ray Glasses",
    path: "assets/actual/xrayGlasses.png",
    dialog: "You obtained x-ray glasses. Press E to see through walls!",
  }

};

export { MOVEMENT_KEYS, GLASSES };
