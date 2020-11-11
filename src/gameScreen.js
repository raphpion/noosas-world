const gameScreen = document.getElementById('gameScreen')
const ctx = gameScreen.getContext('2d')
const GAME_WIDTH = 800
const GAME_HEIGHT = 600

function clearScreen() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
}

function drawCredits() {
  ctx.font = '16pt VT323'
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillText('© Raphaël Pion 2020 - tous droits réservés', GAME_WIDTH / 2, GAME_HEIGHT - 10)
}

export { gameScreen, ctx, GAME_WIDTH, GAME_HEIGHT, clearScreen, drawCredits }