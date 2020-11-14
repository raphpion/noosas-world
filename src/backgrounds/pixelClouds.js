import { ctx } from '../gameScreen.js'

let cloudMoveInterval

const pixelClouds = {
  img: new Image(),
  pos: {
    x: 0,
    y: 0,
  },
  draw: () => {
    ctx.drawImage(pixelClouds.img, pixelClouds.pos.x, pixelClouds.pos.y)
    ctx.drawImage(pixelClouds.img, pixelClouds.pos.x + 800, pixelClouds.pos.y)
  },
  move: (speed = 1) => {
    cloudMoveInterval = setInterval(function () {
      pixelClouds.pos.x--
      if (pixelClouds.pos.x < -800) pixelClouds.pos.x = 0
    }, 1000 / (30 * speed))
  },
  stop: () => {
    clearInterval(cloudMoveInterval)
  },
}

pixelClouds.img.src = '../assets/backgrounds/pixel_clouds.png'

export { pixelClouds }
