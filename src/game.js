import { gameScreen, ctx, clearScreen } from './gameScreen.js'
import { keys } from './controller.js'
import { pixelClouds } from './backgrounds/pixelClouds.js'
import { playMusic, pauseScreenMusic, appendAudioSettings } from './gameAudio.js'
import { player } from './player.js'
import { pauseScreen } from './menus/pauseScreen.js'
import { warningPrompt } from './menus/warningPrompt.js'

// Objet qui représente une partie
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
    // Enlever le listener des touches du clavier
    document.removeEventListener('keydown', game.keyDown)
    document.removeEventListener('keyup', game.keyUp)

    // Arrêt de l'animation du joueur et de son mouvement et arrêt du défilement des nuages
    clearInterval(player.animation)
    player.velocity.x = 0
    player.velocity.y = 0
    pixelClouds.stop()
  },
  draw: () => {
    // Fonction d'affichage du jeu dans le canvas
    clearScreen()
    pixelClouds.draw()
    ctx.drawImage(game.ground.img, game.ground.pos.x, game.ground.pos.y)
    player.draw()

    // Si le jeu est sur Pause, on affiche l'écran pause
    if (game.paused) pauseScreen.draw()

    // Si l'alerte est visible, on l'affiche
    if (warningPrompt.visible) warningPrompt.draw()
  },
  init: () => {
    // Fonction d'initialisation d'une partie
    // Assignation des images et de la musique
    gameScreen.style.backgroundColor = game.background
    game.ground.img.src = '../assets/tiles/ground_grass.png'
    player.sprite.img.src = '../assets/sprites/noosa.png'
    playMusic('arcade')

    // Animation du personnage et des nuages
    pixelClouds.move(0.6)
    player.animation = setInterval(player.animate, 1000 / 8)

    // Ajout des listeners pour les touches du clavier
    document.addEventListener('keydown', game.keyDown)
    document.addEventListener('keyup', game.keyUp)

    // On retourne l'intervalle d'affichage du jeu
    return setInterval(game.draw, 1000 / 60)
  },
  keyDown: e => {
    // Fonction de détection de l'appui d'une touche
    // Touches de mouvement, assignation de l'action du joueur à 'walk' s'il est 'idle'
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

    // Touches d'action
    // Si le joueur appuie sur s, on le couche et s'il marchait, on l'arrête
    if (e.keyCode == 83) {
      keys.s = true
      player.crouching = true
      if (player.sprite.action == 'walking') player.sprite.action = 'idle'
      //? on anime le personnage pour enlever le délai d'animation crouch
      player.animate()
    }
    if (e.keyCode == 32) keys.space = true

    // Touche échap, on met le jeu en pause
    if (e.keyCode == 27) game.pause()
  },
  keyUp: e => {
    // Fonction de détection du relâchement d'une touche
    // Touches de mouvement
    // si la touche directionnelle inverse est appuyée, on met à jour la direction
    // sinon, on met à jour l'action
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

    // touches d'action
    // si le joueur relâche la touche s, on le relève
    if (e.keyCode == 83) {
      keys.s = false
      player.crouching = false
      //? on anime le personnage pour enlever le délai d'animation crouch
      player.animate()
    }
    if (e.keyCode == 32) keys.space = false
  },
  pause: () => {
    // Fonction de gestion de pause
    if (game.paused) {
      // Si la partie est déjà arrêtée, on la repart
      game.paused = false

      // On remet les event listeners
      document.addEventListener('keydown', game.keyDown)
      document.addEventListener('keyup', game.keyUp)

      // On recommence l'intervalle d'animation du joueur
      player.animation = setInterval(player.animate, 1000 / 8)

      // On remet les options audio à leur valeur originale
      appendAudioSettings()
    } else {
      // Si la partie n'était pas déjà arrêtée, on l'arrête
      game.paused = true

      // On désactive toutes les touches du clavier pour éviter les surprises
      keys.clear()

      // Si le joueur était en train de marcher, on le remet 'idle'
      if (player.sprite.action == 'walk') player.sprite.action = 'idle'

      // On enlève les listeners du clavier
      document.removeEventListener('keydown', game.keyDown)
      document.removeEventListener('keyup', game.keyUp)

      // On arrête l'animation du joueur
      clearInterval(player.animation)

      // On initialise l'écran de pause et on réduit le volume de la musique
      pauseScreen.init()
      pauseScreenMusic()
    }
  },
}

export { game }
