import io from 'socket.io-client'

//edit the argument here
const socket = io({
  transports: ['websocket']
})

socket.on('connect', () => {
  console.log('Connected!')

  setInterval(() => {
    socket.emit('ping')
  }, 15 * 1000)
})

socket.on('disconnect', () => {
  console.log(`Connection ${socket.id} has left the building`)
})

export function createRoom(callback) {
  socket.emit('roomCreate')
  socket.on('roomCreated', callback)
}

export function setNameAndIcon(name, icon) {
  socket.emit('set-nickname', name, icon)
}

export function leaveRoom(callback) {
  socket.off('roomCreated', callback)
}

export function joinRoom(room, messages, playerHandler) {
  socket.emit('joinedRoom', room)
  socket.on('tooMany', playerHandler)
  socket.on('messageToState', messages)
}

export function getUsers(callback, room) {
  socket.on('getUsers', callback)
  socket.emit('users', room)
}

export function getMe(callback) {
  socket.emit('getMe')
  socket.on('nickname', callback)
}

export function newLine(arr, room) {
  socket.emit('newLines', arr, room)
}

//broadcast all lines
export function broadcastLines(callback) {
  socket.on('linesToState', callback)
}

export function sendMessage(message, room) {
  socket.emit('sentMessage', message, room)
}

//listen for turns
export function turnListener(callback, finishedCallback) {
  socket.on('done', callback)
  socket.on('finished', finishedCallback)
}

//finish drawing function
export function doneDrawing(num, room, limbs, leadingLines) {
  socket.emit('doneDrawing', num, room, limbs, leadingLines)
}

export function initializeGame(callback) {
  socket.on('gameStart', callback)
}

export function timer(room, callback) {
  socket.on('timer', callback)
  socket.emit('time', room)
}

export function stopTimer() {
  socket.off('time')
  socket.off('timer')
}

export default socket
