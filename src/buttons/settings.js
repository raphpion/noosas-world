import { playSound } from '../audio.js'
import { ctx, getScene } from '../screen.js'
import { menu_settings } from '../menus/settings.js'

// bouton d'accès à l'écran des options
const btn_settings = {
  img: new Image(),
  content: 'Options',
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
    btn_settings.img.src = '../../assets/menu/button_yellow.png'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (btn_settings.hover) btn_settings.sourceX = 400
    else btn_settings.sourceX = 0

    // affichage du bouton et de son texte
    ctx.drawImage(
      btn_settings.img,
      btn_settings.sourceX,
      0,
      btn_settings.width,
      btn_settings.height,
      btn_settings.pos.x,
      btn_settings.pos.y,
      btn_settings.width,
      btn_settings.height
    )
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(btn_settings.content, btn_settings.pos.x + 200, btn_settings.pos.y)
  },
  click: () => {
    playSound('button')
    btn_settings.hover = false
    document.body.style.cursor = 'default'
    getScene(menu_settings)
  },
}

export { btn_settings }
