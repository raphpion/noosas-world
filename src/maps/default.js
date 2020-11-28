import { game } from '../game.js'
import { ctx } from '../gameScreen.js'
import { player } from '../player.js'
import { bg_pixelClouds } from '../backgrounds/pixelClouds.js'
import { bg_hills } from '../backgrounds/hills.js'
import { Bumblebee } from '../prefabs/Bumblebee.js'
import { tutorialScreen } from '../menus/tutorialScreen.js'
import { areObjectsColliding } from '../methods.js'
import { Kibble } from '../prefabs/Kibble.js'

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
  enemies: [],
  items: [],
  platforms: [],
  spawnInterval: null, // stocker l'intervalle à laquelle on fait apparaître les bourdons
  draw: () => {
    // fonction d'affichage de la map à l'écran
    // affichage de l'arrière plan
    for (let bg of map_default.background) bg.draw()

    // affichage du layer 1
    ctx.drawImage(map_default.layer1, -map_default.offset.x, -map_default.offset.y)

    // affichage des objets, du joueur et des ennemis
    player.draw()
    map_default.moveEnemies()
    for (let enemy of map_default.enemies) enemy.draw()
    for (let item of map_default.items) item.draw()

    // affichage du layer 2
    ctx.drawImage(map_default.layer2, -map_default.offset.x, -map_default.offset.y)

    // si le joueur tombe en bas, la partie est terminée
    if (player.pos.y > map_default.height) game.over()

    // gestion des collisions
    map_default.handleCollisions()
  },
  handleCollisions: () => {
    // fonction de gestion de collision des éléments de la map avec le joueur
    // si le jeu est en pause ou terminé, on arrête l'exécution
    if (game.paused || game.isOver) return
    for (let enemy of map_default.enemies) {
      // si le joueur entre en collision avec un ennemi, on appelle sa fonction collide
      if (areObjectsColliding(player, enemy)) enemy.collide()
    }
    for (let item of map_default.items) {
      // si le joueur entre en collision avec un objet, on appelle sa fonction collide
      if (areObjectsColliding(player, item)) item.collide()
    }
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

    // réinitialisation des ennemis et des objets
    map_default.enemies = []
    map_default.items = []

    // position du joueur et offset de la caméra
    map_default.offset.x = 512
    map_default.offset.y = 0
    player.pos.x = 978
    player.pos.y = 492

    // initialisation du spawner d'ennemis
    map_default.spawnInterval = setInterval(map_default.spawnEnemies, 2000)

    // initialisation de la croquette
    let k = new Kibble()
    k.pos = map_default.moveKibble()
    k.animation = setInterval(function () {
      k.animate()
    }, 1000 / 8)
    map_default.items.push(k)
  },
  moveEnemies: () => {
    // fonction de gestion du déplacement des ennemis
    // si le jeu est en pause ou que la partie est terminée, on arrête l'exécution
    if (game.paused || game.isOver) return
    for (let i = 0; i < map_default.enemies.length; i++) {
      // si l'ennemi regarde à gauche, on le déplace vers la gauche
      if (map_default.enemies[i].sprite.direction == 'left')
        map_default.enemies[i].pos.x -= map_default.enemies[i].speed

      // si l'ennemi regarde à droite, on le déplace vers la droite
      if (map_default.enemies[i].sprite.direction == 'right')
        map_default.enemies[i].pos.x += map_default.enemies[i].speed

      // si l'ennemi n'est plus sur la map, on le retire du tableau des ennemis
      if (map_default.enemies[i].pos.x < 0 || map_default.enemies[i].pos.x > map_default.width)
        map_default.enemies.splice(i, 1)
    }
  },
  moveKibble: () => {
    // fonction qui retourne une position pour la prochaine croquette à faire apparaître
    // nombre aléatoire pour la coordonnée x
    let pos = { x: 0, y: 0 }
    pos.x = Math.ceil(Math.random() * (1824 - 192) + 192)

    // si x est inférieur à 958, la croquette spawn dans la ZONE 1, où la zone d'apparition verticale est de 416 à 544
    if (pos.x < 958) pos.y = Math.ceil(Math.random() * (544 - 416) + 416)
    // si x est entre 958 et 1152, la croquette spawn dans la ZONE 2, où la zone d'apparition verticale est de 320 à 544
    else if (pos.x >= 958 && pos.x < 1152) pos.y = Math.ceil(Math.random() * (544 - 320) + 320)
    // sinon, x est supérieur à 1152 et la croquette spawn dans la ZONE 3, où la zone d'apparition verticale est de 256 à 544
    else pos.y = Math.ceil(Math.random() * (544 - 256) + 256)

    // on retourne la position
    return pos
  },
  spawnEnemies: () => {
    // fonction qui fait apparaître des bourdons en fonction du score du joueur
    // si le jeu est en pause ou terminé, ou si on affiche le tutoriel, on arrête l'exécution
    if (game.paused || game.isOver || tutorialScreen.show) return
    // s'il y a moins de bourdons que 2 + le score du joueur divisé par 10, on en génère un nouveau et on le fait apparaître
    if (map_default.enemies.length < Math.floor(game.kibbles / 20) + 2) {
      let r = Math.ceil(Math.random() * 2)
      let x, y, d // positions x, y et direction du bourdon à créer

      // Si le nombre aléatoire vaut 1, on spawn le bourdon à gauche de la map et on le fait aller vers la droite
      if (r == 1) {
        x = 0
        d = 'right'
      }

      // Sinon, le nombre aléatoire vaut nécessairement 2, on spawn le bourdon à droite du joueur et on le fait aller vers la gauche
      else {
        x = map_default.width - 46
        d = 'left'
      }

      // On génère aléatoirement une position y pour le bourdon
      y = Math.ceil(Math.random() * (485 - 150) + 150 + map_default.offset.y)

      // On crée le bourdon et on l'ajoute au tableau des ennemis
      let b = new Bumblebee(x, y, d)
      map_default.enemies.push(b)
      b.animation = setInterval(function () {
        b.animate()
      }, 1000 / 8)
    }
  },
}

export { map_default }
