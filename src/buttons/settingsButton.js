import { ctx } from '../gameScreen.js'

const settingsButton = {
  img: new Image(),
  color: 'yellow',
  content: 'Options',
  hover: false,
  pos: {
    x: 200,
    y: 460,
  },
  draw: () => {
    if (settingsButton.hover) {
      settingsButton.img.src = `../assets/menu/button_${settingsButton.color}_hover.png`
    } else settingsButton.img.src = `../assets/menu/button_${settingsButton.color}.png`
    ctx.drawImage(settingsButton.img, settingsButton.pos.x, settingsButton.pos.y)
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(settingsButton.content, settingsButton.pos.x + 200, settingsButton.pos.y)
  },
  click: () => {
    alert('Vous avez cliqué sur Options.\nCette fonction sera implémentée sous peu...')
  },
}

export { settingsButton }
