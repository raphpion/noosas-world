import { game } from '../game.js'
import { gameScreen, ctx, GAME_WIDTH, GAME_HEIGHT } from '../gameScreen.js'
import { playMusic } from '../gameAudio.js'
import { player } from '../player.js'
import { tutorialToggleButton } from '../buttons/tutorialToggleButton.js'
import { isMouseOverButton } from '../methods.js'

// Écran de tutoriel
const tutorialScreen = {
  show: false,
  aKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 60,
      y: 140,
    },
  },
  dKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 120,
      y: 140,
    },
  },
  enterKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 60,
      y: 520,
    },
  },
  escKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 60,
      y: 380,
    },
  },
  sKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 60,
      y: 200,
    },
  },
  shiftKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 100,
      y: 320,
    },
  },
  spacebarKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 100,
      y: 260,
    },
  },
  clear: () => {
    // fonction appelée lors de l'arrêt de l'écran de tutoriel
    document.removeEventListener('keydown', tutorialScreen.keyDown)
    document.removeEventListener('mousemove', tutorialScreen.mouseMove)
    document.removeEventListener('click', tutorialScreen.mouseClick)
    pixelClouds.stop()
  },
  draw: () => {
    // fonction d'affichage de l'écran de tutoriel à l'écran

    // overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // touches du clavier
    ctx.drawImage(tutorialScreen.aKey.img, tutorialScreen.aKey.pos.x, tutorialScreen.aKey.pos.y)
    ctx.drawImage(tutorialScreen.dKey.img, tutorialScreen.dKey.pos.x, tutorialScreen.dKey.pos.y)
    ctx.drawImage(tutorialScreen.sKey.img, tutorialScreen.sKey.pos.x, tutorialScreen.sKey.pos.y)
    ctx.drawImage(tutorialScreen.enterKey.img, tutorialScreen.enterKey.pos.x, tutorialScreen.enterKey.pos.y)
    ctx.drawImage(tutorialScreen.escKey.img, tutorialScreen.escKey.pos.x, tutorialScreen.escKey.pos.y)
    ctx.drawImage(tutorialScreen.shiftKey.img, tutorialScreen.shiftKey.pos.x, tutorialScreen.shiftKey.pos.y)
    ctx.drawImage(tutorialScreen.spacebarKey.img, tutorialScreen.spacebarKey.pos.x, tutorialScreen.spacebarKey.pos.y)

    ctx.fillStyle = 'white'
    tutorialToggleButton.draw()

    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.font = '28pt VT323'

    // titre
    ctx.fillText('Ramassez le plus de croquettes', GAME_WIDTH / 2, 60)
    ctx.fillText('en évitant les bourdons !', GAME_WIDTH / 2, 90)

    ctx.font = '20pt VT323'
    ctx.textAlign = 'left'

    // instructions
    ctx.fillText('Se déplacer', GAME_WIDTH / 2, 173)
    ctx.fillText('Se pencher', GAME_WIDTH / 2, 233)
    ctx.fillText('Sauter', GAME_WIDTH / 2, 293)
    ctx.fillText('Courir', GAME_WIDTH / 2, 353)
    ctx.fillText('Pause', GAME_WIDTH / 2, 413)
    ctx.fillText('Appuyez sur', GAME_WIDTH / 2 - 190, 550)
    ctx.fillText('pour commencer', GAME_WIDTH / 2 + 35, 550)
  },
  init: () => {
    // fonction d'initialisation de l'écran tutoriel
    gameScreen.style.backgroundColor = game.background
    game.ground.img.src = '../assets/tiles/ground_grass.png'
    player.sprite.img.src = '../assets/sprites/noosa.png'
    playMusic('arcade')

    // touches du clavier
    tutorialScreen.aKey.img.src = '../assets/menu/a_key.png'
    tutorialScreen.enterKey.img.src = '../assets/menu/enter_key.png'
    tutorialScreen.escKey.img.src = '../assets/menu/esc_key.png'
    tutorialScreen.dKey.img.src = '../assets/menu/d_key.png'
    tutorialScreen.sKey.img.src = '../assets/menu/s_key.png'
    tutorialScreen.shiftKey.img.src = '../assets/menu/shift_key.png'
    tutorialScreen.spacebarKey.img.src = '../assets/menu/spacebar_key.png'

    // bouton toggle
    tutorialToggleButton.pos.x = GAME_WIDTH / 2 - 120
    tutorialToggleButton.pos.y = 460

    // event listeners et retour de l'intervalle
    document.addEventListener('keydown', tutorialScreen.keyDown)
    document.addEventListener('mousemove', tutorialScreen.mouseMove)
    document.addEventListener('click', tutorialScreen.mouseClick)
  },
  keyDown: e => {
    // fonction de gestion de l'appui sur une touche
    if (e.keyCode == 13) {
      tutorialScreen.show = false
      game.start()
    }
  },
  mouseClick: e => {
    // fonction de gestion des clics de la souris
    if (isMouseOverButton(tutorialToggleButton, e)) tutorialToggleButton.click()
  },
  mouseMove: e => {
    // fonction de gestion du mouvement de la souris
    // si la souris est par-dessus le bouton toggle, il est hover et le curseur est changé
    if (isMouseOverButton(tutorialToggleButton, e)) {
      tutorialToggleButton.hover = true
      document.body.style.cursor = 'pointer'
    }
    // sinon, on remet le curseur par défaut et le bouton n'est plus hover
    else {
      tutorialToggleButton.hover = false
      document.body.style.cursor = 'default'
    }
  },
}

export { tutorialScreen }
