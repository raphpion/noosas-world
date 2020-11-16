import { game } from '../game.js'
import { ctx, GAME_WIDTH, GAME_HEIGHT } from '../gameScreen.js'
import { resumeButton } from '../buttons/resumeButton.js'
import { quitButton } from '../buttons/quitButton.js'
import { isMouseOverButton } from '../methods.js'
import { warningPrompt } from './warningPrompt.js'

// Écran de pause
const pauseScreen = {
  // image de titre
  title: {
    img: new Image(),
    pos: {
      x: 238,
      y: 43,
    },
  },
  clear: () => {
    // Fonction d'arrêt, on enlève les listeners de clavier et souris
    document.removeEventListener('keydown', pauseScreen.keyDown)
    document.removeEventListener('click', pauseScreen.mouseClick)
    document.removeEventListener('mousemove', pauseScreen.mouseMove)

    // Si on n'est pas en train d'afficher un warning prompt, on met le jeu en pause
    if (!warningPrompt.visible) game.pause()
  },
  draw: () => {
    // Fonction d'affichage du menu de pause dans l'écran de jeu et de ses composantes
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7'
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    ctx.drawImage(pauseScreen.title.img, pauseScreen.title.pos.x, pauseScreen.title.pos.y)
    quitButton.draw()
    resumeButton.draw()
  },
  init: () => {
    // Fonction d'initialisation du menu de pause
    pauseScreen.title.img.src = '../assets/menu/pause.png'
    document.addEventListener('keydown', pauseScreen.keyDown)
    document.addEventListener('click', pauseScreen.mouseClick)
    document.addEventListener('mousemove', pauseScreen.mouseMove)
  },
  keyDown: e => {
    // Si le joueur appuie sur échap, on arrête l'écran pause
    if (e.keyCode == 27) pauseScreen.clear()
  },
  mouseClick: e => {
    // Si le joueur clique sur un des boutons, on appelle l'action du bouton
    if (isMouseOverButton(resumeButton, e)) resumeButton.click()
    if (isMouseOverButton(quitButton, e)) quitButton.click()
  },
  mouseMove: e => {
    // Fonction de détection de mouvement de souris

    // On met la propriété 'hover' des boutons à false et on met le curseur à 'default'
    resumeButton.hover = false
    quitButton.hover = false
    document.body.style.cursor = 'default'

    // Si la souris est par-dessus un bouton, on met sa propriété 'hover' à true et on change le curseur
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
