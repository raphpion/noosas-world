import { playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'
import { warningPrompt } from '../menus/warningPrompt.js'

// bouton 'quitter' dans l'écran de pause
const quitButton = {
  img: new Image(), // image
  content: 'Quitter', // texte à l'intérieur
  hover: false, // si la souris est sur le bouton
  // position
  pos: {
    x: 200,
    y: 360,
  },
  // dimensions
  width: 400,
  height: 60,
  sourceX: 0, // source X de la vignette
  draw: () => {
    // fonction d'affichage du bouton
    quitButton.img.src = '../assets/menu/button_red.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (quitButton.hover) quitButton.sourceX = 400
    else quitButton.sourceX = 0

    // affichage du bouton et de son texte
    ctx.drawImage(
      quitButton.img,
      quitButton.sourceX,
      0,
      quitButton.width,
      quitButton.height,
      quitButton.pos.x,
      quitButton.pos.y,
      quitButton.width,
      quitButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(quitButton.content, quitButton.pos.x + 200, quitButton.pos.y)
  },
  click: () => {
    // si le joueur clique sur le bouton, on affiche un avertissement
    playSound('button')
    quitButton.hover = false
    document.body.style.cursor = 'default'
    warningPrompt.init('quitGame')
  },
}

export { quitButton }
