import { ctx, GAME_WIDTH, getScene } from '../gameScreen.js'
import { game } from '../game.js'
import { isMouseOverButton } from '../methods.js'
import { settingsScreen } from './settingsScreen.js'
import { pauseScreen } from './pauseScreen.js'
import { playSound } from '../gameAudio.js'
import { initialSettings } from '../settings.js'
import { titleScreen } from './titleScreen.js'

// avertissement qui demande une confirmation
const warningPrompt = {
  background: new Image(),
  visible: false,
  reason: '', // raison pour laquelle on appelle l'avertissement
  pos: {
    x: GAME_WIDTH / 2 - 304,
    y: 136,
  },
  clear: () => {
    // fonction d'arrêt de l'écran d'avertissement, on retire les listeners et on le cache
    document.removeEventListener('click', warningPrompt.mouseClick)
    document.removeEventListener('mousemove', warningPrompt.mouseMove)
    warningPrompt.visible = false

    // si la demande provient de l'écran des options, on remet les listeners de cet écran
    if (warningPrompt.reason == 'clearStorage') {
      document.addEventListener('click', settingsScreen.mouseClick)
      document.addEventListener('mousemove', settingsScreen.mouseMove)
    }

    // si la demande provient de l'écran pause, on remet les listeners de cet écran
    if (warningPrompt.reason == 'quitGame') {
      document.addEventListener('keydown', pauseScreen.keyDown)
      document.addEventListener('click', pauseScreen.mouseClick)
      document.addEventListener('mousemove', pauseScreen.mouseMove)
    }
  },
  draw: () => {
    // fonction d'affichage de l'avertissement à l'écran
    ctx.drawImage(warningPrompt.background, warningPrompt.pos.x, warningPrompt.pos.y)
    ctx.font = '40pt VT323'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    // selon la demande, on affiche un texte différent
    if (warningPrompt.reason == 'clearStorage') {
      ctx.fillText('Cette action va effacer', GAME_WIDTH / 2, 210)
      ctx.fillText('toutes vos données de jeu.', GAME_WIDTH / 2, 260)
      ctx.fillText('Continuer ?', GAME_WIDTH / 2, 310)
    } else if (warningPrompt.reason == 'quitGame') {
      ctx.fillText('Votre progression et votre', GAME_WIDTH / 2, 210)
      ctx.fillText('score seront perdus.', GAME_WIDTH / 2, 260)
      ctx.fillText('Continuer ?', GAME_WIDTH / 2, 310)
    }

    // on dessine les boutons
    confirmButton.draw()
    cancelButton.draw()
  },
  init: reason => {
    // fonction d'initialisation de l'avertissement
    warningPrompt.visible = true
    warningPrompt.reason = reason
    warningPrompt.background.src = '../assets/menu/warning_prompt.png'

    // selon la raison, on enlève les listeners de l'écran précédent
    if (warningPrompt.reason == 'clearStorage') settingsScreen.clear()
    if (warningPrompt.reason == 'quitGame') pauseScreen.clear()

    // on applique les nouveaux listeners
    document.addEventListener('click', warningPrompt.mouseClick)
    document.addEventListener('mousemove', warningPrompt.mouseMove)
  },
  mouseClick: e => {
    // gestion des clics de la souris, si le joueur clique sur un bouton on appelle sa fonction
    if (isMouseOverButton(confirmButton, e)) confirmButton.click()
    if (isMouseOverButton(cancelButton, e)) cancelButton.click()
  },
  mouseMove: e => {
    // gestion des mouvements de la souris, par défaut le curseur est 'default' et les boutons ne sont pas hover
    confirmButton.hover = false
    cancelButton.hover = false
    document.body.style.cursor = 'default'

    // si la souris est sur un bouton, on le met 'hover' et on change le curseur
    if (isMouseOverButton(confirmButton, e)) {
      confirmButton.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(cancelButton, e)) {
      cancelButton.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

// bouton de confirmation de l'avertissement
const confirmButton = {
  img: new Image(),
  hover: false,
  pos: {
    x: GAME_WIDTH / 2 - 70,
    y: 370,
  },
  width: 60,
  height: 60,
  sourceX: 0,
  click: () => {
    // si le joueur clique sur le bouton
    playSound('button')
    warningPrompt.clear()

    // si la demande était de réinitialiser les paramètres
    if (warningPrompt.reason == 'clearStorage') {
      // on vide le local storage et on applique les paramètres par défaut
      localStorage.clear()
      initialSettings()
    }

    // si la demande était de quitter le jeu
    if (warningPrompt.reason == 'quitGame') {
      // on enlève les listeners de l'écran de pause et on passe à l'écran-titre
      pauseScreen.clear()
      game.map = null
      getScene(titleScreen)
    }
  },
  draw: () => {
    // fonction d'affichage du bouton de confirmation
    confirmButton.img.src = '../assets/menu/button_confirm.png'

    // selon si le bouton est 'hover' ou non, on change la source en X de la vignette
    if (confirmButton.hover) confirmButton.sourceX = 60
    else confirmButton.sourceX = 0

    // on dessine le bouton à l'écran
    ctx.drawImage(
      confirmButton.img,
      confirmButton.sourceX,
      0,
      confirmButton.width,
      confirmButton.height,
      confirmButton.pos.x,
      confirmButton.pos.y,
      confirmButton.width,
      confirmButton.height
    )
  },
}

// bouton d'annulation de l'avertissement
const cancelButton = {
  img: new Image(),
  hover: false,
  pos: {
    x: GAME_WIDTH / 2 + 10,
    y: 370,
  },
  width: 60,
  height: 60,
  sourceX: 0,
  click: () => {
    // si le joueur clique sur le bouton, on quitte l'écran d'avertissement
    playSound('button')
    warningPrompt.clear()
  },
  draw: () => {
    // fonction d'affichage du bouton d'annulation à l'écran
    cancelButton.img.src = '../assets/menu/button_cancel.png'

    // selon si le bouton est 'hover' ou non, on change la source en X de la vignette
    if (cancelButton.hover) cancelButton.sourceX = 60
    else cancelButton.sourceX = 0

    // affichage du bouton à l'écran
    ctx.drawImage(
      cancelButton.img,
      cancelButton.sourceX,
      0,
      cancelButton.width,
      cancelButton.height,
      cancelButton.pos.x,
      cancelButton.pos.y,
      cancelButton.width,
      cancelButton.height
    )
  },
}

export { warningPrompt }
