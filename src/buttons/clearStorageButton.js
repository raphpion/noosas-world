import { playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'
import { warningPrompt } from '../menus/settingsScreen.js'
import { musicBar } from './soundBars.js'

const clearStorageButton = {
  img: new Image(),
  content: 'Réinitialiser',
  hover: false,
  pos: {
    x: 200,
    y: 390,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    clearStorageButton.img.src = '../assets/menu/button_red.png'
    if (clearStorageButton.hover) clearStorageButton.sourceX = 400
    else clearStorageButton.sourceX = 0
    ctx.drawImage(
      clearStorageButton.img,
      clearStorageButton.sourceX,
      0,
      clearStorageButton.width,
      clearStorageButton.height,
      clearStorageButton.pos.x,
      clearStorageButton.pos.y,
      clearStorageButton.width,
      clearStorageButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(clearStorageButton.content, clearStorageButton.pos.x + 200, clearStorageButton.pos.y)
  },
  click: () => {
    playSound('button')
    warningPrompt.init()
  },
}

export { clearStorageButton }
