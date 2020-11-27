import { playSound } from '../gameAudio.js'
import { ctx, getScene } from '../gameScreen.js'
import { titleScreen } from '../menus/titleScreen.js'

// bouton de retour dans les écrans 'Options' et 'Records'
const returnButton = {
  img: new Image(),
  content: 'Retour',
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton à l'écran
    returnButton.img.src = '../assets/menu/button_blue.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (returnButton.hover) returnButton.sourceX = 400
    else returnButton.sourceX = 0

    // affichage du bouton et de son texte
    ctx.drawImage(
      returnButton.img,
      returnButton.sourceX,
      0,
      returnButton.width,
      returnButton.height,
      returnButton.pos.x,
      returnButton.pos.y,
      returnButton.width,
      returnButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(returnButton.content, returnButton.pos.x + 200, returnButton.pos.y)
  },
  click: () => {
    // si le joueur clique sur le bouton, on retourne à l'écran-titre
    playSound('button')
    returnButton.hover = false
    document.body.style.cursor = 'default'
    getScene(titleScreen)
  },
}

export { returnButton }
