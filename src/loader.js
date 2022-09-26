import { menu_loading } from './menus/loading.js';
import { backgrounds, maps, music, sfx, sprites } from './assets.js';
import { getScene } from './screen.js';
import { menu_intro } from './menus/intro.js';

async function loadAssets() {
  console.log(`Loading assets`);

  // chargement des assets un par un
  await loadBackgrounds();
  console.log(`Finished loading backgrounds`);

  await loadSprites();
  console.log(`Finished loading sprites`);

  await loadMaps();
  console.log(`Finished loading maps`);

  await loadMusic();
  console.log(`Finished loading music`);

  await loadSFX();
  console.log(`Finished loading SFX`);

  // lorsque terminé, on passe à l'écran intro
  console.log(`All assets loaded succesfully! Entering game...`);
  getScene(menu_intro);
}

async function loadBackgrounds() {
  // on récupère le nombre de backgrounds à charger
  const amt = Object.keys(backgrounds).length;
  let i = 0;

  // on crée une liste de promesses à exécuter pour charger l'image de chaque background
  const promises = Object.keys(backgrounds).map(bg => {
    return new Promise((resolve, reject) => {
      i++;
      console.log(`Loading background ${i} out of ${amt} — ${bg}`);
      backgrounds[bg].src = `../assets/backgrounds/${bg}.png`;
      backgrounds[bg].addEventListener('load', () => {
        menu_loading.incrementProgress(20 / amt);
        resolve();
      });
    });
  });

  return Promise.all(promises);
}

async function loadSprites() {
  // on récupère le nombre de sprites à charger
  const amt = Object.keys(sprites).length;
  let i = 0;

  // on crée une liste de promesses à exécuter pour charger l'image de chaque sprite
  const promises = Object.keys(sprites).map(sprite => {
    return new Promise((resolve, reject) => {
      i++;
      console.log(`Loading sprite ${i} out of ${amt} — ${sprite}`);
      sprites[sprite].src = `../assets/sprites/${sprite}.png`;
      sprites[sprite].addEventListener('load', () => {
        menu_loading.incrementProgress(20 / amt);
        resolve();
      });
    });
  });

  return Promise.all(promises);
}

async function loadMaps() {
  // on récupère le nombre de map layers à charger
  const amt = Object.keys(maps).length;
  let i = 0;

  // on crée une liste de promesses à exécuter pour charger tous les layers
  const promises = Object.keys(maps).map(layer => {
    return new Promise((resolve, reject) => {
      i++;
      console.log(`Loading map layer ${i} out of ${amt} — ${layer}`);
      maps[layer].src = `../assets/maps/${layer}.png`;
      maps[layer].addEventListener('load', () => {
        menu_loading.incrementProgress(20 / amt);
        resolve();
      });
    });
  });

  return Promise.all(promises);
}

async function loadMusic() {
  // on récupère le nombre de musiques à charger
  const amt = Object.keys(music).length;
  let i = 0;

  // on crée une liste de promesses à exécuter pour charger toutes les chansons
  const promises = Object.keys(music).map(song => {
    return new Promise((resolve, reject) => {
      i++;
      console.log(`Loading song ${i} out of ${amt} — ${song}`);
      music[song].src = `../assets/music/${song}.mp3`;
      music[song].addEventListener('canplaythrough', () => {
        menu_loading.incrementProgress(20 / amt);
        resolve();
      });
    });
  });

  return Promise.all(promises);
}

async function loadSFX() {
  // on récupère le nombre d'effets sonores à charger
  const amt = Object.keys(sfx).length;
  let i = 0;

  // on crée une liste de promesses à exécuter pour charger tous les SFX
  const promises = Object.keys(sfx).map(sound => {
    return new Promise((resolve, reject) => {
      i++;
      console.log(`Loading sound ${i} out of ${amt} — ${sound}`);
      sfx[sound].src = `../assets/sfx/${sound}.wav`;
      sfx[sound].addEventListener('canplaythrough', () => {
        menu_loading.incrementProgress(20 / amt);
        resolve();
      });
    });
  });

  return Promise.all(promises);
}

export { loadAssets };
