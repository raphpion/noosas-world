// NOOSA'S WORLD
/*
  Noosa s'est échappée de la maison et part à l'aventure! Elle doit ramasser le plus
  de croquettes en évitant les bourdons.
*/
// Volet 1 - 16 novembre 2020
// Code, images et musique par Raphaël Pion

import { initialSettings } from './settings.js'
import { getScene } from './gameScreen.js'
import { splashScreen } from './menus/splashScreen.js'

// Vérification de l'intégrité des options utilisateurs puis appel du Splash Screen
initialSettings()
getScene(splashScreen)
