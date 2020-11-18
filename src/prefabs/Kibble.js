import { ctx } from '../gameScreen.js'

// Classe d'objet d'une croquette
class Kibble {
  constructor(x, y) {
    this.sprite = {
      img: new Image(),
      index: 0,
      sourceX: 0,
    }
    this.sprite.img.src = '../assets/sprites/items.png'
    this.animation = null // pour stocker l'intervalle d'animation de la croquette
    this.pos = { x, y }
    this.hitbox = []
  }
  animate() {
    // fonction d'animation de la croquette
    this.sprite.index++

    // si l'index dépasse la limite, on le remet à zéro
    if (this.sprite.index > 5) this.sprite.index = 0

    this.sprite.sourceX = this.sprite.index * 32

    this.updateHitbox()
  }
  draw() {
    // fonction pour dessiner la croquette à l'écran

    //? L'image ne s'affiche pas
    ctx.drawImage(this.sprite.img, this.sourceX, 0, 32, 32, this.pos.x, this.pos.y, 32, 32)

    //* DEBUG: AFFICHAGE DE LA HITBOX
    for (let i = 0; i < this.hitbox.length; i++) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
      ctx.fillRect(
        this.hitbox[i].pos.x + this.pos.x,
        this.hitbox[i].pos.y + this.pos.y,
        this.hitbox[i].width,
        this.hitbox[i].height
      )
    }
  }
  updateHitbox() {
    // fonction pour mettre à jour la taille et la position de la hitbox de la croquette
    // on vide le array des hitbox
    this.hitbox = []

    // Index 0
    if (this.sprite.index == 0) {
      this.hitbox.push(
        { type: 'rectangle', pos: { x: 8, y: 8 }, width: 16, height: 16 }, // partie centrale
        { type: 'rectangle', pos: { x: 10, y: 0 }, width: 12, height: 32 }, // ligne verticale
        { type: 'rectangle', pos: { x: 0, y: 10 }, width: 32, height: 12 } // ligne horizontale
      )
    }

    // Index 1 & 5
    if (this.sprite.index == 1 || this.sprite.index == 5) {
      this.hitbox.push(
        { type: 'rectangle', pos: { x: 12, y: 0 }, width: 8, height: 32 }, // ligne verticale
        { type: 'rectangle', pos: { x: 6, y: 10 }, width: 20, height: 12 } // ligne horizontale
      )
    }

    // Index 2 & 4
    if (this.sprite.index == 2 || this.sprite.index == 4) {
      this.hitbox.push(
        { type: 'rectangle', pos: { x: 12, y: 0 }, width: 8, height: 32 }, // ligne verticale
        { type: 'rectangle', pos: { x: 8, y: 10 }, width: 16, height: 12 } // ligne horizontale
      )
    }

    // Index 3
    if (this.sprite.index == 3) {
      this.hitbox.push(
        { type: 'rectangle', pos: { x: 14, y: 0 }, width: 4, height: 32 }, // ligne verticale
        { type: 'rectangle', pos: { x: 12, y: 12 }, width: 8, height: 8 } // ligne horizontale
      )
    }
  }
}

export { Kibble }
