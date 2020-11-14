function getMousePos(e) {
  let rect = gameScreen.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

function isLocalItemValid(i) {
  let value = localStorage.getItem(i)
  if (i == 'musicVolume' || i == 'soundVolume') {
    if (value == 0 || value == 0.2 || value == 0.4 || value == 0.6 || value == 0.8 || value == 1) return true
    else return false
  }
  if (i == 'showTutorial') {
    if (value == 'true' || value == 'false') return true
    else return false
  }
}

function isMouseOverButton(btn, e) {
  let pos = getMousePos(e)
  if (pos.x >= btn.pos.x && pos.x <= btn.pos.x + btn.width && pos.y >= btn.pos.y && pos.y <= btn.pos.y + btn.height)
    return true
  else return false
}

function isMouseOverBar(bar, i, e) {
  let pos = getMousePos(e)
  if (pos.x >= bar[5].x + i * 25 && pos.x <= bar[5].x + i * 41 && pos.y >= bar[5].y && pos.y <= bar[5].y + 52)
    return true
  else return false
}

export { getMousePos, isLocalItemValid, isMouseOverButton, isMouseOverBar }
