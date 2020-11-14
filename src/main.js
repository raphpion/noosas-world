import { initialSettings } from './settings.js'
import { getScene } from './gameScreen.js'
import { splashScreen } from './menus/splashScreen.js'
import { game } from './game.js'

initialSettings()
getScene(splashScreen)
