import { gameOverScreen } from './menus/gameOverScreen.js'

function getMousePos(e) {
  // Fonction qui renvoie un objet comprenant la position x et y de la souris par-rapport au coin supérieur gauche de l'écran de jeu
  let rect = gameScreen.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

function areObjectsColliding(obj1, obj2) {
  // Fonction qui vérifie chaque hitbox de deux objets et qui renvoie true si il y a collision

  // Si un des deux array de hitbox est vide, renvoie false
  if (obj1.hitbox.length == 0 || obj2.hitbox.length == 0) return false

  // Pour chaque élément du hitbox de l'objet 1...
  for (const hitbox1 of obj1.hitbox) {
    // Pour chaque élément du hitbox de l'objet 2...
    for (const hitbox2 of obj2.hitbox) {
      // s'il n'y a pas d'espace vide entre les côtés des rectangles, il y a collision
      if (
        obj1.pos.x + hitbox1.pos.x < obj2.pos.x + hitbox2.pos.x + hitbox2.width &&
        obj1.pos.x + hitbox1.pos.x + hitbox1.width > obj2.pos.x + hitbox2.pos.x &&
        obj1.pos.y + hitbox1.pos.y < obj2.pos.y + hitbox2.pos.y + hitbox2.height &&
        obj1.pos.y + hitbox1.pos.y + hitbox1.height > obj2.pos.y + hitbox2.pos.y
      )
        return true
    }
  }
}

function canBeParsed(i) {
  // Fonction qui vérifie et qui retourne si une valeur peut être parse ou non
  // Source: https://github.com/douglascrockford/JSON-js/blob/master/json2.js
  if (
    /^[\],:{}\s]*$/.test(
      i
        .replace(/\\["\\\/bfnrtu]/g, '@')
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    )
  )
    return true
  else return false
}

function isLocalItemValid(i) {
  // Fonction de validation de paramètre local
  let value = localStorage.getItem(i)

  if (value == null || value == undefined || value == '') return false

  // Si le paramètre correspond au volume de la musique ou du son, on vérifie et retourne sa validité
  if (i == 'musicVolume' || i == 'soundVolume') {
    if (value == 0 || value == 0.2 || value == 0.4 || value == 0.6 || value == 0.8 || value == 1) return true
    else {
      //! Message d'avertissement à la console
      console.log(`Warning: Unexpected Local Storage Key Value for Key ${i}.`)

      return false
    }
  }

  // Si le paramètre correspond à l'affichage du tutoriel, on vérifie et retourne sa validité
  if (i == 'showTutorial') {
    if (value == 'true' || value == 'false') return true
    else {
      //! Message d'avertissement à la console
      console.log(`Warning: Unexpected Local Storage Key Value for Key ${i}.`)

      return false
    }
  }

  // Si le paramètre correspond au debug mode, on vérifie et retourne sa validité
  if (i == 'debugMode') {
    if (value == 'true' || value == 'false') return true
    else {
      //! Message d'avertissement à la console
      console.log(`Warning: Unexpected Local Storage Key Value for Key ${i}.`)

      return false
    }
  }

  // Si le paramètre correspond au tableau des records, on vérifie et retourne sa vailidité
  if (i == 'hiscores') {
    // On vérifie si la clé contient un string JSON valide, sinon elle est invalide
    if (canBeParsed(value)) {
      // On parse la valeur de la clé et on vérifie si c'est un Array
      value = JSON.parse(value)
      if (Array.isArray(value)) return true
      else {
        //! Message d'avertissement à la console
        console.log(`Warning: Unexpected Local Storage Key Value for Key ${i}.`)

        return false
      }
    } else {
      //! Message d'avertissement à la console
      console.log(`Warning: Unexpected Local Storage Key Value for Key ${i}.`)

      return false
    }
  }
}

function isMouseOverButton(btn, e) {
  // Fonction qui renvoie si la souris est par-dessus un bouton
  let pos = getMousePos(e)

  // Si la souris a une coordonnée qui correspond à l'intérieur du bouton, retourner true, sinon retourner false
  if (pos.x >= btn.pos.x && pos.x <= btn.pos.x + btn.width && pos.y >= btn.pos.y && pos.y <= btn.pos.y + btn.height)
    return true
  else return false
}

function pushHiscore(score) {
  // Fonction d'enregistrement de score
  // On affecte le tableau des records du local storage dans la variable hiscore et si la donnée n'existe pas, on transforme la variable en array
  let hiscores
  if (localStorage.getItem('hiscores') != null) hiscores = JSON.parse(localStorage.getItem('hiscores'))
  else hiscores = []
  // on vérifie si le record n'est pas déjà présent et on store la réponse dans une variable
  let doubloon = false
  for (const hiscore of hiscores) {
    if (score == hiscore) doubloon = true
  }

  // Si le record n'est pas un doublon et est meilleur que le cinquième meilleur score c'est un nouveau record
  if (!doubloon && (score > hiscores[4] || hiscores.length < 5)) {
    gameOverScreen.newRecord = true
    // Si le tableau est vide ou que le score est meilleur que le premier record, on assigne la médaille d'or
    if (hiscores.length == 0 || score > hiscores[0]) gameOverScreen.medal.type = 'gold'
    // Sinon, si le tableau a une seule entrée ou que le score est meilleur que le deuxième record, on assigne la médaille d'argent
    else if (hiscores.length == 1 || score > hiscores[1]) gameOverScreen.medal.type = 'silver'
    // Sinon, si le tableau a deux entrées ou que le score est meilleur que le troisième record, on assigne la médaille de bronze
    else if (hiscores.length == 2 || score > hiscores[2]) gameOverScreen.medal.type = 'bronze'
    // Sinon, on n'affiche pas de médaille dans l'écran Game Over
    else gameOverScreen.medal.type = null
  } else gameOverScreen.newRecord = false

  // Si le record n'est pas un doublon, on l'ajoute au tableau et on le trie par ordre décroissant
  if (!doubloon) {
    hiscores.push(score)
    sortArray(hiscores)
  }

  // si le tableau contient plus de 5 records, on le réduit à 5 éléments
  if (hiscores.length > 5) hiscores.splice(5, hiscores.length - 4)

  localStorage.setItem('hiscores', JSON.stringify(hiscores))
}

function sortArray(arr, desc = true) {
  arr.sort(function (a, b) {
    if (desc) return b - a
    else return a - b
  })
}

export { getMousePos, areObjectsColliding, isLocalItemValid, isMouseOverButton, pushHiscore }
