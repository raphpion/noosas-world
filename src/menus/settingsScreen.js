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

// Écran des options
const settingsScreen = {
  // image de titre
  title: {
    img: new Image(),
    pos: {
      x: 175,
      y: 43,
    },
  },
  // icône du contrôleur de volume de musique
  musicIcon: {
    img: new Image(),
    pos: {
      x: 220,
      y: 182,
    },
  },
  // icône du contrôleur de volume du son
  soundIcon: {
    img: new Image(),
    pos: {
      x: 222,
      y: 262,
    },
  },
  // couleur d'arrière plan
  background: '#ff9257',
  draw: () => {
    // fonction d'affichage du menu à l'écran
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
    tutorialToggleButton.pos.x = 275
    tutorialToggleButton.pos.y = 341
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
