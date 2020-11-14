import { playSound } from '../gameAudio.js'
import { ctx, GAME_WIDTH } from '../gameScreen.js'

const tutorialToggleButton = {
  img: new Image(),
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 30,
  height: 30,
  sourceX: 0,
  sourceY: 0,
  click: () => {
    playSound('button')
    let value = localStorage.getItem('showTutorial')
    if (value == 'true') localStorage.setItem('showTutorial', false)
    else localStorage.setItem('showTutorial', true)
  },
  draw: () => {
    tutorialToggleButton.img.src = '../assets/menu/button_tutorial.png'
    let value = localStorage.getItem('showTutorial')
    if (value == 'true') tutorialToggleButton.sourceY = 0
    else tutorialToggleButton.sourceY = 30
    if (tutorialToggleButton.hover) tutorialToggleButton.sourceX = 30
    else tutorialToggleButton.sourceX = 0
    ctx.drawImage(
      tutorialToggleButton.img,
      tutorialToggleButton.sourceX,
      tutorialToggleButton.sourceY,
      tutorialToggleButton.width,
      tutorialToggleButton.height,
      tutorialToggleButton.pos.x,
      tutorialToggleButton.pos.y,
      tutorialToggleButton.width,
      tutorialToggleButton.height
    )
    ctx.fillStyle = 'black'
    ctx.font = '20pt VT323'
    ctx.textAlign = 'center'
    ctx.fillText('Afficher le tutoriel', GAME_WIDTH / 2 + 23, tutorialToggleButton.pos.y + 27)
  },
}

export { tutorialToggleButton }
