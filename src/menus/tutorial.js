import { game } from '../game.js'
import { screen, ctx, GAME_WIDTH, GAME_HEIGHT } from '../screen.js'
import { playMusic } from '../audio.js'
import { player } from '../player.js'
import { btn_tutorialToggle } from '../buttons/tutorialToggle.js'
import { isMouseOverButton } from '../methods.js'

// Écran de tutoriel
const menu_tutorial = {
  show: false,
  aKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 60,
      y: 140,
    },
  },
  dKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 120,
      y: 140,
    },
  },
  enterKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 60,
      y: 520,
    },
  },
  escKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 60,
      y: 380,
    },
  },
  sKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 60,
      y: 200,
    },
  },
  shiftKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 100,
      y: 320,
    },
  },
  spacebarKey: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 100,
      y: 260,
    },
  },
  clear: () => {
    // fonction appelée lors de l'arrêt de l'écran de tutoriel
    document.removeEventListener('keydown', menu_tutorial.keyDown)
    document.removeEventListener('mousemove', menu_tutorial.mouseMove)
    document.removeEventListener('click', menu_tutorial.mouseClick)
    pixelClouds.stop()
  },
  draw: () => {
    // fonction d'affichage de l'écran de tutoriel à l'écran

    // overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // touches du clavier
    ctx.drawImage(menu_tutorial.aKey.img, menu_tutorial.aKey.pos.x, menu_tutorial.aKey.pos.y)
    ctx.drawImage(menu_tutorial.dKey.img, menu_tutorial.dKey.pos.x, menu_tutorial.dKey.pos.y)
    ctx.drawImage(menu_tutorial.sKey.img, menu_tutorial.sKey.pos.x, menu_tutorial.sKey.pos.y)
    ctx.drawImage(menu_tutorial.enterKey.img, menu_tutorial.enterKey.pos.x, menu_tutorial.enterKey.pos.y)
    ctx.drawImage(menu_tutorial.escKey.img, menu_tutorial.escKey.pos.x, menu_tutorial.escKey.pos.y)
    ctx.drawImage(menu_tutorial.shiftKey.img, menu_tutorial.shiftKey.pos.x, menu_tutorial.shiftKey.pos.y)
    ctx.drawImage(menu_tutorial.spacebarKey.img, menu_tutorial.spacebarKey.pos.x, menu_tutorial.spacebarKey.pos.y)

    ctx.fillStyle = 'white'
    btn_tutorialToggle.draw()

    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.font = '28pt VT323'

    // titre
    ctx.fillText('Ramassez le plus de croquettes', GAME_WIDTH / 2, 60)
    ctx.fillText('en évitant les bourdons !', GAME_WIDTH / 2, 90)

    ctx.font = '20pt VT323'
    ctx.textAlign = 'left'

    // instructions
    ctx.fillText('Se déplacer', GAME_WIDTH / 2, 173)
    ctx.fillText('Se pencher', GAME_WIDTH / 2, 233)
    ctx.fillText('Sauter', GAME_WIDTH / 2, 293)
    ctx.fillText('Courir', GAME_WIDTH / 2, 353)
    ctx.fillText('Pause', GAME_WIDTH / 2, 413)
    ctx.fillText('Appuyez sur', GAME_WIDTH / 2 - 190, 550)
    ctx.fillText('pour commencer', GAME_WIDTH / 2 + 35, 550)
  },
  init: () => {
    // fonction d'initialisation de l'écran tutoriel
    screen.style.backgroundColor = game.background
    game.ground.img.src = '../../assets/tiles/ground_grass.png'
    player.sprite.img.src = '../../assets/sprites/noosa.png'
    playMusic('arcade')

    // touches du clavier
    menu_tutorial.aKey.img.src = '../../assets/menu/a_key.png'
    menu_tutorial.enterKey.img.src = '../../assets/menu/enter_key.png'
    menu_tutorial.escKey.img.src = '../../assets/menu/esc_key.png'
    menu_tutorial.dKey.img.src = '../../assets/menu/d_key.png'
    menu_tutorial.sKey.img.src = '../../assets/menu/s_key.png'
    menu_tutorial.shiftKey.img.src = '../../assets/menu/shift_key.png'
    menu_tutorial.spacebarKey.img.src = '../../assets/menu/spacebar_key.png'

    // bouton toggle
    btn_tutorialToggle.pos.x = GAME_WIDTH / 2 - 120
    btn_tutorialToggle.pos.y = 460

    // event listeners et retour de l'intervalle
    document.addEventListener('keydown', menu_tutorial.keyDown)
    document.addEventListener('mousemove', menu_tutorial.mouseMove)
    document.addEventListener('click', menu_tutorial.mouseClick)
  },
  keyDown: e => {
    // fonction de gestion de l'appui sur une touche
    if (e.keyCode == 13) {
      menu_tutorial.show = false
      game.start()
    }
  },
  mouseClick: e => {
    // fonction de gestion des clics de la souris
    if (isMouseOverButton(btn_tutorialToggle, e)) btn_tutorialToggle.click()
  },
  mouseMove: e => {
    // fonction de gestion du mouvement de la souris
    // si la souris est par-dessus le bouton toggle, il est hover et le curseur est changé
    if (isMouseOverButton(btn_tutorialToggle, e)) {
      btn_tutorialToggle.hover = true
      document.body.style.cursor = 'pointer'
    }
    // sinon, on remet le curseur par défaut et le bouton n'est plus hover
    else {
      btn_tutorialToggle.hover = false
      document.body.style.cursor = 'default'
    }
  },
}

export { menu_tutorial }
