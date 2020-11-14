import { playSound } from '../gameAudio.js'
import { ctx, GAME_WIDTH } from '../gameScreen.js'

const tutorialToggleButton = {
  img: new Image(),
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  click: () => {
    playSound('button')
    let value = localStorage.getItem('showTutorial')
    if (value == 'true') localStorage.setItem('showTutorial', false)
    else localStorage.setItem('showTutorial', true)
  },
  draw: () => {
    let value = localStorage.getItem('showTutorial')
    if (value == 'true') {
      if (tutorialToggleButton.hover) tutorialToggleButton.img.src = '../assets/menu/button_tutorial_true_hover.png'
      else tutorialToggleButton.img.src = '../assets/menu/button_tutorial_true.png'
    } else if (tutorialToggleButton.hover)
      tutorialToggleButton.img.src = '../assets/menu/button_tutorial_false_hover.png'
    else tutorialToggleButton.img.src = '../assets/menu/button_tutorial_false.png'
    ctx.drawImage(tutorialToggleButton.img, tutorialToggleButton.pos.x, tutorialToggleButton.pos.y)
    ctx.fillStyle = 'black'
    ctx.font = '20pt VT323'
    ctx.textAlign = 'center'
    ctx.fillText('Afficher le tutoriel', GAME_WIDTH / 2 + 23, tutorialToggleButton.pos.y + 27)
  },
}

export { tutorialToggleButton }
