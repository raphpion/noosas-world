import { ctx, GAME_WIDTH, clearScreen, drawCredits } from '../gameScreen.js'
import { returnButton } from '../buttons/returnButton.js'
import { isMouseOverButton } from '../methods.js'

const hiscoresScreen = {
  title: {
    img: new Image(),
    pos: {
      x: 175,
      y: 35,
    },
  },
  background: {
    img: new Image(),
    pos: {
      x: 0,
      y: 0,
    },
  },
  goldMedal: {
    img: new Image(),
    pos: {
      x: 160,
      y: 140,
    },
  },
  silverMedal: {
    img: new Image(),
    pos: {
      x: 160,
      y: 200,
    },
  },
  bronzeMedal: {
    img: new Image(),
    pos: {
      x: 160,
      y: 260,
    },
  },
  draw: () => {
    clearScreen()
    ctx.drawImage(hiscoresScreen.background.img, hiscoresScreen.background.pos.x, hiscoresScreen.background.pos.y)
    hiscoresScreen.background.pos.x--
    if (hiscoresScreen.background.pos.x < -800) hiscoresScreen.background.pos.x = 0
    ctx.drawImage(hiscoresScreen.title.img, hiscoresScreen.title.pos.x, hiscoresScreen.title.pos.y)
    hiscoresScreen.drawHiscores()
    returnButton.draw()
    drawCredits()
  },
  drawHiscores: () => {
    let hiscores = localStorage.getItem('hiscores')
    if (hiscores) {
      hiscoresScreen.drawMedals()
      for (let i = 0; i < 5; i++) hiscoresScreen.drawScore(hiscores, i)
    } else {
      ctx.font = '40pt VT323'
      ctx.textBaseline = 'top'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.fillText('Jouez pour voir apparaître', GAME_WIDTH / 2, 255)
      ctx.fillText('vos résultats !', GAME_WIDTH / 2, 305)
    }
  },
  drawMedals: () => {
    ctx.drawImage(hiscoresScreen.goldMedal.img, hiscoresScreen.goldMedal.pos.x, hiscoresScreen.goldMedal.pos.y)
    ctx.drawImage(hiscoresScreen.silverMedal.img, hiscoresScreen.silverMedal.pos.x, hiscoresScreen.silverMedal.pos.y)
    ctx.drawImage(hiscoresScreen.bronzeMedal.img, hiscoresScreen.bronzeMedal.pos.x, hiscoresScreen.bronzeMedal.pos.y)
  },
  drawScore: (score, i) => {
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    if (score[i]) {
      ctx.fillText(`${hiscores[i].score} - ${hiscores[i].name}`, GAME_WIDTH / 2, 145 + i * 60)
    } else ctx.fillText('----------', GAME_WIDTH / 2, 145 + i * 60)
  },
  init: () => {
    document.addEventListener('click', hiscoresScreen.mouseClick)
    document.addEventListener('mousemove', hiscoresScreen.mouseMove)
    setInterval(hiscoresScreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    if (isMouseOverButton(returnButton, e)) returnButton.click()
  },
  mouseMove: e => {
    if (isMouseOverButton(returnButton, e)) {
      returnButton.hover = true
      document.body.style.cursor = 'pointer'
    } else {
      returnButton.hover = false
      document.body.style.cursor = 'default'
    }
  },
}

hiscoresScreen.title.img.src = '../assets/menu/records.png'
hiscoresScreen.background.img.src = '../assets/menu/bg-sky.png'
hiscoresScreen.goldMedal.img.src = '../assets/menu/medal_gold.png'
hiscoresScreen.silverMedal.img.src = '../assets/menu/medal_silver.png'
hiscoresScreen.bronzeMedal.img.src = '../assets/menu/medal_bronze.png'

export { hiscoresScreen }
