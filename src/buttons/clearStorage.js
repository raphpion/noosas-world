import { playSound } from '../audio.js';
import { ctx } from '../screen.js';
import { menu_warningPrompt } from '../menus/warningPrompt.js';
import { sprites, sfx } from '../assets.js';

// bouton 'Réinitialiser' du menu des options
const btn_clearStorage = {
  content: 'Réinitialiser',
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    // fonction d'affichage du bouton 'Réinitialiser'

    // selon si le bouton est 'hover' ou non, on change la source en X
    if (btn_clearStorage.hover) btn_clearStorage.sourceX = 400;
    else btn_clearStorage.sourceX = 0;

    // affichage du bouton et de son texte
    ctx.drawImage(
      sprites.button_red,
      btn_clearStorage.sourceX,
      0,
      btn_clearStorage.width,
      btn_clearStorage.height,
      btn_clearStorage.pos.x,
      btn_clearStorage.pos.y,
      btn_clearStorage.width,
      btn_clearStorage.height
    );
    ctx.font = '40pt VT323';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(btn_clearStorage.content, btn_clearStorage.pos.x + 200, btn_clearStorage.pos.y);
  },
  click: () => {
    // si le joueur clique sur le bouton, on affiche un avertissement
    playSound(sfx.button);
    menu_warningPrompt.init('clearStorage');
  },
};

export { btn_clearStorage };
