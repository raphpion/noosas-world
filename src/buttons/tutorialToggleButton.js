import { playSound } from '../gameAudio.js'
import { ctx, GAME_WIDTH } from '../gameScreen.js'

// bouton 'toggle' d'affichage du tutoriel
const tutorialToggleButton = {
  img: new Image(), // image
  hover: false, // si la souris est sur le bouton
  // position
  pos: {
    x: 0,
    y: 0,
  },
  // dimensions
  width: 30,
  height: 30,
  sourceX: 0, // source en X de la vignette
  sourceY: 0, // source en Y de la vignette
  draw: () => {
    // fonction d'affichage du bouton 'toggle' à l'écran
    tutorialToggleButton.img.src = '../assets/menu/button_tutorial.png'
    let value = localStorage.getItem('showTutorial')

    // si l'option est activée, le bouton est vert. sinon, on change sa source en Y pour le mettre rouge
    if (value == 'true') tutorialToggleButton.sourceY = 0
    else tutorialToggleButton.sourceY = 30

    // si le bouton est hover, on change sa source en X
    if (tutorialToggleButton.hover) tutorialToggleButton.sourceX = 30
    else tutorialToggleButton.sourceX = 0

    // affichage du bouton et du texte qui l'accompagne à l'écran
    ctx.drawImage(
      tutorialToggleButton.img,
      tutorialToggleButton.sourceX,
      tutorialToggleButton.sourceY,
      tutorialToggleButton.width,
      tutorialToggleButton.height,
      tutorialToggleButton.pos.x,
      tutorialToggleButton.pos.y,
      tutorialToggleButton.width,
      tutorialToggleButton.height
    )
    ctx.fillStyle = 'black'
    ctx.font = '20pt VT323'
    ctx.textAlign = 'center'
    ctx.fillText('Afficher le tutoriel', GAME_WIDTH / 2 + 23, tutorialToggleButton.pos.y + 27)
  },
  click: () => {
    // lorsque le joueur clique sur le bouton
    playSound('button')
    let value = localStorage.getItem('showTutorial')

    // si l'option d'affichage était désactivée, on l'active, et vice-versa
    if (value == 'true') localStorage.setItem('showTutorial', false)
    else localStorage.setItem('showTutorial', true)
  },
}

export { tutorialToggleButton }
