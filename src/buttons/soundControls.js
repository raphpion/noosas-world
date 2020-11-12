import { playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'

const musicMinus = {
  img: new Image(),
  hover: false,
  pos: {
    x: 300,
    y: 185,
  },
  draw: () => {
    if (musicMinus.hover) musicMinus.img.src = '../assets/menu/minus_hover.png'
    else musicMinus.img.src = '../assets/menu/minus.png'
    ctx.drawImage(musicMinus.img, musicMinus.pos.x, musicMinus.pos.y)
  },
  click: () => {
    playSound('button')
    alert('Vous avez cliqué sur Diminuer la Musique .\nCette fonctionnalité sera implémentée sous peu.')
  },
}

const musicPlus = {
  img: new Image(),
  hover: false,
  pos: {
    x: 510,
    y: 185,
  },
  draw: () => {
    if (musicPlus.hover) musicPlus.img.src = '../assets/menu/plus_hover.png'
    else musicPlus.img.src = '../assets/menu/plus.png'
    ctx.drawImage(musicPlus.img, musicPlus.pos.x, musicPlus.pos.y)
  },
  click: () => {
    playSound('button')
    alert('Vous avez cliqué sur Augmenter la Musique.\nCette fonctionnalité sera implémentée sous peu.')
  },
}

const soundMinus = {
  img: new Image(),
  hover: false,
  pos: {
    x: 300,
    y: 270,
  },
  draw: () => {
    if (soundMinus.hover) soundMinus.img.src = '../assets/menu/minus_hover.png'
    else soundMinus.img.src = '../assets/menu/minus.png'
    ctx.drawImage(soundMinus.img, soundMinus.pos.x, soundMinus.pos.y)
  },
  click: () => {
    playSound('button')
    alert('Vous avez cliqué sur Diminuer le Son.\nCette fonctionnalité sera implémentée sous peu.')
  },
}

const soundPlus = {
  img: new Image(),
  hover: false,
  pos: {
    x: 510,
    y: 270,
  },
  draw: () => {
    if (soundPlus.hover) soundPlus.img.src = '../assets/menu/plus_hover.png'
    else soundPlus.img.src = '../assets/menu/plus.png'
    ctx.drawImage(soundPlus.img, soundPlus.pos.x, soundPlus.pos.y)
  },
  click: () => {
    playSound('button')
    alert('Vous avez cliqué sur Augmenter le Son.\nCette fonctionnalité sera implémentée sous peu.')
  },
}

export { musicMinus, musicPlus, soundMinus, soundPlus }
