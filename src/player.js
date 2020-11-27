import { keys } from './controller.js'
import { playSound } from './gameAudio.js'
import { ctx, GAME_WIDTH, GAME_HEIGHT } from './gameScreen.js'
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

    // Sinon, si le personnage court
    else if (player.sprite.action == 'run') {
      // On applique les dimensions et on incrémente l'index
      player.sprite.width = 100
      player.sprite.height = 84
      player.sprite.index++

      // Si l'index dépasse 2, on le ramène à zéro
      if (player.sprite.index > 2) player.sprite.index = 0

      // Selon la direction du personnage, on lui assigne la bonne source X, puis sa source Y
      if (player.sprite.direction == 'right') player.sprite.sourceX = player.sprite.index * player.sprite.width
      if (player.sprite.direction == 'left') player.sprite.sourceX = 300 + player.sprite.index * player.sprite.width
      player.sprite.sourceY = 84
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

    // Si la partie n'est pas en pause ou arrêté, on appelle la fonction de déplacement du personnage
    if (!game.paused && !game.isOver) player.move()

    // Si le joueur est sur une map, on affiche sa position relative à celle-ci
    if (game.map != null)
      ctx.drawImage(
        player.sprite.img,
        player.sprite.sourceX,
        player.sprite.sourceY,
        player.sprite.width,
        player.sprite.height,
        player.pos.x - game.map.offset.x,
        player.pos.y - game.map.offset.y,
        player.sprite.width,
        player.sprite.height
      )
    // sinon, on affiche le joueur avec sa position par-rapport au canvas
    else
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
    if (localStorage.getItem('debugMode') == 'true') {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
      for (let i = 0; i < player.hitbox.length; i++) {
        // Si le joueur est sur une map, on affiche ses hitbox à sa position relative à la map
        if (game.map != null)
          ctx.fillRect(
            player.hitbox[i].pos.x + player.pos.x - game.map.offset.x,
            player.hitbox[i].pos.y + player.pos.y - game.map.offset.y,
            player.hitbox[i].width,
            player.hitbox[i].height
          )
        // sinon, on affiche les hitbox avec la position relative au canvas
        else
          ctx.fillRect(
            player.hitbox[i].pos.x + player.pos.x,
            player.hitbox[i].pos.y + player.pos.y,
            player.hitbox[i].width,
            player.hitbox[i].height
          )
      }
    }
  },
  handlePlatforms: () => {
    // Fonction qui vérifie si le joueur tombe sur une plateforme et qui, dans le cas échéant, arrête sa chute
    for (let platform of game.map.platforms) {
      // pour chaque plateforme de la carte, si le bas du joueur entre en collision avec la plateforme
      if (
        player.pos.y + player.sprite.height >= platform.pos.y - player.velocity.y &&
        player.pos.y + player.sprite.height <= platform.pos.y + 2
      ) {
        // si au moins la moitié avant du corps du joueur est sur la plateforme
        if (player.pos.x >= platform.pos.x - 50 && player.pos.x <= platform.pos.x + platform.width - 50) {
          // le joueur ne saute plus, on arrête sa vélocité Y et on le replace sur le dessus de la platforme
          player.jumping = false
          player.velocity.y = 0
          player.pos.y = platform.pos.y - player.sprite.height

          return
        }
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
    // Si la touche shift est enfoncée, on augmente la vélocité à un rythme augmenté
    if (keys.shift) {
      if (keys.a && !player.crouching) {
        player.velocity.x -= 0.75
        player.sprite.action = 'run'
      }
      if (keys.d && !player.crouching) {
        player.velocity.x += 0.75
        player.sprite.action = 'run'
      }
    } else {
      if (keys.a || keys.d) player.sprite.action = 'walk'
      if (keys.a && !player.crouching) player.velocity.x -= 0.5
      if (keys.d && !player.crouching) player.velocity.x += 0.5
    }

    // On applique la gravité sur la vélocité Y du personnage
    player.velocity.y += 1.5

    // On incrémente les positions X et Y du personnage
    player.pos.x += player.velocity.x
    player.pos.y += player.velocity.y

    // Si le joueur est sur une map et qu'il est au milieu de l'écran, on incrémente le offset X et Y de celle-ci
    if (game.map != null) {
      // Si le joueur va vers la gauche et qu'il est dans la zone de défilement gauche
      // ou si le joueur va vers la droite et qu'il est dans la zone de défilement droite, on modifie le offset X de la map
      if (
        (player.velocity.x < 0 && player.pos.x - game.map.offset.x >= 252 && player.pos.x - game.map.offset.x <= 348) ||
        (player.velocity.x > 0 && player.pos.x - game.map.offset.x >= 576 && player.pos.x - game.map.offset.x <= 672)
      )
        game.map.offset.x += player.velocity.x
      game.map.offset.y += player.velocity.y

      // Si la map dépasse un de ses offsets, on la ramène sur le offset
      if (game.map.offset.x < 0) game.map.offset.x = 0
      if (game.map.offset.x > game.map.width - GAME_WIDTH) game.map.offset.x = game.map.width - GAME_WIDTH
      if (game.map.offset.y > 0) game.map.offset.y = 0
      if (game.map.offset.y < game.map.width - GAME_HEIGHT) game.map.offset.y = game.map.height - GAME_HEIGHT
    }

    // On applique l'effet de friction sur la vélocité du personnage
    player.velocity.x *= 0.9
    player.velocity.y *= 0.9

    // Si le personnage est en train de tomber, on vérifie s'il atterit sur une plateforme
    if (player.velocity.y > 0) player.handlePlatforms()

    // Si le personnage dépasse une des limites horizontales, on le replace sur la limite
    if (player.pos.x < 0) player.pos.x = 0

    // Si le joueur est sur une map et qu'il dépasse la limite horizontale, on le replace sur la limite
    if (game.map != null && player.pos.x > game.map.width - player.sprite.width)
      player.pos.x = game.map.width - player.sprite.width
    // Sinon, si le joueur n'est pas sur une map et qu'il dépasse le canvas à droite, on le replace sur la limite
    if (game.map == null && player.pos.x > GAME_WIDTH - player.sprite.width)
      player.pos.x = GAME_WIDTH - player.sprite.width
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
          { pos: { x: 82, y: 54 }, width: 14, height: 20 }, // tête
          { pos: { x: 4, y: 54 }, width: 80, height: 22 }, // corps
          { pos: { x: 10, y: 76 }, width: 72, height: 8 } // pattes
        )
      }

      // Direction gauche
      if (player.sprite.direction == 'left') {
        player.hitbox.push(
          { pos: { x: 2, y: 54 }, width: 14, height: 20 }, // tête
          { pos: { x: 16, y: 54 }, width: 80, height: 22 }, // corps
          { pos: { x: 18, y: 76 }, width: 72, height: 8 } // pattes
        )
      }
    }

    // Sinon, si le joueur saute ou qu'il court
    else if (player.jumping || player.sprite.action == 'run') {
      // Direction droite
      if (player.sprite.direction == 'right') {
        // Index 0
        if (player.sprite.index == 0) {
          player.hitbox.push(
            { pos: { x: 78, y: 36 }, width: 20, height: 18 }, // tête
            { pos: { x: 2, y: 0 }, width: 14, height: 38 }, // queue
            { pos: { x: 8, y: 38 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 12, y: 60 }, width: 64, height: 12 }, // bas de corps
            { pos: { x: 16, y: 72 }, width: 20, height: 12 }, // pattes arrières
            { pos: { x: 64, y: 72 }, width: 18, height: 12 } // pattes avant
          )
        }

        // Index 1
        if (player.sprite.index == 1) {
          player.hitbox.push(
            { pos: { x: 78, y: 38 }, width: 20, height: 18 }, // tête
            { pos: { x: 4, y: 2 }, width: 10, height: 40 }, // queue
            { pos: { x: 8, y: 40 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 8, y: 62 }, width: 74, height: 8 }, // bas de corps
            { pos: { x: 8, y: 70 }, width: 18, height: 12 }, // pattes arrières
            { pos: { x: 64, y: 70 }, width: 18, height: 8 } // pattes avant
          )
        }

        // Index 2
        if (player.sprite.index == 2) {
          player.hitbox.push(
            { pos: { x: 78, y: 36 }, width: 20, height: 18 }, // tête
            { pos: { x: 2, y: 0 }, width: 10, height: 40 }, // queue
            { pos: { x: 6, y: 38 }, width: 72, height: 22 }, // haut de corps
            { pos: { x: 4, y: 60 }, width: 74, height: 8 }, // bas de corps
            { pos: { x: 0, y: 68 }, width: 16, height: 14 }, // pattes arrières
            { pos: { x: 68, y: 68 }, width: 18, height: 14 } // pattes avant
          )
        }
      }

      // Direction gauche
      if (player.sprite.direction == 'left') {
        // Index 0
        if (player.sprite.index == 0) {
          player.hitbox.push(
            { pos: { x: 2, y: 36 }, width: 20, height: 18 }, // tête
            { pos: { x: 84, y: 0 }, width: 14, height: 38 }, // queue
            { pos: { x: 22, y: 38 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 24, y: 60 }, width: 64, height: 12 }, // bas de corps
            { pos: { x: 64, y: 72 }, width: 20, height: 12 }, // pattes arrières
            { pos: { x: 18, y: 72 }, width: 18, height: 12 } // pattes avant
          )
        }

        // Index 1
        if (player.sprite.index == 1) {
          player.hitbox.push(
            { pos: { x: 2, y: 38 }, width: 20, height: 18 }, // tête
            { pos: { x: 86, y: 2 }, width: 10, height: 40 }, // queue
            { pos: { x: 22, y: 40 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 18, y: 62 }, width: 74, height: 8 }, // bas de corps
            { pos: { x: 74, y: 70 }, width: 18, height: 12 }, // pattes arrières
            { pos: { x: 18, y: 70 }, width: 18, height: 8 } // pattes avant
          )
        }

        // Index 2
        if (player.sprite.index == 2) {
          player.hitbox.push(
            { pos: { x: 2, y: 36 }, width: 20, height: 18 }, // tête
            { pos: { x: 88, y: 0 }, width: 10, height: 40 }, // queue
            { pos: { x: 22, y: 38 }, width: 72, height: 22 }, // haut de corps
            { pos: { x: 22, y: 60 }, width: 74, height: 8 }, // bas de corps
            { pos: { x: 84, y: 68 }, width: 16, height: 14 }, // pattes arrières
            { pos: { x: 14, y: 68 }, width: 18, height: 14 } // pattes avant
          )
        }
      }
    }

    // Sinon, si le joueur est 'idle'
    else if (player.sprite.action == 'idle') {
      // Direction droite
      if (player.sprite.direction == 'right') {
        player.hitbox.push(
          { pos: { x: 78, y: 36 }, width: 20, height: 18 }, // tête
          { pos: { x: 2, y: 0 }, width: 14, height: 38 }, // queue
          { pos: { x: 8, y: 38 }, width: 70, height: 22 }, // haut de corps
          { pos: { x: 12, y: 60 }, width: 64, height: 12 }, // bas de corps
          { pos: { x: 16, y: 72 }, width: 20, height: 12 }, // pattes arrières
          { pos: { x: 64, y: 72 }, width: 18, height: 12 } // pattes avant
        )
      }

      // Direction gauche
      if (player.sprite.direction == 'left') {
        player.hitbox.push(
          { pos: { x: 2, y: 36 }, width: 20, height: 18 }, // tête
          { pos: { x: 84, y: 0 }, width: 14, height: 38 }, // queue
          { pos: { x: 22, y: 38 }, width: 70, height: 22 }, // haut de corps
          { pos: { x: 24, y: 60 }, width: 64, height: 12 }, // bas de corps
          { pos: { x: 64, y: 72 }, width: 20, height: 12 }, // pattes arrières
          { pos: { x: 18, y: 72 }, width: 18, height: 12 } // pattes avant
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
            { pos: { x: 78, y: 36 }, width: 20, height: 18 }, // tête
            { pos: { x: 2, y: 0 }, width: 14, height: 38 }, // queue
            { pos: { x: 8, y: 38 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 12, y: 60 }, width: 64, height: 12 }, // bas de corps
            { pos: { x: 16, y: 72 }, width: 20, height: 12 }, // pattes arrières
            { pos: { x: 64, y: 72 }, width: 18, height: 12 } // pattes avant
          )
        }

        // Index 1
        if (player.sprite.index == 1) {
          player.hitbox.push(
            { pos: { x: 78, y: 40 }, width: 20, height: 18 }, // tête
            { pos: { x: 4, y: 4 }, width: 10, height: 40 }, // queue
            { pos: { x: 8, y: 42 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 8, y: 64 }, width: 74, height: 10 }, // bas de corps
            { pos: { x: 8, y: 74 }, width: 28, height: 10 }, // pattes arrières
            { pos: { x: 60, y: 74 }, width: 20, height: 10 } // pattes avant
          )
        }

        // Index 2
        if (player.sprite.index == 2) {
          player.hitbox.push(
            { pos: { x: 78, y: 38 }, width: 20, height: 18 }, // tête
            { pos: { x: 2, y: 2 }, width: 10, height: 40 }, // queue
            { pos: { x: 8, y: 40 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 0, y: 62 }, width: 78, height: 12 }, // bas de corps
            { pos: { x: 0, y: 74 }, width: 40, height: 10 }, // pattes arrières
            { pos: { x: 58, y: 74 }, width: 28, height: 10 } // pattes avant
          )
        }
      }

      // Direction gauche

      if (player.sprite.direction == 'left') {
        // Index 0
        if (player.sprite.index == 0) {
          player.hitbox.push(
            { pos: { x: 2, y: 36 }, width: 20, height: 18 }, // tête
            { pos: { x: 84, y: 0 }, width: 14, height: 38 }, // queue
            { pos: { x: 22, y: 38 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 24, y: 60 }, width: 64, height: 12 }, // bas de corps
            { pos: { x: 64, y: 72 }, width: 20, height: 12 }, // pattes arrières
            { pos: { x: 18, y: 72 }, width: 18, height: 12 } // pattes avant
          )
        }

        // Index 1
        if (player.sprite.index == 1) {
          player.hitbox.push(
            { pos: { x: 2, y: 40 }, width: 20, height: 18 }, // tête
            { pos: { x: 86, y: 4 }, width: 10, height: 40 }, // queue
            { pos: { x: 22, y: 42 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 18, y: 64 }, width: 74, height: 10 }, // bas de corps
            { pos: { x: 64, y: 74 }, width: 28, height: 10 }, // pattes arrières
            { pos: { x: 20, y: 74 }, width: 20, height: 10 } // pattes avant
          )
        }

        // Index 2
        if (player.sprite.index == 2) {
          player.hitbox.push(
            { pos: { x: 2, y: 38 }, width: 20, height: 18 }, // tête
            { pos: { x: 88, y: 2 }, width: 10, height: 40 }, // queue
            { pos: { x: 22, y: 40 }, width: 70, height: 22 }, // haut de corps
            { pos: { x: 22, y: 62 }, width: 78, height: 12 }, // bas de corps
            { pos: { x: 60, y: 74 }, width: 40, height: 10 }, // pattes arrières
            { pos: { x: 14, y: 74 }, width: 28, height: 10 } // pattes avant
          )
        }
      }
    }
  },
}

export { player }
