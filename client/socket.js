import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export function createRoom(callback, name) {
  socket.emit('roomCreate')
  setName(name)
  socket.on('roomCreated', callback)
}

export function setName(name) {
  socket.emit('set-nickname', name)
}

export function leaveRoom(callback) {
  socket.off('roomCreated', callback)
}

export function joinRoom(room) {
  socket.emit('joinedRoom', room)
}

export function getUsers(callback, room) {
  socket.on('getUsers', callback)
  socket.emit('users', room)
}

export function getMe(callback) {
  socket.emit('getMe')
  socket.on('nickname', callback)
  //send user only themselves
  // sending to individual socketid (private message)
  // io.to(socketId).emit("hey", "I just met you");
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

//finished drawing
function finishedCorpse() {
  console.log('DONE DRAWING!!! WOOO A MONSTER')
}

export default socket
