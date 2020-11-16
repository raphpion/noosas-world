import { ctx, GAME_WIDTH, clearScreen, drawCredits } from '../gameScreen.js'
import { clouds } from '../backgrounds/clouds.js'
import { returnButton } from '../buttons/returnButton.js'
import { playMusic } from '../gameAudio.js'
import { isMouseOverButton } from '../methods.js'

// Variable pour aller chercher le tableau des records dans le local storage
let hiscores

// Écran des records
const hiscoresScreen = {
  // Titre
  title: {
    img: new Image(),
    pos: {
      x: 175,
      y: 35,
    },
  },
  // Couleur d'arrière-plan
  background: '#ff9257',
  // Médaille d'or
  goldMedal: {
    img: new Image(),
    pos: {
      x: 160,
      y: 140,
    },
  },
  // Médaille d'argent
  silverMedal: {
    img: new Image(),
    pos: {
      x: 160,
      y: 200,
    },
  },
  // Médaille de bronze
  bronzeMedal: {
    img: new Image(),
    pos: {
      x: 160,
      y: 260,
    },
  },
  clear: () => {
    // Fonction d'arrêt, on enlève les listeners de souris
    document.removeEventListener('click', hiscoresScreen.mouseClick)
    document.removeEventListener('mousemove', hiscoresScreen.mouseMove)
  },
  draw: () => {
    // Fonction d'affichage de l'écran des records
    clearScreen()
    clouds.draw()
    ctx.drawImage(hiscoresScreen.title.img, hiscoresScreen.title.pos.x, hiscoresScreen.title.pos.y)
    hiscoresScreen.drawHiscores()
    returnButton.draw()
    drawCredits()
  },
  drawHiscores: () => {
    // Fonction d'affichage des records à l'écran

    // S'il y a des records enregistrés, on affiche les médailles et les records,
    // sinon on indique au joueur qu'il doit jouer pour voir des records
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
    // Fonction d'affichage des records, si un record existe on affiche la médaille à côté
    if (hiscores[0])
      ctx.drawImage(hiscoresScreen.goldMedal.img, hiscoresScreen.goldMedal.pos.x, hiscoresScreen.goldMedal.pos.y)
    if (hiscores[1])
      ctx.drawImage(hiscoresScreen.silverMedal.img, hiscoresScreen.silverMedal.pos.x, hiscoresScreen.silverMedal.pos.y)
    if (hiscores[2])
      ctx.drawImage(hiscoresScreen.bronzeMedal.img, hiscoresScreen.bronzeMedal.pos.x, hiscoresScreen.bronzeMedal.pos.y)
  },
  drawScore: (score, i) => {
    // Fonction d'affichage du texte des records
    ctx.font = '40pt VT323'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'

    // Si le record existe on l'affiche, sinon on affiche une barre pointillée
    if (score[i]) {
      ctx.fillText(`${score[i].score} - ${score[i].name}`, GAME_WIDTH / 2, 145 + i * 60)
    } else ctx.fillText('----------', GAME_WIDTH / 2, 145 + i * 60)
  },
  init: () => {
    // Fonction d'initialisation de l'écran des records
    // On affecte le tableau des records du local storage dans la variable et on initialise les images, le fond et la musique
    hiscores = JSON.parse(localStorage.getItem('hiscores'))
    hiscoresScreen.title.img.src = '../assets/menu/records.png'
    hiscoresScreen.goldMedal.img.src = '../assets/menu/medal_gold.png'
    hiscoresScreen.silverMedal.img.src = '../assets/menu/medal_silver.png'
    hiscoresScreen.bronzeMedal.img.src = '../assets/menu/medal_bronze.png'
    gameScreen.style.backgroundColor = hiscoresScreen.background
    playMusic('titlescreen')

    // On ajoute les listeners de souris au document et on retourne l'intervalle d'affichage
    document.addEventListener('click', hiscoresScreen.mouseClick)
    document.addEventListener('mousemove', hiscoresScreen.mouseMove)
    return setInterval(hiscoresScreen.draw, 1000 / 60)
  },
  mouseClick: e => {
    // Si on clique sur le bouton de retour, on appelle sa fonction click
    if (isMouseOverButton(returnButton, e)) returnButton.click()
  },
  mouseMove: e => {
    // Si la souris est sur le bouton de retour, on change sa propriété 'hover' et le curseur
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
