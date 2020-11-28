let currentSong // Musique en cours de lecture (s'il y a lieu)
let gameMusic = new Audio() // Musique du jeu

function appendAudioSettings() {
  // Application des options utilisateurs audio aux variables de musique et de son
  gameMusic.volume = Number(localStorage.getItem('musicVolume'))
}

function playMusic(song, loop = true) {
  // Si la musique demandée ne joue pas déjà, on assigne le bon fichier audio
  if (currentSong != song) {
    gameMusic.src = `../assets/music/${song}.mp3`

    // Si le paramètre loop est à true, on demande à ce que la musique joue en continu
    if (loop) gameMusic.loop = true
    else gameMusic.loop = false

    // On démarre la musique et on assigne son titre à currentSong
    gameMusic.play()
    currentSong = song
  }
}

function menu_pauseMusic() {
  // Réduction du volume de la musique lorsque le jeu est en pause
  gameMusic.volume = Number(localStorage.getItem('musicVolume')) * 0.3
}

function playSound(sound) {
  // On assigne le bon fichier audio et on le fait jouer
  let sfx = new Audio()
  sfx.volume = Number(localStorage.getItem('soundVolume'))
  sfx.src = `../assets/sfx/${sound}.wav`
  sfx.play()
}

function stopMusic() {
  // On arrête la musique en ne lui assignant plus de fichier
  gameMusic.src = ''
  currentSong = null
}

export { appendAudioSettings, playMusic, menu_pauseMusic, playSound, stopMusic }
