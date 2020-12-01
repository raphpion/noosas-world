import { playSound } from '../audio.js'
import { ctx, getScene } from '../screen.js'
import { menu_titlescreen } from '../menus/titlescreen.js'
import { sprites, sfx } from '../assets.js'

// bouton de retour dans les écrans 'Options' et 'Records'
const btn_return = {
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

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (btn_return.hover) btn_return.sourceX = 400
    else btn_return.sourceX = 0

    // affichage du bouton et de son texte
    ctx.drawImage(
      sprites.button_blue,
      btn_return.sourceX,
      0,
      btn_return.width,
      btn_return.height,
      btn_return.pos.x,
      btn_return.pos.y,
      btn_return.width,
      btn_return.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(btn_return.content, btn_return.pos.x + 200, btn_return.pos.y)
  },
  click: () => {
    // si le joueur clique sur le bouton, on retourne à l'écran-titre
    playSound(sfx.button)
    btn_return.hover = false
    document.body.style.cursor = 'default'
    getScene(menu_titlescreen)
  },
}

export { btn_return }
