import { playSound } from '../gameAudio.js'
import { ctx, getScene } from '../gameScreen.js'
import { titleScreen } from '../menus/titleScreen.js'

const returnButton = {
  img: new Image(),
  content: 'Retour',
  hover: false,
  pos: {
    x: 200,
    y: 490,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    returnButton.img.src = '../assets/menu/button_blue.png'
    if (returnButton.hover) returnButton.sourceX = 400
    else returnButton.sourceX = 0
    ctx.drawImage(
      returnButton.img,
      returnButton.sourceX,
      0,
      returnButton.width,
      returnButton.height,
      returnButton.pos.x,
      returnButton.pos.y,
      returnButton.width,
      returnButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(returnButton.content, returnButton.pos.x + 200, returnButton.pos.y)
  },
  click: () => {
    playSound('button')
    returnButton.hover = false
    document.body.style.cursor = 'default'
    getScene(titleScreen)
  },
}

export { returnButton }
