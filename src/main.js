import { initialSettings } from './settings.js'
import { getScene } from './gameScreen.js'
import { splashScreen } from './menus/splashScreen.js'

// Vérification de l'intégrité des options utilisateurs puis appel du Splash Screen
initialSettings()
getScene(splashScreen)
