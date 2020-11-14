import { keys } from './controller.js'
import { playSound } from './gameAudio.js'
import { ctx, GAME_WIDTH } from './gameScreen.js'

const player = {
  sprite: {
    img: new Image(),
    action: 'idle',
    direction: 'right',
    index: 0,
    sourceX: 0,
    width: 100,
    height: 84,
  },
  animation: null,
  jumping: true,
  velocity: {
    x: 0,
    y: 0,
  },
  pos: {
    x: 60,
    y: 84,
  },
  animate: () => {
    if (player.jumping) {
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index++
      if (player.sprite.index > 2) player.sprite.index = 2
    }
    if (player.sprite.action == 'idle') {
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index = 0
    }
    if (player.sprite.action == 'walk') {
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index++
      if (player.sprite.index > 2) player.sprite.index = 0
    }
    player.sprite.sourceX = player.sprite.index * player.sprite.width
  },
  draw: () => {
    player.move()
    if (player.jumping) player.sprite.img.src = `../assets/sprites/noosa/noosa_running_${player.sprite.direction}.png`
    else player.sprite.img.src = `../assets/sprites/noosa/noosa_${player.sprite.action}_${player.sprite.direction}.png`
    ctx.drawImage(
      player.sprite.img,
      player.sprite.sourceX,
      0,
      player.sprite.width,
      player.sprite.height,
      player.pos.x,
      player.pos.y,
      player.sprite.width,
      player.sprite.height
    )
  },
  move: () => {
    if (keys.space && !player.jumping) {
      playSound('jump')
      player.velocity.y -= 30
      player.jumping = true
      player.sprite.index++
    }
    if (keys.a) player.velocity.x -= 0.5
    if (keys.d) player.velocity.x += 0.5

    player.velocity.y += 1.5
    player.pos.x += player.velocity.x
    player.pos.y += player.velocity.y
    player.velocity.x *= 0.9
    player.velocity.y *= 0.9
    if (player.pos.y > 452) {
      player.jumping = false
      player.pos.y = 452
      player.velocity.y = 0
    }
    if (player.pos.x < 10) player.pos.x = 10
    if (player.pos.x > GAME_WIDTH - 110) player.pos.x = GAME_WIDTH - 110
  },
}

export { player }
