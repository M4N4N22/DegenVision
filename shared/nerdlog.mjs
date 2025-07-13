let nerdListeners = []
let nerdBuffer = []

export function trackNerdLog(log) {
  nerdBuffer.push(log)
  if (nerdBuffer.length > 100) nerdBuffer.shift()
  nerdListeners.forEach((fn) => fn(log))
}

// Optional: expose for test/dev/debug
export function getNerdBuffer() {
  return nerdBuffer
}

export function registerNerdListener(fn) {
  nerdListeners.push(fn)
  return () => {
    nerdListeners = nerdListeners.filter((f) => f !== fn)
  }
}
