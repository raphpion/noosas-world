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
  hitbox: [],
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

    // Mise à jour de la hitbox du personnage
    player.updateHitbox()
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
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    for (let i = 0; i < player.hitbox.length; i++) {
      if (player.hitbox[i].type == 'rectangle')
        ctx.fillRect(
          player.hitbox[i].pos.x + player.pos.x,
          player.hitbox[i].pos.y + player.pos.y,
          player.hitbox[i].width,
          player.hitbox[i].height
        )
      if (player.hitbox[i].type == 'circle') {
        ctx.beginPath()
        ctx.arc(
          player.hitbox[i].pos.x + player.pos.x,
          player.hitbox[i].pos.y + player.pos.y,
          player.hitbox[i].radius,
          0,
          2 * Math.PI
        )
        ctx.fill()
      }
    }
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
  },
  updateHitbox: () => {
    // Fonction pour mettre à jour la taille et la position du hitbox du joueur selon son animation
    // On vide le array des hitbox
    player.hitbox = []

    // Si le joueur est penché
    if (player.crouching) {
      // Direction droite
      if (player.sprite.direction == 'right') {
        player.hitbox.push(
          { type: 'circle', pos: { x: 88, y: 64 }, radius: 11 }, // tête
          { type: 'rectangle', pos: { x: 4, y: 54 }, width: 80, height: 22 }, // corps
          { type: 'rectangle', pos: { x: 10, y: 76 }, width: 72, height: 8 } // pattes
        )
      }

      // Direction gauche
      if (player.sprite.direction == 'left') {
        player.hitbox.push(
          { type: 'circle', pos: { x: 11, y: 64 }, radius: 11 }, // tête
          { type: 'rectangle', pos: { x: 16, y: 54 }, width: 80, height: 22 }, // corps
          { type: 'rectangle', pos: { x: 18, y: 76 }, width: 72, height: 8 } // pattes
        )
      }
    }

    // Sinon, si le joueur saute
    else if (player.jumping) {
      // Direction droite
      if (player.sprite.direction == 'right') {
        // Index 0
        if (player.sprite.index == 0) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 88, y: 42 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 2, y: 0 }, width: 12, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 16, y: 36 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 14, y: 68 }, width: 22, height: 16 }, // pattes arrière
            { type: 'rectangle', pos: { x: 64, y: 68 }, width: 18, height: 16 } // pattes avant
          )
        }

        // Index 1
        if (player.sprite.index == 1) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 88, y: 44 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 4, y: 2 }, width: 10, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 4, y: 38 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 8, y: 70 }, width: 18, height: 12 }, // pattes arrière
            { type: 'rectangle', pos: { x: 64, y: 70 }, width: 18, height: 8 } // pattes avant
          )
        }

        // Index 2
        if (player.sprite.index == 2) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 88, y: 42 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 2, y: 0 }, width: 10, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 4, y: 36 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 0, y: 68 }, width: 16, height: 14 }, // pattes arrière
            { type: 'rectangle', pos: { x: 68, y: 68 }, width: 18, height: 14 } // pattes avant
          )
        }
      }

      // Direction gauche
      if (player.sprite.direction == 'left') {
        // Index 0
        if (player.sprite.index == 0) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 11, y: 42 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 86, y: 0 }, width: 12, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 6, y: 36 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 18, y: 68 }, width: 22, height: 16 }, // pattes arrière
            { type: 'rectangle', pos: { x: 64, y: 68 }, width: 18, height: 16 } // pattes avant
          )
        }

        // Index 1
        if (player.sprite.index == 1) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 11, y: 44 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 86, y: 2 }, width: 10, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 18, y: 38 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 74, y: 70 }, width: 18, height: 12 }, // pattes arrière
            { type: 'rectangle', pos: { x: 18, y: 70 }, width: 18, height: 8 } // pattes avant
          )
        }

        // Index 2
        if (player.sprite.index == 2) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 11, y: 42 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 88, y: 0 }, width: 10, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 18, y: 36 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 84, y: 68 }, width: 16, height: 14 }, // pattes arrière
            { type: 'rectangle', pos: { x: 14, y: 68 }, width: 18, height: 14 } // pattes avant
          )
        }
      }
    }

    // Sinon, si le joueur est 'idle'
    else if (player.sprite.action == 'idle') {
      // Direction droite
      if (player.sprite.direction == 'right') {
        player.hitbox.push(
          { type: 'circle', pos: { x: 88, y: 42 }, radius: 11 }, // tête
          { type: 'rectangle', pos: { x: 2, y: 0 }, width: 12, height: 36 }, // queue
          { type: 'rectangle', pos: { x: 6, y: 36 }, width: 78, height: 32 }, // corps
          { type: 'rectangle', pos: { x: 14, y: 68 }, width: 22, height: 16 }, // pattes arrière
          { type: 'rectangle', pos: { x: 64, y: 68 }, width: 18, height: 16 } // pattes avant
        )
      }

      // Direction gauche
      if (player.sprite.direction == 'left') {
        player.hitbox.push(
          { type: 'circle', pos: { x: 11, y: 42 }, radius: 11 }, // tête
          { type: 'rectangle', pos: { x: 86, y: 0 }, width: 12, height: 36 }, // queue
          { type: 'rectangle', pos: { x: 16, y: 36 }, width: 78, height: 32 }, // corps
          { type: 'rectangle', pos: { x: 64, y: 68 }, width: 22, height: 16 }, // pattes arrière
          { type: 'rectangle', pos: { x: 18, y: 68 }, width: 18, height: 16 } // pattes avant
        )
      }
    }

    // Sinon, si le joueur marche
    else if (player.sprite.action == 'walk') {
      // Direction droite
      if (player.sprite.direction == 'right') {
        // Index 0
        if (player.sprite.index == 0) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 88, y: 42 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 2, y: 0 }, width: 12, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 6, y: 36 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 16, y: 68 }, width: 22, height: 16 }, // pattes arrière
            { type: 'rectangle', pos: { x: 64, y: 68 }, width: 18, height: 16 } // pattes avant
          )
        }

        // Index 1
        if (player.sprite.index == 1) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 88, y: 46 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 4, y: 4 }, width: 10, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 4, y: 40 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 16, y: 72 }, width: 28, height: 12 }, // pattes arrière
            { type: 'rectangle', pos: { x: 60, y: 72 }, width: 22, height: 12 } // pattes avant
          )
        }

        // Index 2
        if (player.sprite.index == 2) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 88, y: 44 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 4, y: 4 }, width: 10, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 4, y: 38 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 0, y: 70 }, width: 40, height: 14 }, // pattes arrière
            { type: 'rectangle', pos: { x: 58, y: 70 }, width: 28, height: 14 } // pattes avant
          )
        }
      }

      // Direction gauche

      if (player.sprite.direction == 'left') {
        // Index 0
        if (player.sprite.index == 0) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 11, y: 42 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 86, y: 0 }, width: 12, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 18, y: 36 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 64, y: 68 }, width: 22, height: 16 }, // pattes arrière
            { type: 'rectangle', pos: { x: 18, y: 68 }, width: 18, height: 16 } // pattes avant
          )
        }

        // Index 1
        if (player.sprite.index == 1) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 11, y: 46 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 86, y: 4 }, width: 10, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 18, y: 40 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 64, y: 72 }, width: 28, height: 12 }, // pattes arrière
            { type: 'rectangle', pos: { x: 18, y: 72 }, width: 22, height: 12 } // pattes avant
          )
        }

        // Index 2
        if (player.sprite.index == 2) {
          player.hitbox.push(
            { type: 'circle', pos: { x: 11, y: 44 }, radius: 11 }, // tête
            { type: 'rectangle', pos: { x: 88, y: 2 }, width: 10, height: 36 }, // queue
            { type: 'rectangle', pos: { x: 18, y: 38 }, width: 78, height: 32 }, // corps
            { type: 'rectangle', pos: { x: 60, y: 70 }, width: 40, height: 14 }, // pattes arrière
            { type: 'rectangle', pos: { x: 14, y: 70 }, width: 28, height: 14 } // pattes avant
          )
        }
      }
    }
  },
}

export { player }
