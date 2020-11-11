import { gameScreen, ctx, clearScreen, drawCredits } from '../gameScreen.js'
import { clouds } from '../backgrounds/clouds.js'
import { startButton } from '../buttons/startButton.js'
import { hiscoresButton } from '../buttons/hiscoresButton.js'
import { settingsButton } from '../buttons/settingsButton.js'
import { isMouseOverButton } from '../methods.js'

const titleScreen = {
  title: {
    img: new Image(),
    pos: {
      x: 175,
      y: 35,
    },
  },
  background: '#b1e7f8',
  clear: () => {
    document.removeEventListener('click', titleScreen.mouseClick)
    document.removeEventListener('mousemove', titleScreen.mouseMove)
  },
  draw: () => {
    clearScreen()
    clouds.draw()
    ctx.drawImage(titleScreen.title.img, titleScreen.title.pos.x, titleScreen.title.pos.y)
    startButton.draw()
    hiscoresButton.draw()
    settingsButton.draw()
    drawCredits()
  },
  init: () => {
    gameScreen.style.backgroundColor = titleScreen.background
    document.addEventListener('click', titleScreen.mouseClick)
    document.addEventListener('mousemove', titleScreen.mouseMove)
    return setInterval(titleScreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    if (isMouseOverButton(startButton, e)) startButton.click()
    if (isMouseOverButton(hiscoresButton, e)) hiscoresButton.click()
    if (isMouseOverButton(settingsButton, e)) settingsButton.click()
  },
  mouseMove: e => {
    startButton.hover = false
    hiscoresButton.hover = false
    settingsButton.hover = false
    if (isMouseOverButton(startButton, e)) {
      startButton.hover = true
      document.body.style.cursor = 'pointer'
    } else if (isMouseOverButton(hiscoresButton, e)) {
      hiscoresButton.hover = true
      document.body.style.cursor = 'pointer'
    } else if (isMouseOverButton(settingsButton, e)) {
      settingsButton.hover = true
      document.body.style.cursor = 'pointer'
    } else {
      document.body.style.cursor = 'default'
    }
  },
}

titleScreen.title.img.src = '../assets/menu/titleAlt.png'

export { titleScreen }
