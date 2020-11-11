import { ctx } from '../gameScreen.js'

const clouds = {
  img: new Image(),
  pos: {
    x: 0,
    y: 0,
  },
  draw: () => {
    ctx.drawImage(clouds.img, clouds.pos.x, clouds.pos.y)
    clouds.pos.x--
    clouds.pos.y -= 0.5
    if (clouds.pos.x < -800) clouds.pos.x = 0
    if (clouds.pos.y < -800) clouds.pos.y = 0
  },
}

clouds.img.src = '../assets/menu/bg-sky.png'

export { clouds }
