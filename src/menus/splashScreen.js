import { gameScreen, ctx, GAME_WIDTH, clearScreen, drawCredits, getScene } from '../gameScreen.js'
import { titleScreen } from '../menus/titleScreen.js'
import { bg_clouds } from '../backgrounds/clouds.js'

// Écran d'accueil
const splashScreen = {
  title: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 225,
      y: 185,
    },
  },
  background: '#b1e7f8',
  clear: () => {
    // fonction d'arrêt de l'écran d'accueil
    document.removeEventListener('keydown', splashScreen.keyDown)
  },
  draw: () => {
    // fonction d'affichage de l'écran d'accueil
    clearScreen()
    bg_clouds.draw()
    ctx.drawImage(splashScreen.title.img, splashScreen.title.pos.x, splashScreen.title.pos.y)
    ctx.font = '24pt VT323'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText('Appuyez sur une touche pour continuer...', GAME_WIDTH / 2, 425)
    drawCredits()
  },
  init: () => {
    // fonction d'initialisation de l'écran d'accueil
    splashScreen.title.img.src = '../assets/menu/titleAlt.png'
    gameScreen.style.backgroundColor = splashScreen.background

    // on ajoute le listener de clavier et on retourne l'intervalle d'affichage
    document.addEventListener('keydown', splashScreen.keyDown)
    return setInterval(splashScreen.draw, 1000 / 60)
  },
  keyDown: () => {
    getScene(titleScreen)
  },
}

export { splashScreen }
