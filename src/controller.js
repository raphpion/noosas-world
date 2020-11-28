// Objet qui contient un booléen par touche de clavier
const keys = {
  w: false, // touche w
  a: false, // touche a
  s: false, // touche s
  d: false, // touche d
  space: false, // touche espace
  shift: false, // touche shift
  clear: () => {
    // Fonction pour mettre à false toutes les touches du clavier
    keys.w = false
    keys.a = false
    keys.s = false
    keys.d = false
    keys.space = false
  },
}

export { keys }
