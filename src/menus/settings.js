import { screen, ctx, GAME_WIDTH, clearScreen, drawCredits } from '../screen.js'
import { bg_clouds } from '../backgrounds/clouds.js'
import { btn_musicMinus, btn_musicPlus, btn_soundMinus, btn_soundPlus } from '../buttons/soundControls.js'
import { musicBar, soundBar } from '../buttons/soundBars.js'
import { btn_clearStorage } from '../buttons/clearStorage.js'
import { btn_return } from '../buttons/return.js'
import { btn_tutorialToggle } from '../buttons/tutorialToggle.js'
import { playMusic } from '../audio.js'
import { isMouseOverButton } from '../methods.js'
import { menu_warningPrompt } from './warningPrompt.js'

// Écran des options
const menu_settings = {
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
    ctx.drawImage(menu_settings.title.img, menu_settings.title.pos.x, menu_settings.title.pos.y)

    ctx.drawImage(menu_settings.musicIcon.img, menu_settings.musicIcon.pos.x, menu_settings.musicIcon.pos.y)
    ctx.drawImage(menu_settings.soundIcon.img, menu_settings.soundIcon.pos.x, menu_settings.soundIcon.pos.y)

    btn_musicMinus.draw()
    btn_musicPlus.draw()
    musicBar.draw()

    btn_soundMinus.draw()
    btn_soundPlus.draw()
    soundBar.draw()

    ctx.fillStyle = 'black'
    btn_tutorialToggle.draw()

    btn_clearStorage.draw()
    btn_return.draw()

    drawCredits()

    // Si l'avertissement est visible, on l'affiche
    if (menu_warningPrompt.visible) menu_warningPrompt.draw()
  },
  clear: () => {
    // fonction d'arrêt de l'écran des option
    document.removeEventListener('click', menu_settings.mouseClick)
    document.removeEventListener('mousemove', menu_settings.mouseMove)
  },
  init: () => {
    // fonction d'initialisation de l'écran des option
    menu_settings.title.img.src = '../../assets/menu/options.png'
    menu_settings.musicIcon.img.src = '../../assets/menu/music.png'
    menu_settings.soundIcon.img.src = '../../assets/menu/sound.png'
    screen.style.backgroundColor = menu_settings.background

    // placement des éléments
    musicBar.pos.x = GAME_WIDTH / 2 - 28
    musicBar.pos.y = 205
    soundBar.pos.x = GAME_WIDTH / 2 - 28
    soundBar.pos.y = 290

    btn_musicMinus.pos.x = GAME_WIDTH / 2 - 90
    btn_musicMinus.pos.y = 205
    btn_musicPlus.pos.x = GAME_WIDTH / 2 + 98
    btn_musicPlus.pos.y = 205

    btn_soundMinus.pos.x = GAME_WIDTH / 2 - 90
    btn_soundMinus.pos.y = 290
    btn_soundPlus.pos.x = GAME_WIDTH / 2 + 98
    btn_soundPlus.pos.y = 290

    btn_tutorialToggle.pos.x = GAME_WIDTH / 2 - 120
    btn_tutorialToggle.pos.y = 361

    btn_clearStorage.pos.x = (GAME_WIDTH - btn_clearStorage.width) / 2
    btn_clearStorage.pos.y = 410
    btn_return.pos.x = (GAME_WIDTH - btn_return.width) / 2
    btn_return.pos.y = 510

    playMusic('titlescreen', true)

    // on ajoute les listeners de souris au document et on retourne l'intervalle d'affichage
    document.addEventListener('click', menu_settings.mouseClick)
    document.addEventListener('mousemove', menu_settings.mouseMove)
    return setInterval(menu_settings.draw, 1000 / 60)
  },
  mouseClick: e => {
    // fonction de gestion des clics, renvoie la fonction de chaque bouton lorsqu'on clique dessus
    if (isMouseOverButton(btn_musicMinus, e)) btn_musicMinus.click()
    if (isMouseOverButton(btn_musicPlus, e)) btn_musicPlus.click()
    if (isMouseOverButton(btn_soundMinus, e)) btn_soundMinus.click()
    if (isMouseOverButton(btn_soundPlus, e)) btn_soundPlus.click()
    if (isMouseOverButton(btn_clearStorage, e)) btn_clearStorage.click()
    if (isMouseOverButton(btn_return, e)) btn_return.click()
    if (isMouseOverButton(btn_tutorialToggle, e)) btn_tutorialToggle.click()
  },
  mouseMove: e => {
    // fonction de gestion des mouvements de la souris
    // on déclare que les boutons ne sont pas 'hover' et on met le curseur par défaut
    btn_musicMinus.hover = false
    btn_musicPlus.hover = false
    btn_soundMinus.hover = false
    btn_soundPlus.hover = false
    btn_clearStorage.hover = false
    btn_return.hover = false
    btn_tutorialToggle.hover = false
    document.body.style.cursor = 'default'

    // si la souris est par-dessus un bouton, on le met 'hover' et on change le curseur
    if (isMouseOverButton(btn_musicMinus, e)) {
      btn_musicMinus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(btn_musicPlus, e)) {
      btn_musicPlus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(btn_soundMinus, e)) {
      btn_soundMinus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(btn_soundPlus, e)) {
      btn_soundPlus.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(btn_clearStorage, e)) {
      btn_clearStorage.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(btn_return, e)) {
      btn_return.hover = true
      document.body.style.cursor = 'pointer'
    }
    if (isMouseOverButton(btn_tutorialToggle, e)) {
      btn_tutorialToggle.hover = true
      document.body.style.cursor = 'pointer'
    }
  },
}

export { menu_settings }
