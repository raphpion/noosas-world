import { appendAudioSettings } from './gameAudio.js'
import { isLocalItemValid } from './methods.js'

function initialSettings() {
  // Fonction d'affectation des options du Local Storage vers les variables de jeu

  // Si l'objet local n'est pas valide, on lui remet la valeur par défaut
  if (!isLocalItemValid('musicVolume')) localStorage.setItem('musicVolume', 0.6)
  if (!isLocalItemValid('soundVolume')) localStorage.setItem('soundVolume', 1)
  if (!isLocalItemValid('showTutorial')) localStorage.setItem('showTutorial', true)

  // On applique les options audio du Local Storage aux variables du jeu
  appendAudioSettings()
}

export { initialSettings }
