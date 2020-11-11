import { ctx } from '../gameScreen.js'

const hiscoresButton = {
  img: new Image(),
  color: 'blue',
  content: 'Records',
  hover: false,
  pos: {
    x: 200,
    y: 360,
  },
  draw: () => {
    if (hiscoresButton.hover) {
      hiscoresButton.img.src = `../assets/menu/button_${hiscoresButton.color}_hover.png`
    } else hiscoresButton.img.src = `../assets/menu/button_${hiscoresButton.color}.png`
    ctx.drawImage(hiscoresButton.img, hiscoresButton.pos.x, hiscoresButton.pos.y)
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(hiscoresButton.content, hiscoresButton.pos.x + 200, hiscoresButton.pos.y)
  },
  click: () => {
    alert('Vous avez cliqué sur Records.\nCette fonction sera implémentée sous peu...')
  },
}

export { hiscoresButton }
