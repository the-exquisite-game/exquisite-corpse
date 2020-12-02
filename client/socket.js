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

//emit a new Line
export function newLine(arr) {
  socket.emit('newLines', arr)
}

//broadcast all lines
export function broadcastLines(callback) {
  socket.on('linesToState', callback)
}

//finish drawing function
export function doneDrawing(callback) {
  socket.emit('doneDrawing')
  socket.on('done', callback)
}

export default socket
