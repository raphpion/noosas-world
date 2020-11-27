import { appendAudioSettings, playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'

// bouton pour diminuer la musique
const musicMinus = {
  img: new Image(),
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 48,
  height: 48,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton
    musicMinus.img.src = '../assets/menu/Minus.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (musicMinus.hover) musicMinus.sourceX = 48
    else musicMinus.sourceX = 0

    // affichage du bouton à l'écran
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
    // si le joueur clique sur le bouton, on réduit le son du volume
    playSound('button')
    let value = Number(localStorage.getItem('musicVolume')) - 0.2

    // si la valeur est sous la limite permise, on la remet à 0
    if (value < 0) value = 0

    //? le code génère des valeurs décimales étranges, on arrondit donc le résultat à une décimale
    value = Math.round(value * 10) / 10

    // on affecte la valeur au local storage et on applique les modifications aux variables du jeu
    localStorage.setItem('musicVolume', value)
    appendAudioSettings()
  },
}

// bouton pour augmenter le volume de la musique
const musicPlus = {
  img: new Image(),
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 48,
  height: 48,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton à l'écran
    musicPlus.img.src = '../assets/menu/plus.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (musicPlus.hover) musicPlus.sourceX = 48
    else musicPlus.sourceX = 0

    // affichage du bouton à l'écran
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
    // si le joueur clique sur le bouton, on augmente le volume de la musique
    playSound('button')
    let value = Number(localStorage.getItem('musicVolume')) + 0.2

    // si la valeur dépasse la limite permise, on la remet à 1
    if (value > 1) value = 1

    //? le code génère des valeurs décimales étranges, on arrondit donc le résultat à une décimale
    value = Math.round(value * 10) / 10

    // on affecte la valeur au local storage et on applique les modifications aux variables du jeu
    localStorage.setItem('musicVolume', value)
    appendAudioSettings()
  },
}

// bouton pour diminuer le volume du son
const soundMinus = {
  img: new Image(),
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 48,
  height: 48,
  sourceX: 0,
  draw: () => {
    soundMinus.img.src = '../assets/menu/Minus.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (soundMinus.hover) soundMinus.sourceX = 48
    else soundMinus.sourceX = 0

    // affichage du bouton à l'écran
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
    // si le joueur clique sur le bouton, on réduit le son du volume
    playSound('button')
    let value = Number(localStorage.getItem('soundVolume')) - 0.2

    // si la valeur est sous la limite permise, on la remet à 0
    if (value < 0) value = 0

    //? le code génère des valeurs décimales étranges, on arrondit donc le résultat à une décimale
    value = Math.round(value * 10) / 10

    // on affecte la valeur au local storage et on applique les modifications aux variables du jeu
    localStorage.setItem('soundVolume', value)
    appendAudioSettings()
  },
}

// bouton pour augmenter le volume du son
const soundPlus = {
  img: new Image(),
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 48,
  height: 48,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton à l'écran
    soundPlus.img.src = '../assets/menu/plus.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (soundPlus.hover) soundPlus.sourceX = 48
    else soundPlus.sourceX = 0

    // affichage du bouton à l'écran
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
    // si le joueur clique sur le bouton, on augmente le volume du son
    playSound('button')
    let value = Number(localStorage.getItem('soundVolume')) + 0.2

    // si la valeur dépasse la limite permise, on la remet à 1
    if (value > 1) value = 1

    //? le code génère des valeurs décimales étranges, on arrondit donc le résultat à une décimale
    value = Math.round(value * 10) / 10

    // on affecte la valeur au local storage et on applique les modifications aux valeurs du jeu
    localStorage.setItem('soundVolume', value)
    appendAudioSettings()
  },
}

export { musicMinus, musicPlus, soundMinus, soundPlus }
