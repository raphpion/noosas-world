import { music, sfx } from './assets.js'

let currentSong // Musique en cours de lecture (s'il y a lieu)

function appendAudioSettings() {
  // Application des options utilisateurs audio aux variables de musique et de son
  for (let song in music) music[song].volume = Number(localStorage.getItem('musicVolume'))
  for (let sound in sfx) sfx[sound].volume = Number(localStorage.getItem('soundVolume'))
}

function playMusic(song, loop = true) {
  // Si la musique demandée ne joue pas déjà, on assigne le bon fichier audio
  if (currentSong != song) {
    // Si le paramètre loop est à true, on demande à ce que la musique joue en continu
    if (loop) song.loop = true
    else song.loop = false

    stopMusic()

    // On démarre la musique et on assigne son titre à currentSong
    song.play()
    currentSong = song
  }
}

function menu_pauseMusic() {
  // Réduction du volume de la musique lorsque le jeu est en pause
  for (let song in music) music[song].volume = Number(localStorage.getItem('musicVolume')) * 0.3
}

function playSound(sound) {
  // On fait jouer le son en s'assurant de ne pas le loop
  for (let sound in sfx) {
    if (!sfx[sound].paused && !sfx[sound].ended) {
      sfx[sound].pause
      sfx[sound].currentTime = 0
    }
  }
  sound.loop = false
  sound.play()
}

function stopMusic() {
  // On arrête la musique
  for (let song in music) {
    if (!music[song].paused && !music[song].ended) {
      music[song].pause()
      music[song].currentTime = 0
    }
  }
  currentSong = null
}

export { appendAudioSettings, playMusic, menu_pauseMusic, playSound, stopMusic }
