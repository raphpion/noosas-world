const gameScreen = document.getElementById('gameScreen') // l'écran de jeu
const ctx = gameScreen.getContext('2d') // contexte de l'écran de jeu
const GAME_WIDTH = 800 // largeur de l'écran de jeu
const GAME_HEIGHT = 600 // hauteur de l'écran de jeu

let gameInterval // intervalle d'affichage du jeu
let currentScene // scène de jeu présentement en affichage

function clearScreen() {
  // On efface l'écran sur toute sa superficie
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
}

function drawCredits() {
  // On affiche les crédits du jeu au bas de l'écran
  ctx.font = '16pt VT323'
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillText('© Raphaël Pion 2020 - tous droits réservés', GAME_WIDTH / 2, GAME_HEIGHT - 10)
}

function getScene(scene) {
  // Fonction de changement de scène de jeu
  // S'il y a déjà une scène en cours, on appelle sa fonction d'arrêt et on vide l'intervalle d'affichage du jeu
  if (currentScene != null) {
    currentScene.clear()
    clearInterval(gameInterval)
  }

  // On appelle la fonction d'initialisation de la scène, qui nous retourne un intervalle d'affichage et on assigne la scène à la variable de scène courante
  gameInterval = scene.init()
  currentScene = scene
}

export { gameScreen, ctx, GAME_WIDTH, GAME_HEIGHT, clearScreen, drawCredits, getScene }
