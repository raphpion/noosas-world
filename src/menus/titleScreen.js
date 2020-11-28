import { gameScreen, ctx, GAME_WIDTH, clearScreen, drawCredits } from '../gameScreen.js'
import { bg_clouds } from '../backgrounds/clouds.js'
import { btn_start } from '../buttons/start.js'
import { btn_hiscores } from '../buttons/hiscores.js'
import { btn_settings } from '../buttons/settings.js'
import { playMusic } from '../gameAudio.js'
import { isMouseOverButton } from '../methods.js'

// écran-titre
const menu_titlescreen = {
  title: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 225,
      y: 55,
    },
  },
  background: '#b1e7f8',
  clear: () => {
    // fonction d'arrêt de l'écran-titre, on enlève les listeners de souris
    document.removeEventListener('click', menu_titlescreen.mouseClick)
    document.removeEventListener('mousemove', menu_titlescreen.mouseMove)
  },
  draw: () => {
    // fonction d'affichage de l'écran-titre
    clearScreen()
    bg_clouds.draw()
    ctx.drawImage(menu_titlescreen.title.img, menu_titlescreen.title.pos.x, menu_titlescreen.title.pos.y)
    btn_start.draw()
    btn_hiscores.draw()
    btn_settings.draw()
    drawCredits()
  },
  init: () => {
    // fonction d'initialisation de l'écran-titre, on initialise les images et la musique
    menu_titlescreen.title.img.src = '../assets/menu/titleAlt.png'
    gameScreen.style.backgroundColor = menu_titlescreen.background
    playMusic('titlescreen')

    // positionnement des boutons
    btn_start.content = 'Jouer'
    btn_start.pos.x = (GAME_WIDTH - btn_start.width) / 2
    btn_start.pos.y = 280
    btn_hiscores.pos.x = (GAME_WIDTH - btn_hiscores.width) / 2
    btn_hiscores.pos.y = 380
    btn_settings.pos.x = (GAME_WIDTH - btn_settings.width) / 2
    btn_settings.pos.y = 480

    // on ajoute les listeners de souris et on retourne l'intervalle d'affichage
    document.addEventListener('click', menu_titlescreen.mouseClick)
    document.addEventListener('mousemove', menu_titlescreen.mouseMove)
    return setInterval(menu_titlescreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    // gestion des clics de la souris, si le joueur clique sur un bouton, on appelle sa fonction de click
    if (isMouseOverButton(btn_start, e)) btn_start.click()
    if (isMouseOverButton(btn_hiscores, e)) btn_hiscores.click()
    if (isMouseOverButton(btn_settings, e)) btn_settings.click()
  },
  mouseMove: e => {
    // gestion des mouvements de la souris
    // les boutons ne sont pas 'hover' par défaut et le curseur est à 'default'
    btn_start.hover = false
    btn_hiscores.hover = false
    btn_settings.hover = false
    document.body.style.cursor = 'default'

    // si la souris est par-dessus un bouton, on le met 'hover' et on change le curseur
    if (isMouseOverButton(btn_start, e)) {
      btn_start.hover = true
      document.body.style.cursor = 'pointer'
    } else if (isMouseOverButton(btn_hiscores, e)) {
      btn_hiscores.hover = true
      document.body.style.cursor = 'pointer'
    } else if (isMouseOverButton(btn_settings, e)) {
      btn_settings.hover = true
      document.body.style.cursor = 'pointer'
    } else {
      document.body.style.cursor = 'default'
    }
  },
}

export { menu_titlescreen }
