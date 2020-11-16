import { game } from './game.js'
import { ctx, GAME_WIDTH, GAME_HEIGHT } from './gameScreen.js'
import { resumeButton } from './buttons/resumeButton.js'
import { quitButton } from './buttons/quitButton.js'
import { isMouseOverButton } from './methods.js'
import { warningPrompt } from './menus/warningPrompt.js'

const pauseScreen = {
  title: {
    img: new Image(),
    pos: {
      x: 238,
      y: 43,
    },
  },
  clear: () => {
    document.removeEventListener('keydown', pauseScreen.keyDown)
    document.removeEventListener('click', pauseScreen.mouseClick)
    document.removeEventListener('mousemove', pauseScreen.mouseMove)
    if (!warningPrompt.visible) game.pause()
  },
  draw: () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7'
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    ctx.drawImage(pauseScreen.title.img, pauseScreen.title.pos.x, pauseScreen.title.pos.y)
    quitButton.draw()
    resumeButton.draw()
  },
  init: () => {
    pauseScreen.title.img.src = '../assets/menu/pause.png'
    document.addEventListener('keydown', pauseScreen.keyDown)
    document.addEventListener('click', pauseScreen.mouseClick)
    document.addEventListener('mousemove', pauseScreen.mouseMove)
  },
  keyDown: e => {
    if (e.keyCode == 27) pauseScreen.clear()
  },
  mouseClick: e => {
    if (isMouseOverButton(resumeButton, e)) resumeButton.click()
    if (isMouseOverButton(quitButton, e)) quitButton.click()
  },
  mouseMove: e => {
    resumeButton.hover = false
    quitButton.hover = false
    document.body.style.cursor = 'default'
    if (isMouseOverButton(resumeButton, e)) {
      resumeButton.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(quitButton, e)) {
      quitButton.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

export { pauseScreen }
