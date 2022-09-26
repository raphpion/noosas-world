import { playSound } from '../audio.js';
import { ctx, getScene } from '../screen.js';
import { menu_tutorial } from '../menus/tutorial.js';
import { game } from '../game.js';
import { player } from '../player.js';
import { sprites, sfx } from '../assets.js';

// bouton 'Jouer' de l'écran-titre et 'Rejouer' de l'écran gameOver
const btn_start = {
  content: '',
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 400,
  height: 60,
  sourceX: 0,
  draw: () => {
    // si le bouton est hover, on change sa source en X
    if (btn_start.hover) btn_start.sourceX = 400;
    else btn_start.sourceX = 0;

    // affichage du bouton et du texte qui l'accompagne à l'écran
    ctx.drawImage(
      sprites.button_green,
      btn_start.sourceX,
      0,
      btn_start.width,
      btn_start.height,
      btn_start.pos.x,
      btn_start.pos.y,
      btn_start.width,
      btn_start.height
    );
    ctx.font = '40pt VT323';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(btn_start.content, btn_start.pos.x + 200, btn_start.pos.y);
  },
  click: () => {
    // lorsque le joueur clique sur le bouton
    playSound(sfx.button);
    document.body.style.cursor = 'default';
    btn_start.hover = false;

    // on initialise la position et la direction du joueur
    player.pos.x = 60;
    player.pos.y = 532;
    player.sprite.direction = 'right';

    // si l'option d'affichage du tutoriel est activée, on active l'objet menu_tutorial
    if (localStorage.getItem('showTutorial') == 'true') {
      menu_tutorial.show = true;
      menu_tutorial.init();
    } else menu_tutorial.show = false;

    // début du jeu
    getScene(game);
  },
};

export { btn_start };
