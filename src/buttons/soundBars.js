import { ctx } from '../gameScreen.js'

// barre de son du volume de la musique
const musicBar = {
  img: new Image(), // image
  // position
  pos: {
    x: 370,
    y: 185,
  },
  // dimensions
  width: 16,
  height: 52,
  sourceX: 0, // source X de la vignette
  draw: () => {
    // fonction d'affichage de la barre de son
    musicBar.img.src = '../assets/menu/soundbar.png'

    // pour chaque barre de son, on vérifie si le volume est suffisant pour qu'elle soit verte
    for (let i = 0; i < 5; i++) {
      if (localStorage.getItem('musicVolume') > i * 0.2) musicBar.sourceX = 16
      else musicBar.sourceX = 0

      // on affiche la barre à l'écran
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

// barre de son du volume des effets sonores
const soundBar = {
  img: new Image(), // image
  // position
  pos: {
    x: 370,
    y: 270,
  },
  // dimensions
  width: 16,
  height: 52,
  sourceX: 0, // source X de la vignette
  draw: () => {
    // fonction d'affichage de la barre de son à l'écran
    soundBar.img.src = '../assets/menu/soundbar.png'
    // pour chaque barre de son, on vérifie si le volume est suffisant pour qu'elle soit verte
    for (let i = 0; i < 5; i++) {
      if (localStorage.getItem('soundVolume') > i * 0.2) soundBar.sourceX = 16
      else soundBar.sourceX = 0

      // on affiche la barre à l'écran
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
