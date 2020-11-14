import { ctx } from '../gameScreen.js'

const musicBar = {
  img: new Image(),
  pos: {
    x: 370,
    y: 185,
  },
  width: 16,
  height: 52,
  sourceX: 0,
  draw: () => {
    musicBar.img.src = '../assets/menu/soundbar.png'
    for (let i = 0; i < 5; i++) {
      if (localStorage.getItem('musicVolume') > i * 0.2) musicBar.sourceX = 16
      else musicBar.sourceX = 0
      ctx.drawImage(
        musicBar.img,
        musicBar.sourceX,
        0,
        musicBar.width,
        musicBar.height,
        musicBar.pos.x + i * 25,
        musicBar.pos.y,
        musicBar.width,
        musicBar.height
      )
    }
  },
}

const soundBar = {
  img: new Image(),
  pos: {
    x: 370,
    y: 270,
  },
  width: 16,
  height: 52,
  sourceX: 0,
  draw: () => {
    soundBar.img.src = '../assets/menu/soundbar.png'
    for (let i = 0; i < 5; i++) {
      if (localStorage.getItem('soundVolume') > i * 0.2) soundBar.sourceX = 16
      else soundBar.sourceX = 0
      ctx.drawImage(
        soundBar.img,
        soundBar.sourceX,
        0,
        soundBar.width,
        soundBar.height,
        soundBar.pos.x + i * 25,
        soundBar.pos.y,
        soundBar.width,
        soundBar.height
      )
    }
  },
}

export { musicBar, soundBar }
