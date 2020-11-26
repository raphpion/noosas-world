import { game } from '../game.js'
import { gameScreen, ctx, GAME_WIDTH, clearScreen, getScene } from '../gameScreen.js'
import { pixelClouds } from '../backgrounds/pixelClouds.js'
import { playMusic } from '../gameAudio.js'
import { player } from '../player.js'
import { tutorialToggleButton } from '../buttons/tutorialToggleButton.js'
import { isMouseOverButton } from '../methods.js'

// écran tutoriel au début du jeu
const tutorialScreen = {
  background: new Image(),
  pos: {
    x: 205,
    y: 84,
  },
  clear: () => {
    // fonction appelée lorsqu'on quitte le tutoriel, retrait des event listeners
    document.removeEventListener('keydown', tutorialScreen.keyDown)
    document.removeEventListener('mousemove', tutorialScreen.mouseMove)
    document.removeEventListener('click', tutorialScreen.mouseClick)
    pixelClouds.stop()
  },
  aKey: {
    img: new Image(),
    pos: {
      x: 290,
      y: 200,
    },
  },
  dKey: {
    img: new Image(),
    pos: {
      x: 340,
      y: 200,
    },
  },
  enterKey: {
    img: new Image(),
    pos: {
      x: 300,
      y: 380,
    },
  },
  escKey: {
    img: new Image(),
    pos: {
      x: 340,
      y: 260,
    },
  },
  shiftKey: {
    img: new Image(),
    pos: {
      x: 0,
      y: 0,
    },
  },
  spacebarKey: {
    img: new Image(),
    pos: {
      x: 300,
      y: 320,
    },
  },
  draw: () => {
    // fonction d'affichage du tutoriel à l'écran
    clearScreen()

    // éléments du décor et joueur
    pixelClouds.draw()
    ctx.drawImage(game.ground.img, game.ground.pos.x, game.ground.pos.y)
    player.draw()

    // éléments du tutoriel
    ctx.drawImage(tutorialScreen.background, tutorialScreen.pos.x, tutorialScreen.pos.y)

    // touches du clavier
    ctx.drawImage(tutorialScreen.aKey.img, tutorialScreen.aKey.pos.x, tutorialScreen.aKey.pos.y)
    ctx.drawImage(tutorialScreen.dKey.img, tutorialScreen.dKey.pos.x, tutorialScreen.dKey.pos.y)
    ctx.drawImage(tutorialScreen.enterKey.img, tutorialScreen.enterKey.pos.x, tutorialScreen.enterKey.pos.y)
    ctx.drawImage(tutorialScreen.escKey.img, tutorialScreen.escKey.pos.x, tutorialScreen.escKey.pos.y)
    ctx.drawImage(tutorialScreen.spacebarKey.img, tutorialScreen.spacebarKey.pos.x, tutorialScreen.spacebarKey.pos.y)

    tutorialToggleButton.draw()

    // titre
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.font = '24pt VT323'
    ctx.fillText('Ramassez des croquettes et', GAME_WIDTH / 2, 138)
    ctx.fillText('évitez les bourdons !', GAME_WIDTH / 2, 168)

    // texte de contenu
    ctx.font = '20pt VT323'
    ctx.textAlign = 'left'
    ctx.fillText('Se déplacer', GAME_WIDTH / 2, 233)
    ctx.fillText('Pause', GAME_WIDTH / 2, 293)
    ctx.fillText('Sauter', GAME_WIDTH / 2, 353)
    ctx.fillText('Commencer', GAME_WIDTH / 2, 413)
  },
  init: () => {
    // fonction d'initialisation de l'écran tutoriel
    gameScreen.style.backgroundColor = game.background
    playMusic('arcade')

    // images des éléments à afficher
    game.ground.img.src = '../assets/tiles/ground_grass.png'
    player.sprite.img.src = '../assets/sprites/noosa.png'
    tutorialScreen.background.src = '../assets/menu/tutorial_prompt.png'
    tutorialScreen.aKey.img.src = '../assets/menu/a_key.png'
    tutorialScreen.enterKey.img.src = '../assets/menu/enter_key.png'
    tutorialScreen.escKey.img.src = '../assets/menu/esc_key.png'
    tutorialScreen.dKey.img.src = '../assets/menu/d_key.png'
    tutorialScreen.shiftKey.img.src = '../assets/menu/shift_key.png'
    tutorialScreen.spacebarKey.img.src = '../assets/menu/spacebar_key.png'

    // position du bouton toggle
    tutorialToggleButton.pos.x = 275
    tutorialToggleButton.pos.y = 456

    // ajout des event listeners et retour de l'intervalle d'affichage
    document.addEventListener('keydown', tutorialScreen.keyDown)
    document.addEventListener('mousemove', tutorialScreen.mouseMove)
    document.addEventListener('click', tutorialScreen.mouseClick)
    return setInterval(tutorialScreen.draw, 1000 / 60)
  },
  keyDown: e => {
    // lorsque le joueur clique sur enter, on entre dans le jeu
    if (e.keyCode == 13) getScene(game)
  },
  mouseClick: e => {
    // lorsque le joueur clique sur le bouton toggle, on appelle sa fonction click
    if (isMouseOverButton(tutorialToggleButton, e)) tutorialToggleButton.click()
  },
  mouseMove: e => {
    // par défaut, le bouton toggle n'est pas hover et le curseur est par défaut
    tutorialToggleButton.hover = false
    document.body.style.cursor = 'default'

    // si la souris passe sur le bouton toggle, on le met 'hover' et on change le curseur
    if (isMouseOverButton(tutorialToggleButton, e)) {
      tutorialToggleButton.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

export { tutorialScreen }
