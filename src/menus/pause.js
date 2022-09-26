import { game } from '../game.js';
import { ctx, GAME_WIDTH, GAME_HEIGHT } from '../screen.js';
import { btn_resume } from '../buttons/resume.js';
import { btn_quit } from '../buttons/quit.js';
import { isMouseOverButton } from '../methods.js';
import { menu_warningPrompt } from './warningPrompt.js';
import { sprites } from '../assets.js';

// Écran de pause
const menu_pause = {
  title: {
    pos: {
      x: GAME_WIDTH / 2 - 162,
      y: 63,
    },
  },
  clear: () => {
    // Fonction d'arrêt, on enlève les listeners de clavier et souris
    document.removeEventListener('keydown', menu_pause.keyDown);
    document.removeEventListener('click', menu_pause.mouseClick);
    document.removeEventListener('mousemove', menu_pause.mouseMove);

    // Si on n'est pas en train d'afficher un warning prompt, on enlève le mode pause
    if (!menu_warningPrompt.visible) game.pause();
  },
  draw: () => {
    // Fonction d'affichage du menu de pause et de ses composantes dans l'écran de jeu
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.drawImage(sprites.pause, menu_pause.title.pos.x, menu_pause.title.pos.y);
    btn_quit.draw();
    btn_resume.draw();
  },
  init: () => {
    // Fonction d'initialisation du menu de pause

    // boutons
    btn_resume.pos.x = (GAME_WIDTH - btn_resume.width) / 2;
    btn_resume.pos.y = 280;
    btn_quit.pos.x = (GAME_WIDTH - btn_quit.width) / 2;
    btn_quit.pos.y = 380;

    // event listeners
    document.addEventListener('keydown', menu_pause.keyDown);
    document.addEventListener('click', menu_pause.mouseClick);
    document.addEventListener('mousemove', menu_pause.mouseMove);
  },
  keyDown: e => {
    // Si le joueur appuie sur échap, on arrête l'écran pause
    if (e.keyCode == 27) menu_pause.clear();
  },
  mouseClick: e => {
    // Si le joueur clique sur un des boutons, on appelle l'action du bouton
    if (isMouseOverButton(btn_resume, e)) btn_resume.click();
    if (isMouseOverButton(btn_quit, e)) btn_quit.click();
  },
  mouseMove: e => {
    // Fonction de détection de mouvement de souris

    // On met la propriété 'hover' des boutons à false et on met le curseur à 'default'
    btn_resume.hover = false;
    btn_quit.hover = false;
    document.body.style.cursor = 'default';

    // Si la souris est par-dessus un bouton, on met sa propriété 'hover' à true et on change le curseur
    if (isMouseOverButton(btn_resume, e)) {
      btn_resume.hover = true;
      document.body.style.cursor = 'pointer';
    }
    if (isMouseOverButton(btn_quit, e)) {
      btn_quit.hover = true;
      document.body.style.cursor = 'pointer';
    }
  },
};

export { menu_pause };
