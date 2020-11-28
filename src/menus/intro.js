import { screen, ctx, GAME_WIDTH, clearScreen, drawCredits, getScene } from '../screen.js'
import { menu_titlescreen } from './titlescreen.js'
import { bg_clouds } from '../backgrounds/clouds.js'

// Écran d'accueil
const menu_intro = {
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
    document.removeEventListener('keydown', menu_intro.keyDown)
  },
  draw: () => {
    // fonction d'affichage de l'écran d'accueil
    clearScreen()
    bg_clouds.draw()
    ctx.drawImage(menu_intro.title.img, menu_intro.title.pos.x, menu_intro.title.pos.y)
    ctx.font = '24pt VT323'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText('Appuyez sur une touche pour continuer...', GAME_WIDTH / 2, 425)
    drawCredits()
  },
  init: () => {
    // fonction d'initialisation de l'écran d'accueil
    menu_intro.title.img.src = '../assets/menu/titleAlt.png'
    screen.style.backgroundColor = menu_intro.background

    // on ajoute le listener de clavier et on retourne l'intervalle d'affichage
    document.addEventListener('keydown', menu_intro.keyDown)
    return setInterval(menu_intro.draw, 1000 / 60)
  },
  keyDown: () => {
    getScene(menu_titlescreen)
  },
}

export { menu_intro }
