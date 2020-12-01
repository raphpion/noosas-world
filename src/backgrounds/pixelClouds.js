import { ctx, GAME_WIDTH, GAME_HEIGHT } from '../screen.js'
import { game } from '../game.js'
import { backgrounds } from '../assets.js'

// arrière-plan de nuages en jeu
const bg_pixelClouds = {
  img: new Image(),
  pos: {
    x: 0,
    y: 0,
  },
  draw: () => {
    // fonction d'affichage de l'arrière-plan de nuages
    // on détermine combien de fois on doit afficher l'image horizontalement et verticalement
    let repeatX = Math.ceil(game.map.width / GAME_WIDTH)
    let repeatY = Math.ceil(game.map.height / GAME_HEIGHT)

    // on affiche à répétition l'image horizontalement avec la position relative à la map
    // pour créer l'effet que les nuages sont plus loin, on soustrait le dixième de l'offset de la map à la position
    for (let i = 0; i < repeatX; i++)
      ctx.drawImage(
        backgrounds.pixel_clouds,
        bg_pixelClouds.pos.x + i * GAME_WIDTH - Math.floor(game.map.offset.x / 10),
        bg_pixelClouds.pos.y - Math.floor(game.map.offset.y / 10)
      )
    // on affiche à répétition l'image verticalement avec la position relative à la map
    // pour créer l'effet que les nuages sont plus loin, on soustrait le dixième de l'offset de la map à la position
    for (let i = 0; i < repeatY; i++)
      ctx.drawImage(
        backgrounds.pixel_clouds,
        bg_pixelClouds.pos.x - Math.floor(game.map.offset.x / 10),
        bg_pixelClouds.pos.y + i * Math.floor(GAME_HEIGHT - game.map.offset.y / 10)
      )
  },
}

export { bg_pixelClouds }
