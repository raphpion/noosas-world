import { keys } from './controller.js'
import { playSound } from './gameAudio.js'
import { ctx, GAME_WIDTH } from './gameScreen.js'
import { game } from './game.js'

// Personnage joueur
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
  animation: null, // intervalle d'animation du joueur
  crouching: false,
  jumping: true,
  velocity: {
    x: 0,
    y: 0,
  },
  pos: {
    x: 0,
    y: 0,
  },
  hitbox: {
    pos: {
      x: 0,
      y: 0,
    },
    width: 0,
    height: 0,
  },
  animate: () => {
    // Fonction d'animation du personnage

    // Si le personnage est penché
    if (player.crouching) {
      // On applique les dimensions et bloque l'index à 0
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index = 0

      // Selon la direction du personnage, on lui assigne la bonne source X, puis sa source Y
      if (player.sprite.direction == 'right') player.sprite.sourceX = 0
      if (player.sprite.direction == 'left') player.sprite.sourceX = 100
      player.sprite.sourceY = 168
    }

    // Sinon, si le personnage est en train de sauter
    else if (player.jumping) {
      // On applique les dimensions et on incrémente l'index
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index++

      // Si l'index dépasse 2, on le remet à 2 jusqu'à la fin du mouvement
      if (player.sprite.index > 2) player.sprite.index = 2

      // Selon la direction du personnage, on lui assigne la bonne source X, puis sa source Y
      if (player.sprite.direction == 'right') player.sprite.sourceX = player.sprite.index * player.sprite.width
      if (player.sprite.direction == 'left') player.sprite.sourceX = 300 + player.sprite.index * player.sprite.width
      player.sprite.sourceY = 84
    }

    // Sinon, si le personnage n'est pas en action ou s'il est en train de marcher dans les deux directions
    else if (player.sprite.action == 'idle' || (keys.a && keys.d)) {
      // On applique les dimensions et on fixe l'index à zéro
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index = 0

      // Selon la direction du personnage, on lui assigne la bonne source X, puis sa source Y
      if (player.sprite.direction == 'right') player.sprite.sourceX = 0
      if (player.sprite.direction == 'left') player.sprite.sourceX = 300
      player.sprite.sourceY = 0
    }

    // Sinon, si le personnage est en train de marcher
    else if (player.sprite.action == 'walk') {
      // On applique les dimensions et on incrémente l'index
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index++

      // Si l'index dépasse 2, on le ramène à zéro
      if (player.sprite.index > 2) player.sprite.index = 0

      // Selon la direction du personnage, on lui assigne la bonne source X, puis sa source Y
      if (player.sprite.direction == 'right') player.sprite.sourceX = player.sprite.index * player.sprite.width
      if (player.sprite.direction == 'left') player.sprite.sourceX = 300 + player.sprite.index * player.sprite.width
      player.sprite.sourceY = 0
    }
  },
  draw: () => {
    // Fonction d'affichage du personnage dans le canvas

    // Si la partie n'est pas en pause, on appelle la fonction de déplacement du personnage
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

    //* DEBUG: AFFICHAGE DE LA HITBOX
    // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    // ctx.fillRect(player.hitbox.pos.x, player.hitbox.pos.y, player.hitbox.width, player.hitbox.height)
  },
  move: () => {
    // Fonction de déplacement du personnage
    // Si le joueur appuie sur espace et que le personnage n'est pas en train de sauter, on le fait sauter
    if (keys.space && !player.jumping) {
      playSound('jump')
      player.velocity.y -= 35
      player.jumping = true
    }

    // Si le joueur appuie sur une touche de déplacement et qu'il n'est pas penché, on incrémente sa vélocité
    if (keys.a && !player.crouching) player.velocity.x -= 0.5
    if (keys.d && !player.crouching) player.velocity.x += 0.5

    // On applique la gravité sur la vélocité Y du personnage
    player.velocity.y += 1.5

    // On incrémente les positions X et Y du personnage
    player.pos.x += player.velocity.x
    player.pos.y += player.velocity.y

    // On applique l'effet de friction sur la vélocité du personnage
    player.velocity.x *= 0.9
    player.velocity.y *= 0.9

    // Si le personnage dépasse le sol, on remet sa vélocité Y à zéro et on invalide sa booléenne de saut
    if (player.pos.y > 452) {
      player.jumping = false
      player.pos.y = 452
      player.velocity.y = 0
    }

    // Si le personnage dépasse une des limites horizontales, on le replace sur la limite
    if (player.pos.x < 10) player.pos.x = 10
    if (player.pos.x > GAME_WIDTH - 110) player.pos.x = GAME_WIDTH - 110

    // Mise à jour de la hitbox du personnage
    player.updateHitbox()
  },
  updateHitbox: () => {
    // Fonction pour mettre à jour la taille et la position du hitbox du joueur selon son animation

    // Si le joueur est penché, on lui affecte un hitbox plus petit
    if (player.crouching) {
      // Selon la direction du personnage, on change la position X de la
      if (player.sprite.direction == 'right') player.hitbox.pos.x = player.pos.x + 4
      if (player.sprite.direction == 'left') player.hitbox.pos.x = player.pos.x

      player.hitbox.pos.y = player.pos.y + 54
      player.hitbox.width = 96
      player.hitbox.height = 30
    }

    // Sinon, les paramètres de hitbox sont partagés parmi les autres actions
    else {
      // Selon la direction du personnage, on change la position X de la hitbox
      if (player.sprite.direction == 'right') player.hitbox.pos.x = player.pos.x + 8
      if (player.sprite.direction == 'left') player.hitbox.pos.x = player.pos.x

      player.hitbox.pos.y = player.pos.y + 30
      player.hitbox.width = 92
      player.hitbox.height = 54
    }
  },
}

export { player }
