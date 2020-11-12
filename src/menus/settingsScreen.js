import { ctx, clearScreen, drawCredits } from '../gameScreen.js'
import { clouds } from '../backgrounds/clouds.js'
import { musicIcon, soundIcon } from '../buttons/soundIcons.js'
import { musicMinus, musicPlus, soundMinus, soundPlus } from '../buttons/soundControls.js'
import { musicBar, soundBar } from '../buttons/soundBars.js'
import { clearStorageButton } from '../buttons/clearStorageButton.js'
import { returnButton } from '../buttons/returnButton.js'
import { playMusic } from '../gameAudio.js'
import { isMouseOverButton } from '../methods.js'

const settingsScreen = {
  title: {
    img: new Image(),
    pos: {
      x: 175,
      y: 35,
    },
  },
  background: '#ff9257',
  draw: () => {
    clearScreen()
    clouds.draw()
    ctx.drawImage(settingsScreen.title.img, settingsScreen.title.pos.x, settingsScreen.title.pos.y)
    musicIcon.draw()
    musicMinus.draw()
    musicPlus.draw()
    musicBar.draw()
    soundIcon.draw()
    soundMinus.draw()
    soundPlus.draw()
    soundBar.draw()
    clearStorageButton.draw()
    returnButton.draw()
    drawCredits()
  },
  clear: () => {
    document.removeEventListener('click', settingsScreen.mouseClick)
    document.removeEventListener('mousemove', settingsScreen.mouseMove)
  },
  init: () => {
    settingsScreen.title.img.src = '../assets/menu/options.png'
    gameScreen.style.backgroundColor = settingsScreen.background
    playMusic('titlescreen', true)
    document.addEventListener('click', settingsScreen.mouseClick)
    document.addEventListener('mousemove', settingsScreen.mouseMove)
    return setInterval(settingsScreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    if (isMouseOverButton(musicIcon, e)) musicIcon.click()
    if (isMouseOverButton(musicMinus, e)) musicMinus.click()
    if (isMouseOverButton(musicPlus, e)) musicPlus.click()
    if (isMouseOverButton(soundIcon, e)) soundIcon.click()
    if (isMouseOverButton(soundMinus, e)) soundMinus.click()
    if (isMouseOverButton(soundPlus, e)) soundPlus.click()
    if (isMouseOverButton(clearStorageButton, e)) clearStorageButton.click()
    if (isMouseOverButton(returnButton, e)) returnButton.click()
  },
  mouseMove: e => {
    musicIcon.hover = false
    musicMinus.hover = false
    musicPlus.hover = false
    soundIcon.hover = false
    soundMinus.hover = false
    soundPlus.hover = false
    clearStorageButton.hover = false
    returnButton.hover = false
    document.body.style.cursor = 'default'
    if (isMouseOverButton(musicIcon, e)) {
      musicIcon.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(musicMinus, e)) {
      musicMinus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(musicPlus, e)) {
      musicPlus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(soundIcon, e)) {
      soundIcon.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(soundMinus, e)) {
      soundMinus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(soundPlus, e)) {
      soundPlus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(clearStorageButton, e)) {
      clearStorageButton.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(returnButton, e)) {
      returnButton.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

export { settingsScreen }
