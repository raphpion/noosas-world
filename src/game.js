import { gameScreen, ctx, clearScreen } from './gameScreen.js'
import { keys } from './controller.js'
import { pixelClouds } from './backgrounds/pixelClouds.js'
import { playMusic, pauseScreenMusic, appendAudioSettings } from './gameAudio.js'
import { player } from './player.js'
import { pauseScreen } from './pauseScreen.js'
import { warningPrompt } from './menus/warningPrompt.js'

const game = {
  background: '#b1e7f8',
  ground: {
    img: new Image(),
    pos: {
      x: 0,
      y: 0,
    },
  },
  paused: false,
  clear: () => {
    document.removeEventListener('keydown', game.keyDown)
    document.removeEventListener('keyup', game.keyUp)
    clearInterval(player.animation)
    player.velocity.x = 0
    player.velocity.y = 0
    pixelClouds.stop()
  },
  draw: () => {
    clearScreen()
    pixelClouds.draw()
    ctx.drawImage(game.ground.img, game.ground.pos.x, game.ground.pos.y)
    player.draw()
    if (game.paused) pauseScreen.draw()
    if (warningPrompt.visible) warningPrompt.draw()
  },
  init: () => {
    gameScreen.style.backgroundColor = game.background
    game.ground.img.src = '../assets/tiles/ground_grass.png'
    player.sprite.img.src = '../assets/sprites/noosa.png'
    pixelClouds.move(0.6)
    playMusic('arcade')
    player.animation = setInterval(player.animate, 1000 / 8)
    document.addEventListener('keydown', game.keyDown)
    document.addEventListener('keyup', game.keyUp)
    return setInterval(game.draw, 1000 / 60)
  },
  keyDown: e => {
    if (e.keyCode == 65) {
      keys.a = true
      player.sprite.direction = 'left'
      if ((player.sprite.action = 'idle')) player.sprite.action = 'walk'
    }
    if (e.keyCode == 68) {
      keys.d = true
      player.sprite.direction = 'right'
      if ((player.sprite.action = 'idle')) player.sprite.action = 'walk'
    }
    if (e.keyCode == 32) keys.space = true
    if (e.keyCode == 27) game.pause()
  },
  keyUp: e => {
    if (e.keyCode == 65) {
      keys.a = false
      if (keys.d) player.sprite.direction = 'right'
      else player.sprite.action = 'idle'
    }
    if (e.keyCode == 68) {
      keys.d = false
      if (keys.a) player.sprite.direction = 'left'
      else player.sprite.action = 'idle'
    }
    if (e.keyCode == 32) keys.space = false
  },
  pause: () => {
    if (game.paused) {
      game.paused = false
      document.addEventListener('keydown', game.keyDown)
      document.addEventListener('keyup', game.keyUp)
      player.animation = setInterval(player.animate, 1000 / 8)
      appendAudioSettings()
    } else {
      keys.clear()
      if (player.sprite.action == 'walk') player.sprite.action = 'idle'
      game.paused = true
      document.removeEventListener('keydown', game.keyDown)
      document.removeEventListener('keyup', game.keyUp)
      clearInterval(player.animation)
      pauseScreen.init()
      pauseScreenMusic()
    }
  },
}

export { game }
