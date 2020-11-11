import { GAME_WIDTH, GAME_HEIGHT, ctx } from '../gameScreen.js'
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
  background: {
    img: new Image(),
    pos: {
      x: 0,
      y: 0,
    },
  },
  draw: () => {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    ctx.drawImage(titleScreen.background.img, titleScreen.background.pos.x, titleScreen.background.pos.y)
    titleScreen.background.pos.x--
    if (titleScreen.background.pos.x < -800) titleScreen.background.pos.x = 0
    ctx.drawImage(titleScreen.title.img, titleScreen.title.pos.x, titleScreen.title.pos.y)
    startButton.draw()
    hiscoresButton.draw()
    settingsButton.draw()
    ctx.font = '16pt VT323'
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'bottom'
    ctx.fillText('© Raphaël Pion 2020 - tous droits réservés', GAME_WIDTH / 2, GAME_HEIGHT - 10)
  },
  init: () => {
    // event listeners pour mouse move et pour mouse click
    document.addEventListener('click', titleScreen.mouseClick)
    document.addEventListener('mousemove', titleScreen.mouseMove)
    setInterval(titleScreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    // si on clique dans la zone d'un bouton, on active la méthode du bouton.click
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
titleScreen.background.img.src = '../assets/menu/bg-sky.png'

export { titleScreen }
