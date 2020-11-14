import { game } from './game.js'
import { gameScreen, ctx, GAME_WIDTH, clearScreen, getScene } from './gameScreen.js'
import { pixelClouds } from './backgrounds/pixelClouds.js'
import { playMusic } from './gameAudio.js'
import { player } from './player.js'
import { tutorialToggleButton } from './buttons/tutorialToggleButton.js'
import { isMouseOverButton } from './methods.js'

const tutorial = {
  background: new Image(),
  pos: {
    x: 205,
    y: 84,
  },
  clear: () => {
    document.removeEventListener('keydown', tutorial.keyDown)
    document.removeEventListener('mousemove', tutorial.mouseMove)
    document.removeEventListener('click', tutorial.mouseClick)
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
    ctx.drawImage(tutorial.background, tutorial.pos.x, tutorial.pos.y)
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.drawImage(tutorial.aKey.img, tutorial.aKey.pos.x, tutorial.aKey.pos.y)
    ctx.drawImage(tutorial.dKey.img, tutorial.dKey.pos.x, tutorial.dKey.pos.y)
    ctx.drawImage(tutorial.enterKey.img, tutorial.enterKey.pos.x, tutorial.enterKey.pos.y)
    ctx.drawImage(tutorial.escKey.img, tutorial.escKey.pos.x, tutorial.escKey.pos.y)
    ctx.drawImage(tutorial.spacebarKey.img, tutorial.spacebarKey.pos.x, tutorial.spacebarKey.pos.y)
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
    tutorial.background.src = '../assets/menu/tutorial_prompt.png'
    tutorial.aKey.img.src = '../assets/menu/a_key.png'
    tutorial.enterKey.img.src = '../assets/menu/enter_key.png'
    tutorial.escKey.img.src = '../assets/menu/esc_key.png'
    tutorial.dKey.img.src = '../assets/menu/d_key.png'
    tutorial.shiftKey.img.src = '../assets/menu/shift_key.png'
    tutorial.spacebarKey.img.src = '../assets/menu/spacebar_key.png'
    tutorialToggleButton.pos.x = 275
    tutorialToggleButton.pos.y = 456
    playMusic('arcade')
    document.addEventListener('keydown', tutorial.keyDown)
    document.addEventListener('mousemove', tutorial.mouseMove)
    document.addEventListener('click', tutorial.mouseClick)
    return setInterval(tutorial.draw, 1000 / 60)
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

export { tutorial }
