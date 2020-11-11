function getMousePos(e) {
  let rect = gameScreen.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

function isMouseOverButton(btn, e) {
  let pos = getMousePos(e)
  if (
    pos.x >= btn.pos.x &&
    pos.x <= btn.pos.x + btn.img.width &&
    pos.y >= btn.pos.y &&
    pos.y <= btn.pos.y + btn.img.height
  )
    return true
  else return false
}

function isMouseOverBar(bar, i, e) {
  let pos = getMousePos(e)
  if (pos.x >= bar[5].x + i * 25 && pos.x <= bar[5].x + i * 41 && pos.y >= bar[5].y && pos.y <= bar[5].y + 52)
    return true
  else return false
}

export { getMousePos, isMouseOverButton, isMouseOverBar }
