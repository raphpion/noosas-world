import { ctx } from '../gameScreen.js'

const musicBar = {
  img: new Image(),
  pos: {
    x: 370,
    y: 185,
  },
  draw: () => {
    for (let i = 0; i < 5; i++) {
      if (localStorage.getItem('musicVolume') > i * 0.2) musicBar.img.src = '../assets/menu/soundbar_on.png'
      else musicBar.img.src = '../assets/menu/soundbar_off.png'
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
      if (localStorage.getItem('soundVolume') > i * 0.2) soundBar.img.src = '../assets/menu/soundbar_on.png'
      else soundBar.img.src = '../assets/menu/soundbar_off.png'
      ctx.drawImage(soundBar.img, soundBar.pos.x + i * 25, soundBar.pos.y)
    }
  },
}

musicBar.img.src = '../assets/menu/soundbar_on.png'
soundBar.img.src = '../assets/menu/soundbar_on.png'

export { musicBar, soundBar }
