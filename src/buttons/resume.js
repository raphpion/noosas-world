import { playSound } from '../audio.js';
import { ctx } from '../screen.js';
import { menu_pause } from '../menus/pause.js';
import { sprites, sfx } from '../assets.js';

// bouton 'Reprendre' dans l'écran de pause
const btn_resume = {
  content: 'Reprendre',
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
    if (btn_resume.hover) btn_resume.sourceX = 400;
    else btn_resume.sourceX = 0;

    // affichage du bouton et de son texte
    ctx.drawImage(
      sprites.button_blue,
      btn_resume.sourceX,
      0,
      btn_resume.width,
      btn_resume.height,
      btn_resume.pos.x,
      btn_resume.pos.y,
      btn_resume.width,
      btn_resume.height
    );
    ctx.font = '40pt VT323';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(btn_resume.content, btn_resume.pos.x + 200, btn_resume.pos.y);
  },
  click: () => {
    // si le joueur clique sur le bouton, on retourne au jeu
    playSound(sfx.button);
    btn_resume.hover = false;
    document.body.style.cursor = 'default';
    menu_pause.clear();
  },
};

export { btn_resume };
