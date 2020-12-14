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

export function replaceUser(room, users, droppedPlayerId) {
  socket.emit('replaceUser', room, users, droppedPlayerId)
}

export function leaveRoom(callback) {
  socket.off('roomCreated', callback)
}

export function joinRoom(
  room,
  messages,
  playerHandler,
  time,
  timerCallback,
  playerDisconnected,
  setUsers
) {
  socket.emit('joinedRoom', room, time)
  socket.on('timerInitialize', timerCallback)
  socket.on('tooMany', playerHandler)
  socket.on('messageToState', messages)
  socket.on('playerDisconnected', playerDisconnected)
  socket.on('newUsers', setUsers)
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

//socket timer for broadcast to room (maybe?)
// export function timer(room, callback, time) {
//   socket.on('timer', callback)
//   socket.emit('time', room, time)
// }

// export function stopTimer() {
//   socket.off('time')
//   socket.off('timer')
// }

//new game
export function newGameListener(callback) {
  socket.on('newgamestart', callback)
}

export function newGame(room) {
  socket.emit('users', room)
  socket.emit('newgame', room)
}

export default socket
