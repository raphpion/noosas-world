import { keys } from './controller.js'
import { playSound } from './gameAudio.js'
import { ctx, GAME_WIDTH } from './gameScreen.js'
import { game } from './game.js'

const player = {
  sprite: {
    img: new Image(),
    action: 'idle',
    direction: 'right',
    index: 0,
    sourceX: 0,
    sourceY: 0,
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
    x: 0,
    y: 0,
  },
  animate: () => {
    if (player.jumping) {
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index++
      if (player.sprite.index > 2) player.sprite.index = 2
      if (player.sprite.direction == 'right') player.sprite.sourceX = player.sprite.index * player.sprite.width
      if (player.sprite.direction == 'left') player.sprite.sourceX = 300 + player.sprite.index * player.sprite.width
      player.sprite.sourceY = 84
    } else if (player.sprite.action == 'idle') {
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index = 0
      if (player.sprite.direction == 'right') player.sprite.sourceX = 0
      if (player.sprite.direction == 'left') player.sprite.sourceX = 300
      player.sprite.sourceY = 0
    } else if (player.sprite.action == 'walk') {
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index++
      if (player.sprite.index > 2) player.sprite.index = 0
      if (player.sprite.direction == 'right') player.sprite.sourceX = player.sprite.index * player.sprite.width
      if (player.sprite.direction == 'left') player.sprite.sourceX = 300 + player.sprite.index * player.sprite.width
      player.sprite.sourceY = 0
    }
  },
  draw: () => {
    if (!game.paused) player.move()
    ctx.drawImage(
      player.sprite.img,
      player.sprite.sourceX,
      player.sprite.sourceY,
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
      player.velocity.y -= 35
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
