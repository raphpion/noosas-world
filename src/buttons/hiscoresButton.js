import { playSound } from '../gameAudio.js'
import { ctx, getScene } from '../gameScreen.js'
import { hiscoresScreen } from '../menus/hiscoresScreen.js'

// bouton d'accès à l'écran des records
const hiscoresButton = {
  img: new Image(),
  content: 'Records',
  hover: false,
  pos: {
    x: 200,
    y: 360,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton
    hiscoresButton.img.src = '../assets/menu/button_blue.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (hiscoresButton.hover) hiscoresButton.sourceX = 400
    else hiscoresButton.sourceX = 0

    // affichage du bouton et de son texte
    ctx.drawImage(
      hiscoresButton.img,
      hiscoresButton.sourceX,
      0,
      hiscoresButton.width,
      hiscoresButton.height,
      hiscoresButton.pos.x,
      hiscoresButton.pos.y,
      hiscoresButton.width,
      hiscoresButton.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(hiscoresButton.content, hiscoresButton.pos.x + 200, hiscoresButton.pos.y)
  },
  click: () => {
    // si le joueur clique sur le bouton, on passe à l'écran des records
    playSound('button')
    hiscoresButton.hover = false
    document.body.style.cursor = 'default'
    getScene(hiscoresScreen)
  },
}

export { hiscoresButton }
