import { ctx } from '../gameScreen.js'

const musicIcon = {
  img: new Image(),
  hover: false,
  pos: {
    x: 220,
    y: 182,
  },
  draw: () => {
    if (musicIcon.hover) musicIcon.img.src = '../assets/menu/music_hover.png'
    else musicIcon.img.src = '../assets/menu/music.png'
    ctx.drawImage(musicIcon.img, musicIcon.pos.x, musicIcon.pos.y)
  },
  click: () => {
    alert('Vous avez cliqué sur Musique.\nCette fonction sera implémentée sous peu...')
  },
}

const soundIcon = {
  img: new Image(),
  hover: false,
  pos: {
    x: 222,
    y: 262,
  },
  draw: () => {
    if (soundIcon.hover) soundIcon.img.src = '../assets/menu/sound_hover.png'
    else soundIcon.img.src = '../assets/menu/sound.png'
    ctx.drawImage(soundIcon.img, soundIcon.pos.x, soundIcon.pos.y)
  },
  click: () => {
    alert('Vous avez cliqué sur Son.\nCette fonction sera implémentée sous peu...')
  },
}

export { musicIcon, soundIcon }
