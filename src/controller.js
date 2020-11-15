const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false,
  clear: () => {
    keys.w = false
    keys.a = false
    keys.s = false
    keys.d = false
    keys.space = false
  },
}

export { keys }
