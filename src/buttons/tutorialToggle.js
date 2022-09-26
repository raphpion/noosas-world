import { playSound } from '../audio.js';
import { ctx, GAME_WIDTH } from '../screen.js';
import { sprites, sfx } from '../assets.js';

// bouton 'toggle' d'affichage du tutoriel
const btn_tutorialToggle = {
  hover: false,
  pos: {
    x: 0,
    y: 0,
  },
  width: 30,
  height: 30,
  sourceX: 0,
  sourceY: 0,
  draw: () => {
    // fonction d'affichage du bouton 'toggle' à l'écran
    let value = localStorage.getItem('showTutorial');

    // si l'option est activée, le bouton est vert. sinon, on change sa source en Y pour le mettre rouge
    if (value == 'true') btn_tutorialToggle.sourceY = 0;
    else btn_tutorialToggle.sourceY = 30;

    // si le bouton est hover, on change sa source en X
    if (btn_tutorialToggle.hover) btn_tutorialToggle.sourceX = 30;
    else btn_tutorialToggle.sourceX = 0;

    // affichage du bouton et du texte qui l'accompagne à l'écran
    ctx.drawImage(
      sprites.button_tutorial,
      btn_tutorialToggle.sourceX,
      btn_tutorialToggle.sourceY,
      btn_tutorialToggle.width,
      btn_tutorialToggle.height,
      btn_tutorialToggle.pos.x,
      btn_tutorialToggle.pos.y,
      btn_tutorialToggle.width,
      btn_tutorialToggle.height
    );
    ctx.font = '20pt VT323';
    ctx.textAlign = 'center';
    ctx.fillText('Afficher le tutoriel', GAME_WIDTH / 2 + 23, btn_tutorialToggle.pos.y + 27);
  },
  click: () => {
    // lorsque le joueur clique sur le bouton
    playSound(sfx.button);
    let value = localStorage.getItem('showTutorial');

    // si l'option d'affichage était désactivée, on l'active, et vice-versa
    if (value == 'true') localStorage.setItem('showTutorial', false);
    else localStorage.setItem('showTutorial', true);
  },
};

export { btn_tutorialToggle };
