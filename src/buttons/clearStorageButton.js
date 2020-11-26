import { playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'
import { warningPrompt } from '../menus/warningPrompt.js'

// bouton 'Réinitialiser' du menu des options
const clearStorageButton = {
  img: new Image(),
  content: 'Réinitialiser',
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton 'Réinitialiser'
    clearStorageButton.img.src = '../assets/menu/button_red.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (clearStorageButton.hover) clearStorageButton.sourceX = 400
    else clearStorageButton.sourceX = 0

    // affichage du bouton et de son texte
    ctx.drawImage(
      clearStorageButton.img,
      clearStorageButton.sourceX,
      0,
      clearStorageButton.width,
      clearStorageButton.height,
      clearStorageButton.pos.x,
      clearStorageButton.pos.y,
      clearStorageButton.width,
      clearStorageButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(clearStorageButton.content, clearStorageButton.pos.x + 200, clearStorageButton.pos.y)
  },
  click: () => {
    // si le joueur clique sur le bouton, on affiche un avertissement
    playSound('button')
    warningPrompt.init('clearStorage')
  },
}

export { clearStorageButton }
