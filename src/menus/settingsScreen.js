import { ctx, clearScreen, drawCredits } from '../gameScreen.js'
import { clouds } from '../backgrounds/clouds.js'
import { musicMinus, musicPlus, soundMinus, soundPlus } from '../buttons/soundControls.js'
import { musicBar, soundBar } from '../buttons/soundBars.js'
import { clearStorageButton } from '../buttons/clearStorageButton.js'
import { returnButton } from '../buttons/returnButton.js'
import { tutorialToggleButton } from '../buttons/tutorialToggleButton.js'
import { playMusic } from '../gameAudio.js'
import { isMouseOverButton } from '../methods.js'
import { warningPrompt } from './warningPrompt.js'

const settingsScreen = {
  title: {
    img: new Image(),
    pos: {
      x: 175,
      y: 43,
    },
  },
  musicIcon: {
    img: new Image(),
    pos: {
      x: 220,
      y: 182,
    },
  },
  soundIcon: {
    img: new Image(),
    pos: {
      x: 222,
      y: 262,
    },
  },
  background: '#ff9257',
  draw: () => {
    clearScreen()
    clouds.draw()
    ctx.drawImage(settingsScreen.title.img, settingsScreen.title.pos.x, settingsScreen.title.pos.y)
    ctx.drawImage(settingsScreen.musicIcon.img, settingsScreen.musicIcon.pos.x, settingsScreen.musicIcon.pos.y)
    ctx.drawImage(settingsScreen.soundIcon.img, settingsScreen.soundIcon.pos.x, settingsScreen.soundIcon.pos.y)
    musicMinus.draw()
    musicPlus.draw()
    musicBar.draw()
    soundMinus.draw()
    soundPlus.draw()
    soundBar.draw()
    tutorialToggleButton.draw()
    clearStorageButton.draw()
    returnButton.draw()
    drawCredits()
    if (warningPrompt.visible) warningPrompt.draw()
  },
  clear: () => {
    document.removeEventListener('click', settingsScreen.mouseClick)
    document.removeEventListener('mousemove', settingsScreen.mouseMove)
  },
  init: () => {
    settingsScreen.title.img.src = '../assets/menu/options.png'
    settingsScreen.musicIcon.img.src = '../assets/menu/music.png'
    settingsScreen.soundIcon.img.src = '../assets/menu/sound.png'
    gameScreen.style.backgroundColor = settingsScreen.background
    tutorialToggleButton.pos.x = 275
    tutorialToggleButton.pos.y = 341
    playMusic('titlescreen', true)
    document.addEventListener('click', settingsScreen.mouseClick)
    document.addEventListener('mousemove', settingsScreen.mouseMove)
    return setInterval(settingsScreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    if (isMouseOverButton(musicMinus, e)) musicMinus.click()
    if (isMouseOverButton(musicPlus, e)) musicPlus.click()
    if (isMouseOverButton(soundMinus, e)) soundMinus.click()
    if (isMouseOverButton(soundPlus, e)) soundPlus.click()
    if (isMouseOverButton(clearStorageButton, e)) clearStorageButton.click()
    if (isMouseOverButton(returnButton, e)) returnButton.click()
    if (isMouseOverButton(tutorialToggleButton, e)) tutorialToggleButton.click()
  },
  mouseMove: e => {
    musicMinus.hover = false
    musicPlus.hover = false
    soundMinus.hover = false
    soundPlus.hover = false
    clearStorageButton.hover = false
    returnButton.hover = false
    tutorialToggleButton.hover = false
    document.body.style.cursor = 'default'
    if (isMouseOverButton(musicMinus, e)) {
      musicMinus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(musicPlus, e)) {
      musicPlus.hover = true
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
    if (isMouseOverButton(tutorialToggleButton, e)) {
      tutorialToggleButton.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

export { settingsScreen }
