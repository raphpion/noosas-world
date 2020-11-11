import { ctx } from '../gameScreen.js'

const musicBar = {
  img: new Image(),
  pos: {
    x: 370,
    y: 185,
  },
  draw: () => {
    for (let i = 0; i < 5; i++) {
      musicBar.img.src = '../assets/menu/soundbar_on.png'
      ctx.drawImage(musicBar.img, musicBar.pos.x + i * 25, musicBar.pos.y)
    }
  },
}

const soundBar = {
  img: new Image(),
  pos: {
    x: 370,
    y: 270,
  },
  draw: () => {
    for (let i = 0; i < 5; i++) {
      soundBar.img.src = '../assets/menu/soundbar_on.png'
      ctx.drawImage(soundBar.img, soundBar.pos.x + i * 25, soundBar.pos.y)
    }
  },
}

export { musicBar, soundBar }
