import { gameScreen, ctx, clearScreen, GAME_WIDTH } from './gameScreen.js'
import { keys } from './controller.js'
import { pixelClouds } from './backgrounds/pixelClouds.js'
import { playMusic, pauseScreenMusic, appendAudioSettings } from './gameAudio.js'
import { player } from './player.js'
import { pauseScreen } from './menus/pauseScreen.js'
import { gameOverScreen } from './menus/gameOverScreen.js'
import { warningPrompt } from './menus/warningPrompt.js'
import { pushHiscore } from './methods.js'
import { tutorialScreen } from './menus/tutorialScreen.js'
import { map_default } from './maps/map_default.js'

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
  isOver: false,
  paused: false,
  kibbles: 0,
  goldenKibbles: 0,
  map: null,
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
    game.map.draw()

    // Si la partie est terminée, on affiche le menu
    if (game.isOver) gameOverScreen.draw()
    // Sinon si le jeu est sur Pause, on affiche l'écran pause
    else if (game.paused) {
      pauseScreen.draw()
      // Si l'alerte est visible, on l'affiche
      if (warningPrompt.visible) warningPrompt.draw()
    }

    // Sinon, si on doit afficher le tutoriel
    else if (tutorialScreen.show) tutorialScreen.draw()
    // Sinon, on affiche le HUD
    else game.drawHUD()
  },
  drawHUD: () => {
    // Fonction pour afficher le Head Up Display
    let hudIcons = new Image()
    hudIcons.src = '../assets/sprites/hud.png'

    ctx.fillStyle = 'black'
    ctx.textBaseline = 'top'

    // affichage des croquettes d'or
    ctx.textAlign = 'left'
    ctx.drawImage(hudIcons, 0, 0, 16, 16, 13, 13, 16, 16)
    ctx.font = '20pt VT323'
    ctx.fillText(`x${game.goldenKibbles}`, 32, 8)

    // affichage du score
    ctx.font = '24pt VT323'
    ctx.textAlign = 'center'
    ctx.fillText('- Score -', GAME_WIDTH / 2, 5)
    ctx.fillText(game.kibbles, GAME_WIDTH / 2, 32)
  },
  init: () => {
    // Fonction d'initialisation d'une partie
    // Assignation des images et de la musique
    gameScreen.style.backgroundColor = game.background
    game.ground.img.src = '../assets/tiles/ground_grass.png'
    player.sprite.img.src = '../assets/sprites/noosa.png'
    playMusic('arcade')

    // On remet le score à zéro
    game.kibbles = 0
    game.goldenKibbles = 0

    // Le jeu n'est plus en pause ni terminé
    game.paused = false
    game.isOver = false

    // On initialise la map
    map_default.init()

    // si on doit afficher le tutoriel, on l'initialise. Sinon, on démarre la partie
    if (tutorialScreen.show) {
      tutorialScreen.init()
      game.stop()
    } else game.start()

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
  over: () => {
    // Fonction de gestion de défaite
    playMusic('gameover', false)
    game.isOver = true

    // Si le score est supérieur à zéro on tente de l'ajouter aux records
    if (game.kibbles > 0) pushHiscore(game.kibbles)

    // on arrête le jeu
    game.stop()

    // On initialise l'écran de GameOver
    gameOverScreen.init()
  },
  pause: () => {
    // Fonction de gestion de pause
    if (game.paused) {
      // Si la partie est déjà arrêtée, on la repart
      game.paused = false
      game.start()
    } else {
      // Si la partie n'était pas déjà arrêtée, on l'arrête
      game.paused = true
      game.stop()

      // On initialise l'écran de pause et on réduit le volume de la musique
      pauseScreen.init()
      pauseScreenMusic()
    }
  },
  start: () => {
    // fonction qui démarre les événements et les animations du jeu

    // event listeners
    document.addEventListener('keydown', game.keyDown)
    document.addEventListener('keyup', game.keyUp)

    // animations
    pixelClouds.move(0.6)
    player.animation = setInterval(player.animate, 1000 / 8)

    // valeur initiale pour paramètres audio
    appendAudioSettings()
  },
  stop: () => {
    // fonction qui arrête les événements et les animations du jeu

    // On désactive toutes les touches du clavier pour éviter les surprises
    keys.clear()

    // Si le joueur était en train de marcher, on le remet 'idle'
    if (player.sprite.action == 'walk') player.sprite.action = 'idle'

    // On enlève les listeners du clavier
    document.removeEventListener('keydown', game.keyDown)
    document.removeEventListener('keyup', game.keyUp)

    // On arrête l'animation des éléments du jeu
    pixelClouds.stop()
    clearInterval(player.animation)
  },
}

export { game }
