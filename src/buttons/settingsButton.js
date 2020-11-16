import { playSound } from '../gameAudio.js'
import { ctx, getScene } from '../gameScreen.js'
import { settingsScreen } from '../menus/settingsScreen.js'

// bouton d'accès à l'écran des options
const settingsButton = {
  img: new Image(),
  content: 'Options',
  hover: false,
  pos: {
    x: 200,
    y: 460,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton à l'écran
    settingsButton.img.src = '../assets/menu/button_yellow.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (settingsButton.hover) settingsButton.sourceX = 400
    else settingsButton.sourceX = 0

    // affichage du bouton et de son texte
    ctx.drawImage(
      settingsButton.img,
      settingsButton.sourceX,
      0,
      settingsButton.width,
      settingsButton.height,
      settingsButton.pos.x,
      settingsButton.pos.y,
      settingsButton.width,
      settingsButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(settingsButton.content, settingsButton.pos.x + 200, settingsButton.pos.y)
  },
  click: () => {
    playSound('button')
    settingsButton.hover = false
    document.body.style.cursor = 'default'
    getScene(settingsScreen)
  },
}

export { settingsButton }
