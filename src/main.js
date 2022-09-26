//* NOOSA'S WORLD
/*
  Noosa s'est échappée de la maison et part à l'aventure! Elle doit ramasser le plus
  de croquettes tout en évitant les bourdons.
*/
// Volet 2 - 16 novembre 2020
// © Copyright Raphaël Pion 2020

import { initialSettings } from './settings.js';
import { getScene } from './screen.js';
import { menu_loading } from './menus/loading.js';

console.log(`Noosa's World running version 1.0`);

// Vérification de l'intégrité des options utilisateurs
initialSettings();

// Chargement des ressources du jeu
getScene(menu_loading);
