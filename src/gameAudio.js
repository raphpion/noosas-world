let currentSong
let gameMusic = new Audio()
let sfx = new Audio()

function appendAudioSettings() {
  gameMusic.volume = Number(localStorage.getItem('musicVolume'))
  sfx.volume = Number(localStorage.getItem('soundVolume'))
}

function playMusic(song, loop = true) {
  if (currentSong != song) {
    gameMusic.src = `../assets/music/${song}.mp3`
    if (loop) gameMusic.loop = true
    else gameMusic.loop = false
    gameMusic.play()
    currentSong = song
  }
}

function playSound(sound) {
  sfx.src = `../assets/sfx/${sound}.wav`
  sfx.play()
}

function stopMusic() {
  gameMusic.src = ''
  currentSong = null
}

export { appendAudioSettings, playMusic, playSound, stopMusic }
