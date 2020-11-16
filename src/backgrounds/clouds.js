import { ctx } from '../gameScreen.js'

// arrière-plan de nuages du menu principal
const clouds = {
  img: new Image(),
  pos: {
    x: 0,
    y: 0,
  },
  draw: () => {
    // fonction d'affichage et de déplacement des nuages
    ctx.drawImage(clouds.img, clouds.pos.x, clouds.pos.y)
    clouds.pos.x--
    clouds.pos.y -= 0.5

    // si le point-centre de l'image dépasse l'origine du canevas, on la replace en coin
    if (clouds.pos.x < -800) clouds.pos.x = 0
    if (clouds.pos.y < -800) clouds.pos.y = 0
  },
}

// on charge l'image des nuages
clouds.img.src = '../assets/backgrounds/clouds.png'

export { clouds }
