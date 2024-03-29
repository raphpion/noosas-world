import { ctx } from '../screen.js';
import { sprites } from '../assets.js';

// barre de son du volume de la musique
const musicBar = {
  img: new Image(),
  pos: {
    x: 0,
    y: 0,
  },
  width: 16,
  height: 52,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage de la barre de son
    // pour chaque barre de son, on vérifie si le volume est suffisant pour qu'elle soit verte
    for (let i = 0; i < 5; i++) {
      if (localStorage.getItem('musicVolume') > i * 0.2) musicBar.sourceX = 16;
      else musicBar.sourceX = 0;

      // on affiche la barre à l'écran
      ctx.drawImage(
        sprites.soundbar,
        musicBar.sourceX,
        0,
        musicBar.width,
        musicBar.height,
        musicBar.pos.x + i * 24,
        musicBar.pos.y,
        musicBar.width,
        musicBar.height
      );
    }
  },
};

// barre de son du volume des effets sonores
const soundBar = {
  img: new Image(),
  pos: {
    x: 0,
    y: 0,
  },
  width: 16,
  height: 52,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage de la barre de son à l'écran
    // pour chaque barre de son, on vérifie si le volume est suffisant pour qu'elle soit verte
    for (let i = 0; i < 5; i++) {
      if (localStorage.getItem('soundVolume') > i * 0.2) soundBar.sourceX = 16;
      else soundBar.sourceX = 0;

      // on affiche la barre à l'écran
      ctx.drawImage(
        sprites.soundbar,
        soundBar.sourceX,
        0,
        soundBar.width,
        soundBar.height,
        soundBar.pos.x + i * 24,
        soundBar.pos.y,
        soundBar.width,
        soundBar.height
      );
    }
  },
};

export { musicBar, soundBar };
