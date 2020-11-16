function getMousePos(e) {
  // Fonction qui renvoie un objet comprenant la position x et y de la souris par-rapport au coin supérieur gauche de l'écran de jeu
  let rect = gameScreen.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

function isLocalItemValid(i) {
  // Fonction de validation de paramètre local
  let value = localStorage.getItem(i)

  // Si le paramètre correspond au volume de la musique ou du son, on vérifie et retourne sa validité
  if (i == 'musicVolume' || i == 'soundVolume') {
    if (value == 0 || value == 0.2 || value == 0.4 || value == 0.6 || value == 0.8 || value == 1) return true
    else return false
  }

  // Si le paramètre correspond à l'affichage du tutoriel, on vérifie et retourne sa validité
  if (i == 'showTutorial') {
    if (value == 'true' || value == 'false') return true
    else return false
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

export { getMousePos, isLocalItemValid, isMouseOverButton }
