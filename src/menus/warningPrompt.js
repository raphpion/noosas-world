import { ctx, GAME_WIDTH, getScene } from '../gameScreen.js'
import { isMouseOverButton } from '../methods.js'
import { settingsScreen } from './settingsScreen.js'
import { pauseScreen } from './pauseScreen.js'
import { playSound } from '../gameAudio.js'
import { initialSettings } from '../settings.js'
import { titleScreen } from './titleScreen.js'

const warningPrompt = {
  visible: false,
  background: new Image(),
  reason: '',
  pos: {
    x: 96,
    y: 136,
  },
  clear: () => {
    document.removeEventListener('click', warningPrompt.mouseClick)
    document.removeEventListener('mousemove', warningPrompt.mouseMove)
    if (warningPrompt.reason == 'clearStorage') {
      document.addEventListener('click', settingsScreen.mouseClick)
      document.addEventListener('mousemove', settingsScreen.mouseMove)
    }
    if (warningPrompt.reason == 'quitGame') {
      document.addEventListener('keydown', pauseScreen.keyDown)
      document.addEventListener('click', pauseScreen.mouseClick)
      document.addEventListener('mousemove', pauseScreen.mouseMove)
    }
    warningPrompt.visible = false
  },
  draw: () => {
    ctx.drawImage(warningPrompt.background, warningPrompt.pos.x, warningPrompt.pos.y)
    ctx.font = '40pt VT323'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    if (warningPrompt.reason == 'clearStorage') {
      ctx.fillText('Cette action va effacer', GAME_WIDTH / 2, 210)
      ctx.fillText('toutes vos données de jeu.', GAME_WIDTH / 2, 260)
      ctx.fillText('Continuer ?', GAME_WIDTH / 2, 310)
    } else if (warningPrompt.reason == 'quitGame') {
      ctx.fillText('Votre progression et votre', GAME_WIDTH / 2, 210)
      ctx.fillText('score seront perdus.', GAME_WIDTH / 2, 260)
      ctx.fillText('Continuer ?', GAME_WIDTH / 2, 310)
    }
    confirmButton.draw()
    cancelButton.draw()
  },
  init: reason => {
    warningPrompt.visible = true
    warningPrompt.reason = reason
    warningPrompt.background.src = '../assets/menu/warning_prompt.png'
    if (warningPrompt.reason == 'clearStorage') settingsScreen.clear()
    if (warningPrompt.reason == 'quitGame') pauseScreen.clear()
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
    warningPrompt.clear()
    if (warningPrompt.reason == 'clearStorage') {
      localStorage.clear()
      initialSettings()
    }
    if (warningPrompt.reason == 'quitGame') {
      pauseScreen.clear()
      getScene(titleScreen)
    }
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

export { warningPrompt }
