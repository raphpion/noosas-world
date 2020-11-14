import { gameScreen, ctx, GAME_WIDTH, clearScreen, drawCredits, getScene } from '../gameScreen.js'
import { titleScreen } from '../menus/titleScreen.js'
import { clouds } from '../backgrounds/clouds.js'

const splashScreen = {
  title: {
    img: new Image(),
    pos: {
      x: 175,
      y: 185,
    },
  },
  background: '#b1e7f8',
  clear: () => {
    document.removeEventListener('keydown', splashScreen.keyDown)
  },
  draw: () => {
    clearScreen()
    clouds.draw()
    ctx.drawImage(splashScreen.title.img, splashScreen.title.pos.x, splashScreen.title.pos.y)
    ctx.font = '24pt VT323'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText('Appuyez sur une touche pour continuer...', GAME_WIDTH / 2, 425)
    drawCredits()
  },
  init: () => {
    splashScreen.title.img.src = '../assets/menu/titleAlt.png'
    gameScreen.style.backgroundColor = splashScreen.background
    document.addEventListener('keydown', splashScreen.keyDown)
    return setInterval(splashScreen.draw, 1000 / 60)
  },
  keyDown: () => {
    getScene(titleScreen)
  },
}

export { splashScreen }
