import { playSound } from '../audio.js';
import { ctx } from '../screen.js';
import { menu_warningPrompt } from '../menus/warningPrompt.js';
import { sprites, sfx } from '../assets.js';

// bouton 'quitter' dans l'écran de pause
const btn_quit = {
  content: 'Quitter',
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    // selon si le bouton est 'hover' ou non, on change la source en X
    if (btn_quit.hover) btn_quit.sourceX = 400;
    else btn_quit.sourceX = 0;

    // affichage du bouton et de son texte
    ctx.drawImage(
      sprites.button_red,
      btn_quit.sourceX,
      0,
      btn_quit.width,
      btn_quit.height,
      btn_quit.pos.x,
      btn_quit.pos.y,
      btn_quit.width,
      btn_quit.height
    );
    ctx.font = '40pt VT323';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(btn_quit.content, btn_quit.pos.x + 200, btn_quit.pos.y);
  },
  click: () => {
    // si le joueur clique sur le bouton, on affiche un avertissement
    playSound(sfx.button);
    btn_quit.hover = false;
    document.body.style.cursor = 'default';
    menu_warningPrompt.init('quitGame');
  },
};

export { btn_quit };
