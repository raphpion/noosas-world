import { ctx } from '../gameScreen.js'

const returnButton = {
  img: new Image(),
  color: 'red',
  content: 'Retour',
  hover: false,
  pos: {
    x: 200,
    y: 490,
  },
  draw: () => {
    if (returnButton.hover) {
      returnButton.img.src = `../assets/menu/button_${returnButton.color}_hover.png`
    } else returnButton.img.src = `../assets/menu/button_${returnButton.color}.png`
    ctx.drawImage(returnButton.img, returnButton.pos.x, returnButton.pos.y)
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(returnButton.content, returnButton.pos.x + 200, returnButton.pos.y)
  },
  click: () => {
    alert('Vous avez cliqué sur Retour.\nCette fonction sera implémentée sous peu...')
  },
}

export { returnButton }