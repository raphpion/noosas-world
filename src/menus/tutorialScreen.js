import { game } from '../game.js'
import { gameScreen, ctx, GAME_WIDTH, clearScreen, getScene } from '../gameScreen.js'
import { pixelClouds } from '../backgrounds/pixelClouds.js'
import { playMusic } from '../gameAudio.js'
import { player } from '../player.js'
import { tutorialToggleButton } from '../buttons/tutorialToggleButton.js'
import { isMouseOverButton } from '../methods.js'

const tutorialScreen = {
  background: new Image(),
  pos: {
    x: 205,
    y: 84,
  },
  clear: () => {
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
    clearScreen()
    pixelClouds.draw()
    ctx.drawImage(game.ground.img, game.ground.pos.x, game.ground.pos.y)
    player.draw()
    ctx.drawImage(tutorialScreen.background, tutorialScreen.pos.x, tutorialScreen.pos.y)
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.drawImage(tutorialScreen.aKey.img, tutorialScreen.aKey.pos.x, tutorialScreen.aKey.pos.y)
    ctx.drawImage(tutorialScreen.dKey.img, tutorialScreen.dKey.pos.x, tutorialScreen.dKey.pos.y)
    ctx.drawImage(tutorialScreen.enterKey.img, tutorialScreen.enterKey.pos.x, tutorialScreen.enterKey.pos.y)
    ctx.drawImage(tutorialScreen.escKey.img, tutorialScreen.escKey.pos.x, tutorialScreen.escKey.pos.y)
    ctx.drawImage(tutorialScreen.spacebarKey.img, tutorialScreen.spacebarKey.pos.x, tutorialScreen.spacebarKey.pos.y)
    tutorialToggleButton.draw()
    ctx.font = '24pt VT323'
    ctx.fillText('Ramassez des croquettes et', GAME_WIDTH / 2, 138)
    ctx.fillText('évitez les bourdons !', GAME_WIDTH / 2, 168)
    ctx.font = '20pt VT323'
    ctx.textAlign = 'left'
    ctx.fillText('Se déplacer', GAME_WIDTH / 2, 233)
    ctx.fillText('Pause', GAME_WIDTH / 2, 293)
    ctx.fillText('Sauter', GAME_WIDTH / 2, 353)
    ctx.fillText('Commencer', GAME_WIDTH / 2, 413)
  },
  init: () => {
    gameScreen.style.backgroundColor = game.background
    game.ground.img.src = '../assets/tiles/ground_grass.png'
    player.sprite.img.src = '../assets/sprites/noosa.png'
    tutorialScreen.background.src = '../assets/menu/tutorial_prompt.png'
    tutorialScreen.aKey.img.src = '../assets/menu/a_key.png'
    tutorialScreen.enterKey.img.src = '../assets/menu/enter_key.png'
    tutorialScreen.escKey.img.src = '../assets/menu/esc_key.png'
    tutorialScreen.dKey.img.src = '../assets/menu/d_key.png'
    tutorialScreen.shiftKey.img.src = '../assets/menu/shift_key.png'
    tutorialScreen.spacebarKey.img.src = '../assets/menu/spacebar_key.png'
    tutorialToggleButton.pos.x = 275
    tutorialToggleButton.pos.y = 456
    playMusic('arcade')
    document.addEventListener('keydown', tutorialScreen.keyDown)
    document.addEventListener('mousemove', tutorialScreen.mouseMove)
    document.addEventListener('click', tutorialScreen.mouseClick)
    return setInterval(tutorialScreen.draw, 1000 / 60)
  },
  keyDown: e => {
    if (e.keyCode == 13) getScene(game)
  },
  mouseClick: e => {
    if (isMouseOverButton(tutorialToggleButton, e)) tutorialToggleButton.click()
  },
  mouseMove: e => {
    tutorialToggleButton.hover = false
    document.body.style.cursor = 'default'
    if (isMouseOverButton(tutorialToggleButton, e)) {
      tutorialToggleButton.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

export { tutorialScreen }
