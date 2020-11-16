import { ctx } from '../gameScreen.js'

// variable pour stocker l'intervalle de mouvement des nuages
let cloudMoveInterval

// arrière-plan de nuages en jeu
const pixelClouds = {
  img: new Image(),
  pos: {
    x: 0,
    y: 0,
  },
  draw: () => {
    // fonction d'affichage de l'arrière-plan
    ctx.drawImage(pixelClouds.img, pixelClouds.pos.x, pixelClouds.pos.y)
    ctx.drawImage(pixelClouds.img, pixelClouds.pos.x + 800, pixelClouds.pos.y)
  },
  move: (speed = 1) => {
    // fonction d'initialisation du déplacement des nuages
    cloudMoveInterval = setInterval(function () {
      pixelClouds.pos.x--

      // si le centre de l'image dépasse l'origine du canevas, on la replace à sa position initiale
      if (pixelClouds.pos.x < -800) pixelClouds.pos.x = 0
    }, 1000 / (30 * speed))
  },
  stop: () => {
    // fonction d'arrêt du mouvement des nuages
    clearInterval(cloudMoveInterval)
  },
}

// on charge l'image des nuages
pixelClouds.img.src = '../assets/backgrounds/pixel_clouds.png'

export { pixelClouds }
