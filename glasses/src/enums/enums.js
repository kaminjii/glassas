const MOVEMENT_KEYS = {
  WASD: ["w", "a", "s", "d"],
  ARROWS: ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"],
};

const GLASSES = {
  DEFAULT: {
    name: "Default Glasses",
    path: "Assets/Glasses/Default Glasses.svg",
    dialog: "This pair of glasses doesn't do anything special.",
  },
  FIRE: {
    name: "Fire Glasses",
    path: "Assets/Glasses/Fire Glasses.svg",
    dialog: "You got fire glasses, bitch. Press E to shoot flames!",
  },
  XRAY: {
    name: "X-Ray Glasses",
    path: "Assets/Glasses/X-Ray Glasses.svg",
    dialog: "You obtained x-ray glasses. Press E to see through walls!",
  },
  LOVE: {
    name: "Love Glasses",
    path: "Assets/Glasses/Love Glasses.svg",
    dialog: "These love glasses attract others when equipped!",
  },
  HATE: {
    name: "Hate Glasses",
    path: "Assets/Glasses/Hate Glasses.svg",
    dialog: "These love glasses repel others when equipped!",
  },
};

export { MOVEMENT_KEYS, GLASSES };
