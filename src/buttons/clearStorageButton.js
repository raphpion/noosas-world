import { ctx } from '../gameScreen.js'

const clearStorageButton = {
  img: new Image(),
  color: 'red',
  content: 'Réinitialiser',
  hover: false,
  pos: {
    x: 200,
    y: 390,
  },
  draw: () => {
    if (clearStorageButton.hover) {
      clearStorageButton.img.src = `../assets/menu/button_${clearStorageButton.color}_hover.png`
    } else clearStorageButton.img.src = `../assets/menu/button_${clearStorageButton.color}.png`
    ctx.drawImage(clearStorageButton.img, clearStorageButton.pos.x, clearStorageButton.pos.y)
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(clearStorageButton.content, clearStorageButton.pos.x + 200, clearStorageButton.pos.y)
  },
  click: () => {
    alert('Vous avez cliqué sur Réinitialiser.\nCette fonction sera implémentée sous peu...')
  },
}

export { clearStorageButton }
