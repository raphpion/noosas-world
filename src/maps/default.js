import { game } from '../game.js'
import { ctx } from '../gameScreen.js'
import { player } from '../player.js'
import { bg_pixelClouds } from '../backgrounds/pixelClouds.js'
import { bg_hills } from '../backgrounds/hills.js'

// Map du mode de jeu normal
const map_default = {
  width: 2048,
  height: 640,
  offset: {
    x: 0,
    y: 0,
  },
  background: [],
  layer1: new Image(),
  layer2: new Image(),
  platforms: [],
  draw: () => {
    // fonction d'affichage de la map à l'écran
    // affichage de l'arrière plan
    for (let bg of map_default.background) bg.draw()

    // affichage du layer 1
    ctx.drawImage(map_default.layer1, -map_default.offset.x, -map_default.offset.y)
    // affichage du joueur et des éléments
    player.draw()
    // affichage du layer 2
    ctx.drawImage(map_default.layer2, -map_default.offset.x, -map_default.offset.y)
    // si le joueur tombe en bas, la partie est terminée
    if (player.pos.y > map_default.height) game.over()
  },
  init: () => {
    // fonction d'initialisation de la map
    game.map = map_default

    map_default.layer1.src = '../assets/maps/default_layer1.png'
    map_default.layer2.src = '../assets/maps/default_layer2.png'

    // initialisation de l'arrière-plan
    map_default.background = []
    map_default.background.push(bg_pixelClouds, bg_hills)

    // réinitialisation des plateformes
    map_default.platforms = []
    map_default.platforms.push(
      { pos: { x: 192, y: 576 }, width: 1664 },
      { pos: { x: 960, y: 480 }, width: 512 },
      { pos: { x: 1216, y: 384 }, width: 512 }
    )

    // position du joueur et offset de la caméra
    map_default.offset.x = 512
    map_default.offset.y = 0
    player.pos.x = 978
    player.pos.y = 492
  },
}

export { map_default }
