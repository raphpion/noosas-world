import { ctx, GAME_WIDTH, clearScreen, drawCredits } from '../gameScreen.js'
import { bg_clouds } from '../backgrounds/clouds.js'
import { btn_return } from '../buttons/return.js'
import { playMusic } from '../gameAudio.js'
import { isLocalItemValid, isMouseOverButton } from '../methods.js'

// Variable pour aller chercher le tableau des records dans le local storage
let hiscores

// Écran des records
const menu_hiscores = {
  title: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 219,
      y: 55,
    },
  },
  background: '#ff9257',
  goldMedal: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 165,
      y: 180,
    },
  },
  silverMedal: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 165,
      y: 240,
    },
  },
  bronzeMedal: {
    img: new Image(),
    pos: {
      x: GAME_WIDTH / 2 - 165,
      y: 300,
    },
  },
  clear: () => {
    // Fonction d'arrêt, on enlève les listeners de souris
    document.removeEventListener('click', menu_hiscores.mouseClick)
    document.removeEventListener('mousemove', menu_hiscores.mouseMove)
  },
  draw: () => {
    // Fonction d'affichage de l'écran des records

    // Si le tableau des records est invalide, supprime la clé du local storage, sinon on va chercher le tableau des records
    if (!isLocalItemValid('hiscores')) {
      localStorage.removeItem('hiscores')
      hiscores = null
    } else hiscores = JSON.parse(localStorage.getItem('hiscores'))
    clearScreen()
    bg_clouds.draw()
    ctx.drawImage(menu_hiscores.title.img, menu_hiscores.title.pos.x, menu_hiscores.title.pos.y)
    menu_hiscores.drawHiscores()
    btn_return.draw()
    drawCredits()
  },
  drawHiscores: () => {
    // Fonction d'affichage des records à l'écran

    // S'il y a des records enregistrés, on affiche les médailles et les records,
    // sinon on indique au joueur qu'il doit jouer pour voir des records
    if (hiscores) {
      menu_hiscores.drawMedals()
      for (let i = 0; i < 5; i++) menu_hiscores.drawScore(hiscores, i)
    } else {
      ctx.font = '40pt VT323'
      ctx.textBaseline = 'top'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.fillText('Jouez pour voir apparaître', GAME_WIDTH / 2, 275)
      ctx.fillText('vos résultats !', GAME_WIDTH / 2, 325)
    }
  },
  drawMedals: () => {
    // Fonction d'affichage des records, si un record existe on affiche la médaille à côté
    if (hiscores[0])
      ctx.drawImage(menu_hiscores.goldMedal.img, menu_hiscores.goldMedal.pos.x, menu_hiscores.goldMedal.pos.y)
    if (hiscores[1])
      ctx.drawImage(menu_hiscores.silverMedal.img, menu_hiscores.silverMedal.pos.x, menu_hiscores.silverMedal.pos.y)
    if (hiscores[2])
      ctx.drawImage(menu_hiscores.bronzeMedal.img, menu_hiscores.bronzeMedal.pos.x, menu_hiscores.bronzeMedal.pos.y)
  },
  drawScore: (score, i) => {
    // Fonction d'affichage du texte des records
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'

    // Si le record existe on l'affiche, sinon on affiche une barre pointillée
    if (score[i]) {
      ctx.fillText(`${score[i]}`, GAME_WIDTH / 2, 185 + i * 60)
    } else ctx.fillText('----------', GAME_WIDTH / 2, 185 + i * 60)
  },
  init: () => {
    // Fonction d'initialisation de l'écran des records
    // On affecte le tableau des records du local storage dans la variable et on initialise les images, le fond et la musique
    menu_hiscores.title.img.src = '../assets/menu/records.png'
    menu_hiscores.goldMedal.img.src = '../assets/menu/medal_gold.png'
    menu_hiscores.silverMedal.img.src = '../assets/menu/medal_silver.png'
    menu_hiscores.bronzeMedal.img.src = '../assets/menu/medal_bronze.png'
    gameScreen.style.backgroundColor = menu_hiscores.background
    playMusic('titlescreen')

    btn_return.pos.x = (GAME_WIDTH - btn_return.width) / 2
    btn_return.pos.y = 510

    // On ajoute les listeners de souris au document et on retourne l'intervalle d'affichage
    document.addEventListener('click', menu_hiscores.mouseClick)
    document.addEventListener('mousemove', menu_hiscores.mouseMove)
    return setInterval(menu_hiscores.draw, 1000 / 60)
  },
  mouseClick: e => {
    // Si on clique sur le bouton de retour, on appelle sa fonction click
    if (isMouseOverButton(btn_return, e)) btn_return.click()
  },
  mouseMove: e => {
    // Si la souris est sur le bouton de retour, on change sa propriété 'hover' et le curseur
    if (isMouseOverButton(btn_return, e)) {
      btn_return.hover = true
      document.body.style.cursor = 'pointer'
    } else {
      btn_return.hover = false
      document.body.style.cursor = 'default'
    }
  },
}

export { menu_hiscores }
