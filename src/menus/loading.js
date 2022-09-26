import { loadAssets } from '../loader.js';
import { screen, ctx, GAME_WIDTH, GAME_HEIGHT, clearScreen } from '../screen.js';

// Écran de chargement
const menu_loading = {
  background: 'black',
  progress: 0,
  text: '',
  clear: () => {},
  draw: () => {
    // fonction d'affichage de l'écran de chargement à l'écran
    clearScreen();

    // texte
    ctx.font = '20pt VT323';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(menu_loading.text, GAME_WIDTH / 2, GAME_HEIGHT / 2);

    // boîte de chargement
    if (menu_loading.progress > 80) ctx.fillStyle = '#00ff00';
    else if (menu_loading.progress > 60) ctx.fillStyle = '#b3ff00';
    else if (menu_loading.progress > 40) ctx.fillStyle = '#ffff00';
    else if (menu_loading.progress > 20) ctx.fillStyle = '#ffa500';
    else ctx.fillStyle = '#ff0000';
    ctx.fillRect(GAME_WIDTH / 2 - 200, GAME_HEIGHT / 2, Math.floor(menu_loading.progress * 4), 50);

    // contour
    ctx.strokeStyle = 'white';
    ctx.strokeRect(GAME_WIDTH / 2 - 200, GAME_HEIGHT / 2, 400, 50);
  },
  init: () => {
    // fonction d'initialisation de l'écran de chargement
    screen.style.background = menu_loading.background;
    menu_loading.text = 'Chargement en cours...';

    // on démarre le loading
    loadAssets();

    // on retourne l'intervalle d'affichage
    return setInterval(menu_loading.draw(), 1000 / 60);
  },
  incrementProgress: amt => {
    menu_loading.progress += amt;
  },
};

export { menu_loading };
