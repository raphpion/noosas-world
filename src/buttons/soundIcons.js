import { playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'

// icône du volume de la musique
const musicIcon = {
  img: new Image(),
  pos: {
    x: 220,
    y: 182,
  },
  draw: () => {
    // fonction d'affichage de l'icône à l'écran
    ctx.drawImage(musicIcon.img, musicIcon.pos.x, musicIcon.pos.y)
  },
}

// icône du volume du son
const soundIcon = {
  img: new Image(),
  pos: {
    x: 222,
    y: 262,
  },
  draw: () => {
    // fonction d'affichage de l'icône à l'écran
    ctx.drawImage(soundIcon.img, soundIcon.pos.x, soundIcon.pos.y)
  },
}

export { musicIcon, soundIcon }
