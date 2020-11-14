import { playSound } from '../gameAudio.js'
import { ctx, getScene } from '../gameScreen.js'
import { hiscoresScreen } from '../menus/hiscoresScreen.js'

const hiscoresButton = {
  img: new Image(),
  content: 'Records',
  hover: false,
  pos: {
    x: 200,
    y: 360,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    hiscoresButton.img.src = '../assets/menu/button_blue.png'
    if (hiscoresButton.hover) hiscoresButton.sourceX = 400
    else hiscoresButton.sourceX = 0
    ctx.drawImage(
      hiscoresButton.img,
      hiscoresButton.sourceX,
      0,
      hiscoresButton.width,
      hiscoresButton.height,
      hiscoresButton.pos.x,
      hiscoresButton.pos.y,
      hiscoresButton.width,
      hiscoresButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(hiscoresButton.content, hiscoresButton.pos.x + 200, hiscoresButton.pos.y)
  },
  click: () => {
    playSound('button')
    hiscoresButton.hover = false
    document.body.style.cursor = 'default'
    getScene(hiscoresScreen)
  },
}

export { hiscoresButton }
