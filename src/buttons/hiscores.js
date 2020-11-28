import { playSound } from '../gameAudio.js'
import { ctx, getScene } from '../gameScreen.js'
import { menu_hiscores } from '../menus/hiscores.js'

// bouton d'accès à l'écran des records
const btn_hiscores = {
  img: new Image(),
  content: 'Records',
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton
    btn_hiscores.img.src = '../assets/menu/button_blue.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (btn_hiscores.hover) btn_hiscores.sourceX = 400
    else btn_hiscores.sourceX = 0

    // affichage du bouton et de son texte
    ctx.drawImage(
      btn_hiscores.img,
      btn_hiscores.sourceX,
      0,
      btn_hiscores.width,
      btn_hiscores.height,
      btn_hiscores.pos.x,
      btn_hiscores.pos.y,
      btn_hiscores.width,
      btn_hiscores.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(btn_hiscores.content, btn_hiscores.pos.x + 200, btn_hiscores.pos.y)
  },
  click: () => {
    // si le joueur clique sur le bouton, on passe à l'écran des records
    playSound('button')
    btn_hiscores.hover = false
    document.body.style.cursor = 'default'
    getScene(menu_hiscores)
  },
}

export { btn_hiscores }
