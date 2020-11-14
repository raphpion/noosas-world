import { appendAudioSettings, playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'

const musicMinus = {
  img: new Image(),
  hover: false,
  pos: {
    x: 300,
    y: 185,
  },
  width: 48,
  height: 48,
  sourceX: 0,
  draw: () => {
    musicMinus.img.src = '../assets/menu/Minus.png'
    if (musicMinus.hover) musicMinus.sourceX = 48
    else musicMinus.sourceX = 0
    ctx.drawImage(
      musicMinus.img,
      musicMinus.sourceX,
      0,
      musicMinus.width,
      musicMinus.height,
      musicMinus.pos.x,
      musicMinus.pos.y,
      musicMinus.width,
      musicMinus.height
    )
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
  width: 48,
  height: 48,
  sourceX: 0,
  draw: () => {
    musicPlus.img.src = '../assets/menu/plus.png'
    if (musicPlus.hover) musicPlus.sourceX = 48
    else musicPlus.sourceX = 0
    ctx.drawImage(
      musicPlus.img,
      musicPlus.sourceX,
      0,
      musicPlus.width,
      musicPlus.height,
      musicPlus.pos.x,
      musicPlus.pos.y,
      musicPlus.width,
      musicPlus.height
    )
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
  width: 48,
  height: 48,
  sourceX: 0,
  draw: () => {
    soundMinus.img.src = '../assets/menu/Minus.png'
    if (soundMinus.hover) soundMinus.sourceX = 48
    else soundMinus.sourceX = 0
    ctx.drawImage(
      soundMinus.img,
      soundMinus.sourceX,
      0,
      soundMinus.width,
      soundMinus.height,
      soundMinus.pos.x,
      soundMinus.pos.y,
      soundMinus.width,
      soundMinus.height
    )
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
  width: 48,
  height: 48,
  sourceX: 0,
  draw: () => {
    soundPlus.img.src = '../assets/menu/plus.png'
    if (soundPlus.hover) soundPlus.sourceX = 48
    else soundPlus.sourceX = 0
    ctx.drawImage(
      soundPlus.img,
      soundPlus.sourceX,
      0,
      soundPlus.width,
      soundPlus.height,
      soundPlus.pos.x,
      soundPlus.pos.y,
      soundPlus.width,
      soundPlus.height
    )
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
