import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export function createRoom(callback) {
  socket.emit('roomCreate')
  socket.on('roomCreated', callback)
}

export function leaveRoom(callback) {
  socket.off('roomCreated', callback)
}

export function newLine(arr) {
  socket.emit('newLines', arr)
}

export function broadcastLines(callback) {
  socket.on('linesToState', callback)
}
export default socket
