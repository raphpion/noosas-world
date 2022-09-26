import { ctx, GAME_WIDTH, GAME_HEIGHT } from '../screen.js';
import { backgrounds } from '../assets.js';

// arrière-plan de nuages du menu principal
const bg_clouds = {
  pos: {
    x: 0,
    y: 0,
  },
  draw: () => {
    // fonction d'affichage et de déplacement des nuages
    ctx.drawImage(backgrounds.clouds, bg_clouds.pos.x, bg_clouds.pos.y);
    ctx.drawImage(backgrounds.clouds, bg_clouds.pos.x + GAME_WIDTH, bg_clouds.pos.y);
    ctx.drawImage(backgrounds.clouds, bg_clouds.pos.x, bg_clouds.pos.y + GAME_HEIGHT);
    ctx.drawImage(backgrounds.clouds, bg_clouds.pos.x + GAME_WIDTH, bg_clouds.pos.y + GAME_HEIGHT);
    bg_clouds.pos.x--;
    bg_clouds.pos.y -= 0.5;

    // si le point-centre de l'image dépasse l'origine du canevas, on la replace en coin
    if (bg_clouds.pos.x < -GAME_WIDTH) bg_clouds.pos.x = 0;
    if (bg_clouds.pos.y < -GAME_HEIGHT) bg_clouds.pos.y = 0;
  },
};

export { bg_clouds };
