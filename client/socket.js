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

//listen for turns
export function turnListener(callback) {
  socket.on('done', callback)
  socket.on('finished', finishedCorpse)
}

//finish drawing function
export function doneDrawing(num, room) {
  socket.emit('doneDrawing', num, room)
}

function finishedCorpse() {
  console.log('DONE DRAWING!!! WOOO A MONSTER')
}

export default socket
