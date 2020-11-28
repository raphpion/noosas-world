import { gameScreen, ctx, clearScreen, GAME_WIDTH } from './gameScreen.js'
import { keys } from './controller.js'
import { playMusic, menu_pauseMusic, appendAudioSettings } from './gameAudio.js'
import { player } from './player.js'
import { menu_pause } from './menus/pause.js'
import { menu_gameOver } from './menus/gameOver.js'
import { menu_warningPrompt } from './menus/warningPrompt.js'
import { pushHiscore } from './methods.js'
import { menu_tutorial } from './menus/tutorial.js'
import { map_default } from './maps/default.js'

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
  map: null,
  clear: () => {
    // Enlever le listener des touches du clavier
    document.removeEventListener('keydown', game.keyDown)
    document.removeEventListener('keyup', game.keyUp)

    // Arrêt de l'animation du joueur et de son mouvement
    clearInterval(player.animation)
    player.velocity.x = 0
    player.velocity.y = 0
  },
  draw: () => {
    // Fonction d'affichage du jeu dans le canvas
    clearScreen()

    game.map.draw()

    // Si la partie est terminée, on affiche le menu
    if (game.isOver) menu_gameOver.draw()
    // Sinon si le jeu est sur Pause, on affiche l'écran pause
    else if (game.paused) {
      menu_pause.draw()
      // Si l'alerte est visible, on l'affiche
      if (menu_warningPrompt.visible) menu_warningPrompt.draw()
    }

    // Sinon, si on doit afficher le tutoriel
    else if (menu_tutorial.show) menu_tutorial.draw()
    // Sinon, on affiche le HUD
    else game.drawHUD()
  },
  drawHUD: () => {
    // Fonction pour afficher le Head Up Display
    let hudIcons = new Image()
    hudIcons.src = '../assets/sprites/hud.png'

    ctx.fillStyle = 'black'
    ctx.textBaseline = 'top'

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

    // Le jeu n'est plus en pause ni terminé
    game.paused = false
    game.isOver = false

    // On remet les paramètres par défaut du joueur
    player.default()

    // On initialise la map
    map_default.init()

    // si on doit afficher le tutoriel, on l'initialise. Sinon, on démarre la partie
    if (menu_tutorial.show) {
      menu_tutorial.init()
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
    if (e.keyCode == 16) keys.shift = true

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
    if (e.keyCode == 16) keys.shift = false
  },
  over: () => {
    // Fonction de gestion de défaite
    playMusic('gameover', false)
    game.isOver = true

    // par défaut, ce n'est pas un nouveau record et il n'y a pas de médaille à afficher
    menu_gameOver.newRecord = false
    menu_gameOver.medal.type = null

    // Si le score est supérieur à zéro on tente de l'ajouter aux records
    if (game.kibbles > 0) pushHiscore(game.kibbles)

    // on arrête le jeu
    game.stop()

    // On initialise l'écran de GameOver
    menu_gameOver.init()
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
      menu_pause.init()
      menu_pauseMusic()
    }
  },
  start: () => {
    // fonction qui démarre les événements et les animations du jeu

    // event listeners
    document.addEventListener('keydown', game.keyDown)
    document.addEventListener('keyup', game.keyUp)

    // curseur par défaut
    document.body.style.cursor = 'default'

    // animations
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
    clearInterval(player.animation)
  },
}

export { game }
