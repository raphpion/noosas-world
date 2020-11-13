import { appendAudioSettings, playSound } from '../gameAudio.js'
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
    let value = Number(localStorage.getItem('musicVolume')) - 0.2
    if (value < 0) value = 0
    value = Math.round(value * 10) / 10
    localStorage.setItem('musicVolume', value)
    appendAudioSettings()
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
    let value = Number(localStorage.getItem('musicVolume')) + 0.2
    if (value > 1) value = 1
    value = Math.round(value * 10) / 10
    localStorage.setItem('musicVolume', value)
    appendAudioSettings()
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
    let value = Number(localStorage.getItem('soundVolume')) - 0.2
    if (value < 0) value = 0
    value = Math.round(value * 10) / 10
    localStorage.setItem('soundVolume', value)
    appendAudioSettings()
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
    let value = Number(localStorage.getItem('soundVolume')) + 0.2
    if (value > 1) value = 1
    value = Math.round(value * 10) / 10
    localStorage.setItem('soundVolume', value)
    appendAudioSettings()
  },
}

export { musicMinus, musicPlus, soundMinus, soundPlus }
