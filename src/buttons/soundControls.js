import { appendAudioSettings, playSound } from '../audio.js'
import { ctx } from '../screen.js'

// bouton pour diminuer la musique
const btn_musicMinus = {
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
    btn_musicMinus.img.src = '../assets/menu/Minus.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (btn_musicMinus.hover) btn_musicMinus.sourceX = 48
    else btn_musicMinus.sourceX = 0

    // affichage du bouton à l'écran
    ctx.drawImage(
      btn_musicMinus.img,
      btn_musicMinus.sourceX,
      0,
      btn_musicMinus.width,
      btn_musicMinus.height,
      btn_musicMinus.pos.x,
      btn_musicMinus.pos.y,
      btn_musicMinus.width,
      btn_musicMinus.height
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
const btn_musicPlus = {
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
    btn_musicPlus.img.src = '../assets/menu/plus.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (btn_musicPlus.hover) btn_musicPlus.sourceX = 48
    else btn_musicPlus.sourceX = 0

    // affichage du bouton à l'écran
    ctx.drawImage(
      btn_musicPlus.img,
      btn_musicPlus.sourceX,
      0,
      btn_musicPlus.width,
      btn_musicPlus.height,
      btn_musicPlus.pos.x,
      btn_musicPlus.pos.y,
      btn_musicPlus.width,
      btn_musicPlus.height
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
const btn_soundMinus = {
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
    btn_soundMinus.img.src = '../assets/menu/Minus.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (btn_soundMinus.hover) btn_soundMinus.sourceX = 48
    else btn_soundMinus.sourceX = 0

    // affichage du bouton à l'écran
    ctx.drawImage(
      btn_soundMinus.img,
      btn_soundMinus.sourceX,
      0,
      btn_soundMinus.width,
      btn_soundMinus.height,
      btn_soundMinus.pos.x,
      btn_soundMinus.pos.y,
      btn_soundMinus.width,
      btn_soundMinus.height
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
const btn_soundPlus = {
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
    btn_soundPlus.img.src = '../assets/menu/plus.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (btn_soundPlus.hover) btn_soundPlus.sourceX = 48
    else btn_soundPlus.sourceX = 0

    // affichage du bouton à l'écran
    ctx.drawImage(
      btn_soundPlus.img,
      btn_soundPlus.sourceX,
      0,
      btn_soundPlus.width,
      btn_soundPlus.height,
      btn_soundPlus.pos.x,
      btn_soundPlus.pos.y,
      btn_soundPlus.width,
      btn_soundPlus.height
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

export { btn_musicMinus, btn_musicPlus, btn_soundMinus, btn_soundPlus }
