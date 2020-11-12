// TODO: Contrôle de la musique
// Lorsqu'on affiche une nouvelle scène, on appelle la fonction playMusic()
// Cette fonction vérifie que la chanson demandée ne soit pas déjà en train de jouer
// Si elle ne l'est pas, on la fait jouer

// La fonction stopMusic() permet d'arrêter la musique

let currentSong
let gameMusic = new Audio()
let sfx = new Audio()

function playMusic(song, loop = true) {
  if (currentSong != song) {
    gameMusic.src = `../assets/music/${song}.mp3`
    if (loop) gameMusic.loop = true
    else gameMusic.loop = false
    gameMusic.play()
    currentSong = song
  }
}

function stopMusic() {
  gameMusic.src = ''
  currentSong = null
}

function playSound(sound) {
  sfx.src = `../assets/sfx/${sound}.wav`
  sfx.play()
}

export { playMusic, stopMusic, playSound }
