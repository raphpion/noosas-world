import { appendAudioSettings } from './audio.js';
import { isLocalItemValid } from './methods.js';

function initialSettings() {
  // Si la clé 'dejaVu' n'existe pas, on applique les paramètres par défaut
  if (localStorage.getItem('dejaVu') === null) {
    console.log('Applying default settings...');
    localStorage.setItem('dejaVu', undefined);
    localStorage.setItem('musicVolume', 0.6);
    localStorage.setItem('soundVolume', 1);
    localStorage.setItem('showTutorial', true);
    localStorage.setItem('debugMode', false);
  }

  // Si l'objet local n'est pas valide, on lui remet la valeur par défaut
  if (!isLocalItemValid('musicVolume')) localStorage.setItem('musicVolume', 0.6);
  if (!isLocalItemValid('soundVolume')) localStorage.setItem('soundVolume', 1);
  if (!isLocalItemValid('showTutorial')) localStorage.setItem('showTutorial', true);
  if (!isLocalItemValid('debugMode')) localStorage.setItem('debugMode', false);

  // On applique les options audio du Local Storage aux variables du jeu
  appendAudioSettings();
}

export { initialSettings };
