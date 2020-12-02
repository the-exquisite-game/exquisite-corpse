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

//broadcast all lines
export function broadcastLines(callback) {
  socket.on('linesToState', callback)
}

//finish drawing function
export function doneDrawing(num, callback) {
  socket.emit('doneDrawing', num)

  socket.on('done', callback)

  socket.on('finished', finishedCorpse)
}

function finishedCorpse() {
  console.log('DONE DRAWING!!! WOOO A MONSTER')
}

export default socket
