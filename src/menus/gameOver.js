import { ctx, GAME_WIDTH, GAME_HEIGHT } from '../screen.js';
import { game } from '../game.js';
import { btn_start } from '../buttons/start.js';
import { btn_hiscores } from '../buttons/hiscores.js';
import { btn_return } from '../buttons/return.js';
import { isMouseOverButton } from '../methods.js';
import { sprites } from '../assets.js';

// Écran de Game Over
const menu_gameOver = {
  title: {
    pos: {
      x: GAME_WIDTH / 2 - 152,
      y: 43,
    },
  },
  medal: {
    type: null,
    pos: {
      x: GAME_WIDTH / 2 + 111,
      y: 285,
    },
  },
  newRecord: false,
  clear: () => {
    document.removeEventListener('click', menu_gameOver.mouseClick);
    document.removeEventListener('mousemove', menu_gameOver.mouseMove);
  },
  draw: () => {
    // Fonction d'affichage du menu gameover et de ses composantes dans l'écran de jeu
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.drawImage(sprites.gameOver, menu_gameOver.title.pos.x, menu_gameOver.title.pos.y);

    ctx.font = '32pt VT323';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`Score : ${game.kibbles}`, GAME_WIDTH / 2, GAME_HEIGHT / 2);

    // Si c'est un nouveau record, on l'affiche en-dessous du score
    if (menu_gameOver.newRecord) {
      ctx.fillStyle = '#7cff5e';
      ctx.fillText('Nouveau record!', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);
    }

    // Si on a un type de médaille à afficher, on le fait
    if (menu_gameOver.medal.type == 'gold') ctx.drawImage(sprites.medal_gold, menu_gameOver.medal.pos.x, menu_gameOver.pos.y);
    if (menu_gameOver.medal.type == 'silver') ctx.drawImage(sprites.medal_silver, menu_gameOver.medal.pos.x, menu_gameOver.pos.y);
    if (menu_gameOver.medal.type == 'bronze') ctx.drawImage(sprites.medal_bronze, menu_gameOver.medal.pos.x, menu_gameOver.pos.y);

    // Affichage des boutons
    btn_start.draw();
    btn_hiscores.draw();
    btn_return.draw();
  },
  init: () => {
    // Fonction d'initialisation de l'écran Game Over
    document.addEventListener('click', menu_gameOver.mouseClick);
    document.addEventListener('mousemove', menu_gameOver.mouseMove);

    // Placement des éléments
    btn_start.content = 'Rejouer';
    btn_start.pos.x = (GAME_WIDTH - btn_start.width) / 2;
    btn_start.pos.y = 393;
    btn_hiscores.pos.x = (GAME_WIDTH - btn_hiscores.width) / 2;
    btn_hiscores.pos.y = 473;
    btn_return.pos.x = (GAME_WIDTH - btn_return.width) / 2;
    btn_return.pos.y = 553;
  },
  mouseClick: e => {
    // gestion des clics de la souris, si le joueur clique sur un bouton, on appelle sa fonction de click
    if (isMouseOverButton(btn_start, e)) {
      menu_gameOver.clear();
      btn_start.click();
    }
    if (isMouseOverButton(btn_hiscores, e)) {
      menu_gameOver.clear();
      btn_hiscores.click();
    }
    if (isMouseOverButton(btn_return, e)) {
      menu_gameOver.clear();
      btn_return.click();
    }
  },
  mouseMove: e => {
    // Fonction de gestion des déplacements de la souris
    // Les boutons ne sont pas 'hover' par défaut et le curseur est celui par défaut
    btn_start.hover = false;
    btn_hiscores.hover = false;
    btn_return.hover = false;
    document.body.style.cursor = 'default';

    // si la souris est par-dessus un bouton, on le met 'hover' et on change le curseur
    if (isMouseOverButton(btn_start, e)) {
      btn_start.hover = true;
      document.body.style.cursor = 'pointer';
    }
    if (isMouseOverButton(btn_hiscores, e)) {
      btn_hiscores.hover = true;
      document.body.style.cursor = 'pointer';
    }
    if (isMouseOverButton(btn_return, e)) {
      btn_return.hover = true;
      document.body.style.cursor = 'pointer';
    }
  },
};

export { menu_gameOver };
