import { ctx, GAME_WIDTH, clearScreen, drawCredits } from '../gameScreen.js'
import { clouds } from '../backgrounds/clouds.js'
import { musicMinus, musicPlus, soundMinus, soundPlus } from '../buttons/soundControls.js'
import { musicBar, soundBar } from '../buttons/soundBars.js'
import { clearStorageButton } from '../buttons/clearStorageButton.js'
import { returnButton } from '../buttons/returnButton.js'
import { tutorialToggleButton } from '../buttons/tutorialToggleButton.js'
import { playMusic, playSound } from '../gameAudio.js'
import { isMouseOverButton } from '../methods.js'
import { initialSettings } from '../settings.js'

const settingsScreen = {
  title: {
    img: new Image(),
    pos: {
      x: 175,
      y: 43,
    },
  },
  musicIcon: {
    img: new Image(),
    pos: {
      x: 220,
      y: 182,
    },
  },
  soundIcon: {
    img: new Image(),
    pos: {
      x: 222,
      y: 262,
    },
  },
  background: '#ff9257',
  draw: () => {
    clearScreen()
    clouds.draw()
    ctx.drawImage(settingsScreen.title.img, settingsScreen.title.pos.x, settingsScreen.title.pos.y)
    ctx.drawImage(settingsScreen.musicIcon.img, settingsScreen.musicIcon.pos.x, settingsScreen.musicIcon.pos.y)
    ctx.drawImage(settingsScreen.soundIcon.img, settingsScreen.soundIcon.pos.x, settingsScreen.soundIcon.pos.y)
    musicMinus.draw()
    musicPlus.draw()
    musicBar.draw()
    soundMinus.draw()
    soundPlus.draw()
    soundBar.draw()
    tutorialToggleButton.draw()
    clearStorageButton.draw()
    returnButton.draw()
    drawCredits()
    if (warningPrompt.visible) warningPrompt.draw()
  },
  clear: () => {
    document.removeEventListener('click', settingsScreen.mouseClick)
    document.removeEventListener('mousemove', settingsScreen.mouseMove)
  },
  init: () => {
    settingsScreen.title.img.src = '../assets/menu/options.png'
    settingsScreen.musicIcon.img.src = '../assets/menu/music.png'
    settingsScreen.soundIcon.img.src = '../assets/menu/sound.png'
    gameScreen.style.backgroundColor = settingsScreen.background
    tutorialToggleButton.pos.x = 275
    tutorialToggleButton.pos.y = 341
    playMusic('titlescreen', true)
    document.addEventListener('click', settingsScreen.mouseClick)
    document.addEventListener('mousemove', settingsScreen.mouseMove)
    return setInterval(settingsScreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    if (isMouseOverButton(musicMinus, e)) musicMinus.click()
    if (isMouseOverButton(musicPlus, e)) musicPlus.click()
    if (isMouseOverButton(soundMinus, e)) soundMinus.click()
    if (isMouseOverButton(soundPlus, e)) soundPlus.click()
    if (isMouseOverButton(clearStorageButton, e)) clearStorageButton.click()
    if (isMouseOverButton(returnButton, e)) returnButton.click()
    if (isMouseOverButton(tutorialToggleButton, e)) tutorialToggleButton.click()
  },
  mouseMove: e => {
    musicMinus.hover = false
    musicPlus.hover = false
    soundMinus.hover = false
    soundPlus.hover = false
    clearStorageButton.hover = false
    returnButton.hover = false
    tutorialToggleButton.hover = false
    document.body.style.cursor = 'default'
    if (isMouseOverButton(musicMinus, e)) {
      musicMinus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(musicPlus, e)) {
      musicPlus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(soundMinus, e)) {
      soundMinus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(soundPlus, e)) {
      soundPlus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(clearStorageButton, e)) {
      clearStorageButton.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(returnButton, e)) {
      returnButton.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(tutorialToggleButton, e)) {
      tutorialToggleButton.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

const warningPrompt = {
  visible: false,
  background: new Image(),
  pos: {
    x: 80,
    y: 136,
  },
  width: 640,
  height: 480,
  clear: () => {
    warningPrompt.visible = false
    document.removeEventListener('click', warningPrompt.mouseClick)
    document.removeEventListener('mousemove', warningPrompt.mouseMove)
    document.addEventListener('click', settingsScreen.mouseClick)
    document.addEventListener('mousemove', settingsScreen.mouseMove)
  },
  draw: () => {
    ctx.drawImage(warningPrompt.background, warningPrompt.pos.x, warningPrompt.pos.y)
    ctx.font = '40pt VT323'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText('Cette action va effacer', GAME_WIDTH / 2, 210)
    ctx.fillText('toutes vos données de jeu. ', GAME_WIDTH / 2, 260)
    ctx.fillText('Continuer ? ', GAME_WIDTH / 2, 310)
    confirmButton.draw()
    cancelButton.draw()
  },
  init: () => {
    warningPrompt.background.src = '../assets/menu/warning_prompt.png'
    settingsScreen.clear()
    warningPrompt.visible = true
    document.addEventListener('click', warningPrompt.mouseClick)
    document.addEventListener('mousemove', warningPrompt.mouseMove)
  },
  mouseClick: e => {
    if (isMouseOverButton(confirmButton, e)) confirmButton.click()
    if (isMouseOverButton(cancelButton, e)) cancelButton.click()
  },
  mouseMove: e => {
    confirmButton.hover = false
    cancelButton.hover = false
    document.body.style.cursor = 'default'
    if (isMouseOverButton(confirmButton, e)) {
      confirmButton.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(cancelButton, e)) {
      cancelButton.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

const confirmButton = {
  img: new Image(),
  hover: false,
  pos: {
    x: 330,
    y: 370,
  },
  width: 60,
  height: 60,
  sourceX: 0,
  click: () => {
    playSound('button')
    localStorage.clear()
    initialSettings()
    warningPrompt.clear()
  },
  draw: () => {
    confirmButton.img.src = '../assets/menu/button_confirm.png'
    if (confirmButton.hover) confirmButton.sourceX = 60
    else confirmButton.sourceX = 0
    ctx.drawImage(
      confirmButton.img,
      confirmButton.sourceX,
      0,
      confirmButton.width,
      confirmButton.height,
      confirmButton.pos.x,
      confirmButton.pos.y,
      confirmButton.width,
      confirmButton.height
    )
  },
}

const cancelButton = {
  img: new Image(),
  hover: false,
  pos: {
    x: 410,
    y: 370,
  },
  width: 60,
  height: 60,
  sourceX: 0,
  click: () => {
    playSound('button')
    warningPrompt.clear()
  },
  draw: () => {
    cancelButton.img.src = '../assets/menu/button_cancel.png'
    if (cancelButton.hover) cancelButton.sourceX = 60
    else cancelButton.sourceX = 0
    ctx.drawImage(
      cancelButton.img,
      cancelButton.sourceX,
      0,
      cancelButton.width,
      cancelButton.height,
      cancelButton.pos.x,
      cancelButton.pos.y,
      cancelButton.width,
      cancelButton.height
    )
  },
}

export { settingsScreen, warningPrompt }
