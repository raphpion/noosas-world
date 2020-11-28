import { ctx } from '../screen.js'
import { game } from '../game.js'

// Classe d'objet d'un bourdon
class Bumblebee {
  constructor(x = 0, y = 0, direction = 'right') {
    this.sprite = {
      img: new Image(),
      direction,
      index: 0,
      sourceX: 0,
    }
    this.speed = Math.ceil(Math.random() * (10 - 5) + 5)
    this.sprite.img.src = '../../assets/sprites/bumblebee.png'
    this.animation = null // pour stocker l'intervalle d'animation du bourdon
    this.pos = { x, y }
    this.hitbox = []
    // si le bourdon va vers la gauche on change sa sourceX
    if (this.sprite.direction == 'left') this.sourceX = 92
  }
  animate() {
    // fonction d'animation du bourdon
    this.sprite.index++

    // si l'index dépasse 1, on le ramène à 0
    if (this.sprite.index > 1) this.sprite.index = 0

    // selon la direction du bourdon, on change la source en X
    if (this.sprite.direction == 'right') this.sprite.sourceX = this.sprite.index * 46
    if (this.sprite.direction == 'left') this.sprite.sourceX = this.sprite.index * 46 + 92

    // mise à jour des hitbox
    this.updateHitbox()
  }
  collide() {
    // fonction qui s'exécute lorsque le joueur entre en collision avec le bourdon
    game.over()
  }
  draw() {
    // fonction pour dessiner le bourdon à l'écran
    // on affiche le bourdon à sa position relative à la map
    ctx.drawImage(
      this.sprite.img,
      this.sprite.sourceX,
      0,
      46,
      60,
      this.pos.x - game.map.offset.x,
      this.pos.y - game.map.offset.y,
      46,
      60
    )

    //* DEBUG: AFFICHAGE DE LA HITBOX
    if (localStorage.getItem('debugMode') == 'true') {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
      for (let i = 0; i < this.hitbox.length; i++) {
        // on affiche les hitbox avec la position relative à la map
        ctx.fillRect(
          this.hitbox[i].pos.x + this.pos.x - game.map.offset.x,
          this.hitbox[i].pos.y + this.pos.y - game.map.offset.y,
          this.hitbox[i].width,
          this.hitbox[i].height
        )
      }
    }
  }
  updateHitbox() {
    // fonction pour mettre à jour la hitbox du bourdon selon sa direction

    // vider le tableau des hitbox
    this.hitbox = []

    // droite
    if (this.sprite.direction == 'right') {
      this.hitbox.push(
        { pos: { x: 0, y: 26 }, width: 38, height: 16 }, // haut du corps
        { pos: { x: 0, y: 42 }, width: 26, height: 18 } // bas du corps
      )
    }

    // gauche
    if (this.sprite.direction == 'left') {
      this.hitbox.push(
        { pos: { x: 8, y: 26 }, width: 38, height: 16 }, // haut du corps
        { pos: { x: 20, y: 42 }, width: 26, height: 18 } // bas du corps
      )
    }
  }
}

export { Bumblebee }
