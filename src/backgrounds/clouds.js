import { ctx, GAME_WIDTH, GAME_HEIGHT } from '../screen.js'

// arrière-plan de nuages du menu principal
const bg_clouds = {
  img: new Image(),
  pos: {
    x: 0,
    y: 0,
  },
  draw: () => {
    // fonction d'affichage et de déplacement des nuages
    ctx.drawImage(bg_clouds.img, bg_clouds.pos.x, bg_clouds.pos.y)
    ctx.drawImage(bg_clouds.img, bg_clouds.pos.x + GAME_WIDTH, bg_clouds.pos.y)
    ctx.drawImage(bg_clouds.img, bg_clouds.pos.x, bg_clouds.pos.y + GAME_HEIGHT)
    ctx.drawImage(bg_clouds.img, bg_clouds.pos.x + GAME_WIDTH, bg_clouds.pos.y + GAME_HEIGHT)
    bg_clouds.pos.x--
    bg_clouds.pos.y -= 0.5

    // si le point-centre de l'image dépasse l'origine du canevas, on la replace en coin
    if (bg_clouds.pos.x < -GAME_WIDTH) bg_clouds.pos.x = 0
    if (bg_clouds.pos.y < -GAME_HEIGHT) bg_clouds.pos.y = 0
  },
}

// on charge l'image des nuages
bg_clouds.img.src = '../assets/backgrounds/clouds.png'

export { bg_clouds }
