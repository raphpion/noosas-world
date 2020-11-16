import { playSound } from '../gameAudio.js'
import { ctx, getScene } from '../gameScreen.js'
import { tutorialScreen } from '../menus/tutorialScreen.js'
import { game } from '../game.js'
import { player } from '../player.js'

// bouton 'Jouer' de l'écran-titre
const startButton = {
  img: new Image(),
  content: 'Jouer',
  hover: false,
  pos: {
    x: 200,
    y: 260,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton 'jouer' à l'écran
    startButton.img.src = '../assets/menu/button_green.png'

    // si le bouton est hover, on change sa source en X
    if (startButton.hover) startButton.sourceX = 400
    else startButton.sourceX = 0

    // affichage du bouton et du texte qui l'accompagne à l'écran
    ctx.drawImage(
      startButton.img,
      startButton.sourceX,
      0,
      startButton.width,
      startButton.height,
      startButton.pos.x,
      startButton.pos.y,
      startButton.width,
      startButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(startButton.content, startButton.pos.x + 200, startButton.pos.y)
  },
  click: () => {
    // lorsque le joueur clique sur le bouton
    playSound('button')
    document.body.style.cursor = 'default'
    startButton.hover = false

    // on initialise la position et la direction du joueur
    player.pos.x = 60
    player.pos.y = 492
    player.sprite.direction = 'right'

    // si l'option d'affichage du tutoriel est activée, on le montre; sinon on passe au jeu
    if (localStorage.getItem('showTutorial') == 'true') getScene(tutorialScreen)
    else getScene(game)
  },
}

export { startButton }
