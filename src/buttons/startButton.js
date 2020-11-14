import { playSound } from '../gameAudio.js'
import { ctx, getScene } from '../gameScreen.js'
import { tutorial } from '../tutorial.js'
import { game } from '../game.js'

const startButton = {
  img: new Image(),
  content: 'Jouer',
  hover: false,
  pos: {
    x: 200,
    y: 260,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    startButton.img.src = '../assets/menu/button_green.png'
    if (startButton.hover) startButton.sourceX = 400
    else startButton.sourceX = 0
    ctx.drawImage(
      startButton.img,
      startButton.sourceX,
      0,
      startButton.width,
      startButton.height,
      startButton.pos.x,
      startButton.pos.y,
      startButton.width,
      startButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(startButton.content, startButton.pos.x + 200, startButton.pos.y)
  },
  click: () => {
    playSound('button')
    if (localStorage.getItem('showTutorial') == 'true') getScene(tutorial)
    else getScene(game)
    document.body.style.cursor = 'default'
  },
}

export { startButton }
