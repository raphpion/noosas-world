import { ctx, GAME_WIDTH, getScene } from '../screen.js'
import { game } from '../game.js'
import { isMouseOverButton } from '../methods.js'
import { menu_settings } from './settings.js'
import { menu_pause } from './pause.js'
import { playSound } from '../audio.js'
import { initialSettings } from '../settings.js'
import { menu_titlescreen } from './titlescreen.js'

// avertissement qui demande une confirmation
const menu_warningPrompt = {
  background: new Image(),
  visible: false,
  reason: '', // raison pour laquelle on appelle l'avertissement
  pos: {
    x: GAME_WIDTH / 2 - 304,
    y: 136,
  },
  clear: () => {
    // fonction d'arrêt de l'écran d'avertissement, on retire les listeners et on le cache
    document.removeEventListener('click', menu_warningPrompt.mouseClick)
    document.removeEventListener('mousemove', menu_warningPrompt.mouseMove)
    menu_warningPrompt.visible = false

    // si la demande provient de l'écran des options, on remet les listeners de cet écran
    if (menu_warningPrompt.reason == 'clearStorage') {
      document.addEventListener('click', menu_settings.mouseClick)
      document.addEventListener('mousemove', menu_settings.mouseMove)
    }

    // si la demande provient de l'écran pause, on remet les listeners de cet écran
    if (menu_warningPrompt.reason == 'quitGame') {
      document.addEventListener('keydown', menu_pause.keyDown)
      document.addEventListener('click', menu_pause.mouseClick)
      document.addEventListener('mousemove', menu_pause.mouseMove)
    }
  },
  draw: () => {
    // fonction d'affichage de l'avertissement à l'écran
    ctx.drawImage(menu_warningPrompt.background, menu_warningPrompt.pos.x, menu_warningPrompt.pos.y)
    ctx.font = '40pt VT323'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    // selon la demande, on affiche un texte différent
    if (menu_warningPrompt.reason == 'clearStorage') {
      ctx.fillText('Cette action va effacer', GAME_WIDTH / 2, 210)
      ctx.fillText('toutes vos données de jeu.', GAME_WIDTH / 2, 260)
      ctx.fillText('Continuer ?', GAME_WIDTH / 2, 310)
    } else if (menu_warningPrompt.reason == 'quitGame') {
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
    menu_warningPrompt.visible = true
    menu_warningPrompt.reason = reason
    menu_warningPrompt.background.src = '../assets/menu/warning_prompt.png'

    // selon la raison, on enlève les listeners de l'écran précédent
    if (menu_warningPrompt.reason == 'clearStorage') menu_settings.clear()
    if (menu_warningPrompt.reason == 'quitGame') menu_pause.clear()

    // on applique les nouveaux listeners
    document.addEventListener('click', menu_warningPrompt.mouseClick)
    document.addEventListener('mousemove', menu_warningPrompt.mouseMove)
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
    menu_warningPrompt.clear()

    // si la demande était de réinitialiser les paramètres
    if (menu_warningPrompt.reason == 'clearStorage') {
      // on vide le local storage et on applique les paramètres par défaut
      localStorage.clear()
      initialSettings()
    }

    // si la demande était de quitter le jeu
    if (menu_warningPrompt.reason == 'quitGame') {
      // on enlève les listeners de l'écran de pause et on passe à l'écran-titre
      menu_pause.clear()
      game.map = null
      getScene(menu_titlescreen)
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
    menu_warningPrompt.clear()
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

export { menu_warningPrompt }
