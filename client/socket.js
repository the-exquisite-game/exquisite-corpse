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

export function joinRoom(room) {
  socket.emit('joinedRoom', room)
}
export function newLine(arr, room) {
  socket.emit('newLines', arr, room)
}

export function broadcastLines(callback) {
  socket.on('linesToState', callback)
}
export default socket
