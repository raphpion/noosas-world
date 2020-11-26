// Map du mode de jeu normal
const map_default = {
  width: 2048,
  height: 640,
  offset: {
    x: 0,
    y: 0,
  },
  layer1: new Image(),
  layer2: new Image(),
  platforms: [
    { pos: { x: 192, y: 576 }, width: 1664 },
    { pos: { x: 960, y: 480 }, width: 512 },
    { pos: { x: 1216, y: 384 }, width: 512 },
  ],
}

export { map_default }
