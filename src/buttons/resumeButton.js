import { playSound } from '../gameAudio.js'
import { ctx } from '../gameScreen.js'
import { pauseScreen } from '../menus/pauseScreen.js'

// bouton 'Reprendre' dans l'écran de pause
const resumeButton = {
  img: new Image(),
  content: 'Reprendre',
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
    resumeButton.img.src = '../assets/menu/button_blue.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (resumeButton.hover) resumeButton.sourceX = 400
    else resumeButton.sourceX = 0

    // affichage du bouton et de son texte
    ctx.drawImage(
      resumeButton.img,
      resumeButton.sourceX,
      0,
      resumeButton.width,
      resumeButton.height,
      resumeButton.pos.x,
      resumeButton.pos.y,
      resumeButton.width,
      resumeButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(resumeButton.content, resumeButton.pos.x + 200, resumeButton.pos.y)
  },
  click: () => {
    // si le joueur clique sur le bouton, on retourne au jeu
    playSound('button')
    resumeButton.hover = false
    document.body.style.cursor = 'default'
    pauseScreen.clear()
  },
}

export { resumeButton }
