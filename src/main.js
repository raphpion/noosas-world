//* NOOSA'S WORLD
/*
  Noosa s'est échappée de la maison et part à l'aventure! Elle doit ramasser le plus
  de croquettes tout en évitant les bourdons.
*/
// Volet 2 - 16 novembre 2020
// © Copyright Raphaël Pion 2020

import { initialSettings } from './settings.js'
import { getScene } from './gameScreen.js'
import { splashScreen } from './menus/splashScreen.js'

// Vérification de l'intégrité des options utilisateurs
initialSettings()

// Appel de l'écran titre
getScene(splashScreen)
