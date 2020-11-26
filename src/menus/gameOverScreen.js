import { ctx, GAME_WIDTH, GAME_HEIGHT } from '../gameScreen.js'
import { game } from '../game.js'
import { hiscoresButton } from '../buttons/hiscoresButton.js'
import { returnButton } from '../buttons/returnButton.js'
import { isMouseOverButton } from '../methods.js'

// Écran de Game Over
const gameOverScreen = {
  title: {
    img: new Image(),
    pos: {
      x: 248,
      y: 43,
    },
  },
  medal: {
    img: new Image(),
    type: null,
    pos: {
      x: 513,
      y: 265,
    },
  },
  newRecord: false,
  clear: () => {
    document.removeEventListener('click', gameOverScreen.mouseClick)
    document.removeEventListener('mousemove', gameOverScreen.mouseMove)
  },
  draw: () => {
    // Fonction d'affichage du menu gameover et de ses composantes dans l'écran de jeu
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    ctx.drawImage(gameOverScreen.title.img, gameOverScreen.title.pos.x, gameOverScreen.title.pos.y)

    ctx.font = '32pt VT323'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(`Score : ${game.kibbles}`, GAME_WIDTH / 2, GAME_HEIGHT / 2)

    // Si c'est un nouveau record, on l'affiche en-dessous du score
    if (gameOverScreen.newRecord) {
      ctx.fillStyle = '#7cff5e'
      ctx.fillText('Nouveau record!', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30)
    }

    // Si on a un type de médaille à afficher, on le fait
    if (gameOverScreen.medal.type != null) {
      gameOverScreen.medal.img.src = `../assets/menu/medal_${gameOverScreen.medal.type}.png`
      ctx.drawImage(gameOverScreen.medal.img, gameOverScreen.medal.pos.x, gameOverScreen.medal.pos.y)
    }

    // Affichage des boutons
    hiscoresButton.draw()
    returnButton.draw()
  },
  init: () => {
    // Fonction d'initialisation de l'écran Game Over
    gameOverScreen.title.img.src = '../assets/menu/gameOver.png'

    document.addEventListener('click', gameOverScreen.mouseClick)
    document.addEventListener('mousemove', gameOverScreen.mouseMove)

    // Placement des éléments
    hiscoresButton.pos.x = 200
    hiscoresButton.pos.y = 363
    returnButton.pos.x = 200
    returnButton.pos.y = 463
  },
  mouseClick: e => {
    // gestion des clics de la souris, si le joueur clique sur un bouton, on appelle sa fonction de click
    if (isMouseOverButton(hiscoresButton, e)) {
      gameOverScreen.clear()
      hiscoresButton.click()
    }
    if (isMouseOverButton(returnButton, e)) {
      gameOverScreen.clear()
      returnButton.click()
    }
  },
  mouseMove: e => {
    // Fonction de gestion des déplacements de la souris
    // Les boutons ne sont pas 'hover' par défaut et le curseur est celui par défaut
    hiscoresButton.hover = false
    returnButton.hover = false
    document.body.style.cursor = 'default'

    // si la souris est par-dessus un bouton, on le met 'hover' et on change le curseur
    if (isMouseOverButton(hiscoresButton, e)) {
      hiscoresButton.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(returnButton, e)) {
      returnButton.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

export { gameOverScreen }
