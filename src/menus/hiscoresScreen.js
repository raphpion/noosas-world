import { ctx, GAME_WIDTH, clearScreen, drawCredits } from '../gameScreen.js'
import { clouds } from '../backgrounds/clouds.js'
import { returnButton } from '../buttons/returnButton.js'
import { playMusic } from '../gameAudio.js'
import { isMouseOverButton } from '../methods.js'

let hiscores

const hiscoresScreen = {
  title: {
    img: new Image(),
    pos: {
      x: 175,
      y: 35,
    },
  },
  background: '#ff9257',
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
  clear: () => {
    document.removeEventListener('click', hiscoresScreen.mouseClick)
    document.removeEventListener('mousemove', hiscoresScreen.mouseMove)
  },
  draw: () => {
    clearScreen()
    clouds.draw()
    ctx.drawImage(hiscoresScreen.title.img, hiscoresScreen.title.pos.x, hiscoresScreen.title.pos.y)
    hiscoresScreen.drawHiscores()
    returnButton.draw()
    drawCredits()
  },
  drawHiscores: () => {
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
    if (hiscores[0])
      ctx.drawImage(hiscoresScreen.goldMedal.img, hiscoresScreen.goldMedal.pos.x, hiscoresScreen.goldMedal.pos.y)
    if (hiscores[1])
      ctx.drawImage(hiscoresScreen.silverMedal.img, hiscoresScreen.silverMedal.pos.x, hiscoresScreen.silverMedal.pos.y)
    if (hiscores[2])
      ctx.drawImage(hiscoresScreen.bronzeMedal.img, hiscoresScreen.bronzeMedal.pos.x, hiscoresScreen.bronzeMedal.pos.y)
  },
  drawScore: (score, i) => {
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    if (score[i]) {
      ctx.fillText(`${score[i].score} - ${score[i].name}`, GAME_WIDTH / 2, 145 + i * 60)
    } else ctx.fillText('----------', GAME_WIDTH / 2, 145 + i * 60)
  },
  init: () => {
    hiscores = JSON.parse(localStorage.getItem('hiscores'))
    hiscoresScreen.title.img.src = '../assets/menu/records.png'
    hiscoresScreen.goldMedal.img.src = '../assets/menu/medal_gold.png'
    hiscoresScreen.silverMedal.img.src = '../assets/menu/medal_silver.png'
    hiscoresScreen.bronzeMedal.img.src = '../assets/menu/medal_bronze.png'
    gameScreen.style.backgroundColor = hiscoresScreen.background
    playMusic('titlescreen')
    document.addEventListener('click', hiscoresScreen.mouseClick)
    document.addEventListener('mousemove', hiscoresScreen.mouseMove)
    return setInterval(hiscoresScreen.draw, 1000 / 60)
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

export { hiscoresScreen }
