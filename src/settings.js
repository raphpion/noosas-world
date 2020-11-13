import { appendAudioSettings } from './gameAudio.js'
import { isLocalItemValid } from './methods.js'

function initialSettings() {
  if (localStorage.getItem('dejavu') === null) localStorage.setItem('dejavu', true)
  if (!isLocalItemValid('musicVolume')) localStorage.setItem('musicVolume', 1)
  if (!isLocalItemValid('soundVolume')) localStorage.setItem('soundVolume', 1)
  appendAudioSettings()
}

export { initialSettings }
