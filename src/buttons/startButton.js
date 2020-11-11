import { ctx } from '../gameScreen.js'

const startButton = {
  img: new Image(),
  color: 'green',
  content: 'Jouer',
  hover: false,
  pos: {
    x: 200,
    y: 260,
  },
  draw: () => {
    if (startButton.hover) {
      startButton.img.src = `../assets/menu/button_${startButton.color}_hover.png`
    } else startButton.img.src = `../assets/menu/button_${startButton.color}.png`
    ctx.drawImage(startButton.img, startButton.pos.x, startButton.pos.y)
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(startButton.content, startButton.pos.x + 200, startButton.pos.y)
  },
  click: () => {
    alert('Vous avez cliqué sur Jouer.\nCette fonction sera implémentée sous peu...')
  },
}

export { startButton }
