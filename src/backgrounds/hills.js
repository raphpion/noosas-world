import { ctx, GAME_WIDTH, GAME_HEIGHT } from '../screen.js'
import { game } from '../game.js'
import { backgrounds } from '../assets.js'

// arrière-plan de collines en jeu
const bg_hills = {
  pos: {
    x: 0,
    y: 0,
  },
  draw: () => {
    // fonction d'affichage de l'arrière-plan de collines
    // on détermine combien de fois on doit afficher l'image horizontalement et verticalement
    let repeatX = Math.ceil(game.map.width / GAME_WIDTH)
    let repeatY = Math.ceil(game.map.height / GAME_HEIGHT)

    // on affiche à répétition l'image horizontalement avec la position relative à la map
    // pour créer l'effet que les collines sont plus loin, on soustrait le quart de l'offset de la map à la position
    for (let i = 0; i < repeatX; i++)
      ctx.drawImage(
        backgrounds.hills,
        bg_hills.pos.x + i * GAME_WIDTH - Math.floor(game.map.offset.x / 4),
        bg_hills.pos.y - Math.floor(game.map.offset.y / 4)
      )
    // on affiche à répétition l'image verticalement avec la position relative à la map
    // pour créer l'effet que les collines sont plus loin, on soustrait le quart de l'offset de la map à la position
    for (let i = 0; i < repeatY; i++)
      ctx.drawImage(
        backgrounds.hills,
        bg_hills.pos.x - Math.floor(game.map.offset.x / 4),
        bg_hills.pos.y + i * GAME_HEIGHT - Math.floor(game.map.offset.y / 4)
      )
  },
}

export { bg_hills }
