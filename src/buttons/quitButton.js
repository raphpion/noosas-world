import { playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'
import { warningPrompt } from '../menus/warningPrompt.js'

const quitButton = {
  img: new Image(),
  content: 'Quitter',
  hover: false,
  pos: {
    x: 200,
    y: 360,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    quitButton.img.src = '../assets/menu/button_red.png'
    if (quitButton.hover) quitButton.sourceX = 400
    else quitButton.sourceX = 0
    ctx.drawImage(
      quitButton.img,
      quitButton.sourceX,
      0,
      quitButton.width,
      quitButton.height,
      quitButton.pos.x,
      quitButton.pos.y,
      quitButton.width,
      quitButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(quitButton.content, quitButton.pos.x + 200, quitButton.pos.y)
  },
  click: () => {
    playSound('button')
    quitButton.hover = false
    document.body.style.cursor = 'default'
    warningPrompt.init('quitGame')
  },
}

export { quitButton }
