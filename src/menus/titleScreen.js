import { gameScreen, ctx, clearScreen, drawCredits } from '../gameScreen.js'
import { clouds } from '../backgrounds/clouds.js'
import { startButton } from '../buttons/startButton.js'
import { hiscoresButton } from '../buttons/hiscoresButton.js'
import { settingsButton } from '../buttons/settingsButton.js'
import { playMusic } from '../gameAudio.js'
import { isMouseOverButton } from '../methods.js'

// écran-titre
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
    // fonction d'arrêt de l'écran-titre, on enlève les listeners de souris
    document.removeEventListener('click', titleScreen.mouseClick)
    document.removeEventListener('mousemove', titleScreen.mouseMove)
  },
  draw: () => {
    // fonction d'affichage de l'écran-titre
    clearScreen()
    clouds.draw()
    ctx.drawImage(titleScreen.title.img, titleScreen.title.pos.x, titleScreen.title.pos.y)
    startButton.draw()
    hiscoresButton.draw()
    settingsButton.draw()
    drawCredits()
  },
  init: () => {
    // fonction d'initialisation de l'écran-titre, on initialise les images et la musique
    titleScreen.title.img.src = '../assets/menu/titleAlt.png'
    gameScreen.style.backgroundColor = titleScreen.background
    playMusic('titlescreen')

    // on ajoute les listeners de souris et on retourne l'intervalle d'affichage
    document.addEventListener('click', titleScreen.mouseClick)
    document.addEventListener('mousemove', titleScreen.mouseMove)
    return setInterval(titleScreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    // gestion des clics de la souris, si le joueur clique sur un bouton, on appelle sa fonction de click
    if (isMouseOverButton(startButton, e)) startButton.click()
    if (isMouseOverButton(hiscoresButton, e)) hiscoresButton.click()
    if (isMouseOverButton(settingsButton, e)) settingsButton.click()
  },
  mouseMove: e => {
    // gestion des mouvements de la souris
    // les boutons ne sont pas 'hover' par défaut et le curseur est à 'default'
    startButton.hover = false
    hiscoresButton.hover = false
    settingsButton.hover = false
    document.body.style.cursor = 'default'

    // si la souris est par-dessus un bouton, on le met 'hover' et on change le curseur
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

export { titleScreen }
