import { ctx, GAME_WIDTH, clearScreen, drawCredits } from '../gameScreen.js'
import { bg_clouds } from '../backgrounds/clouds.js'
import { musicMinus, musicPlus, soundMinus, soundPlus } from '../buttons/soundControls.js'
import { musicBar, soundBar } from '../buttons/soundBars.js'
import { clearStorageButton } from '../buttons/clearStorageButton.js'
import { returnButton } from '../buttons/returnButton.js'
import { tutorialToggleButton } from '../buttons/tutorialToggleButton.js'
import { playMusic } from '../gameAudio.js'
import { isMouseOverButton } from '../methods.js'
import { warningPrompt } from './warningPrompt.js'

// Écran des options
const settingsScreen = {
  title: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 223,
      y: 63,
    },
  },
  musicIcon: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 160,
      y: 202,
    },
  },
  soundIcon: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 160,
      y: 282,
    },
  },
  background: '#ff9257',
  draw: () => {
    // fonction d'affichage du menu à l'écran
    clearScreen()
    bg_clouds.draw()
    ctx.drawImage(settingsScreen.title.img, settingsScreen.title.pos.x, settingsScreen.title.pos.y)

    ctx.drawImage(settingsScreen.musicIcon.img, settingsScreen.musicIcon.pos.x, settingsScreen.musicIcon.pos.y)
    ctx.drawImage(settingsScreen.soundIcon.img, settingsScreen.soundIcon.pos.x, settingsScreen.soundIcon.pos.y)

    musicMinus.draw()
    musicPlus.draw()
    musicBar.draw()

    soundMinus.draw()
    soundPlus.draw()
    soundBar.draw()

    ctx.fillStyle = 'black'
    tutorialToggleButton.draw()

    clearStorageButton.draw()
    returnButton.draw()

    drawCredits()

    // Si l'avertissement est visible, on l'affiche
    if (warningPrompt.visible) warningPrompt.draw()
  },
  clear: () => {
    // fonction d'arrêt de l'écran des option
    document.removeEventListener('click', settingsScreen.mouseClick)
    document.removeEventListener('mousemove', settingsScreen.mouseMove)
  },
  init: () => {
    // fonction d'initialisation de l'écran des option
    settingsScreen.title.img.src = '../assets/menu/options.png'
    settingsScreen.musicIcon.img.src = '../assets/menu/music.png'
    settingsScreen.soundIcon.img.src = '../assets/menu/sound.png'
    gameScreen.style.backgroundColor = settingsScreen.background

    // placement des éléments
    musicBar.pos.x = GAME_WIDTH / 2 - 28
    musicBar.pos.y = 205
    soundBar.pos.x = GAME_WIDTH / 2 - 28
    soundBar.pos.y = 290

    musicMinus.pos.x = GAME_WIDTH / 2 - 90
    musicMinus.pos.y = 205
    musicPlus.pos.x = GAME_WIDTH / 2 + 98
    musicPlus.pos.y = 205

    soundMinus.pos.x = GAME_WIDTH / 2 - 90
    soundMinus.pos.y = 290
    soundPlus.pos.x = GAME_WIDTH / 2 + 98
    soundPlus.pos.y = 290

    tutorialToggleButton.pos.x = GAME_WIDTH / 2 - 120
    tutorialToggleButton.pos.y = 361

    clearStorageButton.pos.x = (GAME_WIDTH - clearStorageButton.width) / 2
    clearStorageButton.pos.y = 410
    returnButton.pos.x = (GAME_WIDTH - returnButton.width) / 2
    returnButton.pos.y = 510

    playMusic('titlescreen', true)

    // on ajoute les listeners de souris au document et on retourne l'intervalle d'affichage
    document.addEventListener('click', settingsScreen.mouseClick)
    document.addEventListener('mousemove', settingsScreen.mouseMove)
    return setInterval(settingsScreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    // fonction de gestion des clics, renvoie la fonction de chaque bouton lorsqu'on clique dessus
    if (isMouseOverButton(musicMinus, e)) musicMinus.click()
    if (isMouseOverButton(musicPlus, e)) musicPlus.click()
    if (isMouseOverButton(soundMinus, e)) soundMinus.click()
    if (isMouseOverButton(soundPlus, e)) soundPlus.click()
    if (isMouseOverButton(clearStorageButton, e)) clearStorageButton.click()
    if (isMouseOverButton(returnButton, e)) returnButton.click()
    if (isMouseOverButton(tutorialToggleButton, e)) tutorialToggleButton.click()
  },
  mouseMove: e => {
    // fonction de gestion des mouvements de la souris
    // on déclare que les boutons ne sont pas 'hover' et on met le curseur par défaut
    musicMinus.hover = false
    musicPlus.hover = false
    soundMinus.hover = false
    soundPlus.hover = false
    clearStorageButton.hover = false
    returnButton.hover = false
    tutorialToggleButton.hover = false
    document.body.style.cursor = 'default'

    // si la souris est par-dessus un bouton, on le met 'hover' et on change le curseur
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
