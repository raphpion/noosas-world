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

export { getMousePos, isMouseOverButton }
