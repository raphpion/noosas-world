import { playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'
import { pauseScreen } from '../pauseScreen.js'

const resumeButton = {
  img: new Image(),
  content: 'Reprendre',
  hover: false,
  pos: {
    x: 200,
    y: 260,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    resumeButton.img.src = '../assets/menu/button_blue.png'
    if (resumeButton.hover) resumeButton.sourceX = 400
    else resumeButton.sourceX = 0
    ctx.drawImage(
      resumeButton.img,
      resumeButton.sourceX,
      0,
      resumeButton.width,
      resumeButton.height,
      resumeButton.pos.x,
      resumeButton.pos.y,
      resumeButton.width,
      resumeButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(resumeButton.content, resumeButton.pos.x + 200, resumeButton.pos.y)
  },
  click: () => {
    playSound('button')
    resumeButton.hover = false
    document.body.style.cursor = 'default'
    pauseScreen.clear()
  },
}

export { resumeButton }
