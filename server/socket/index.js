const {
  uniqueNamesGenerator,
  adjectives,
  animals
} = require('unique-names-generator')

//shuffling using Durstenfeld shuffle
const shuffle = arr => {
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * (i + 1))
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    //handles player dropping out of game
    socket.on('disconnecting', () => {
      const playerThatLeft = Object.values(socket.rooms)[0]
      const room = Object.values(socket.rooms)[1]
      const socketsInRoom = Object.keys(io.sockets.adapter.rooms[room].sockets)
      const remainingPlayer = socketsInRoom.find(
        socketId => playerThatLeft !== socketId
      )
      socket.to(remainingPlayer).emit('playerDisconnected', playerThatLeft)
    })

    //create the room
    socket.on('roomCreate', () => {
      const room = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
        separator: '-'
      })

      io.emit('roomCreated', room)
    })

    //setting nickname + icon for users
    socket.on('set-nickname', (name, icon) => {
      socket.nickname = name
      socket.icon = icon
    })

    //getting all users
    socket.on('users', room => {
      const roomInfo = io.sockets.adapter.rooms[room]
      let users = []

      for (let socketID in roomInfo.sockets) {
        //console.log(Object.keys(io.sockets.connected[socketID]))
        if (io.sockets.connected[socketID].hasOwnProperty('nickname')) {
          const nickname = io.sockets.connected[socketID].nickname

          const icon = io.sockets.connected[socketID].icon

          const userInfo = {nickname: nickname, id: socketID, icon: icon}
          users.push(userInfo)
        } else {
          socket.nickname = `Frankenstein`
          socket.icon = '/images/defaultIcon.png'
          const userInfo = {
            nickname: socket.nickname,
            id: socketID,
            icon: socket.icon
          }
          users.push(userInfo)
        }
      }

      io.in(room).emit('getUsers', users)

      if (users.length === 4) {
        users = shuffle(users)
        io.in(room).emit('gameStart', users)
      }
    })

    //getting their own nickname + icon
    socket.on('getMe', () => {
      const id = socket.id
      const nickname = socket.nickname
      const icon = socket.icon
      io.to(id).emit('nickname', {id: id, nickname: nickname, icon: icon})
    })

    socket.on('newLines', (arr, room) => {
      socket.to(room).broadcast.emit('linesToState', arr)
    })

    socket.on('joinedRoom', (room, time) => {
      //room info, and users sockets names!
      const roomInfo = io.sockets.adapter.rooms[room] || []

      if (roomInfo.length < 4) {
        socket.join(room)

        if (time) {
          io.sockets.adapter.rooms[room].timer = time
        }

        io
          .in(room)
          .emit('timerInitialize', io.sockets.adapter.rooms[room].timer)
      } else {
        socket.emit('tooMany')
      }
    })

    socket.on('sentMessage', (message, room) => {
      io.in(room).emit('messageToState', message)
    })

    //finish drawing button
    socket.on('doneDrawing', (num, room, limbs, leadingLines) => {
      io.in(room).emit('done', limbs, leadingLines, num)

      if (num === 4) {
        io.in(room).emit('finished')
      }
    })

    //timer for broadcast (maybe?)
    // socket.on('time', (room, time) => {
    //   //120000 is two minutes
    //   // let countDown = time

    //   setInterval(function () {
    //     time -= 1000
    //     if (time >= 0) {
    //       io.to(socket.id).emit('timer', time)
    //     }
    //   }, 1000)
    // })

    socket.on('newgame', room => {
      io.in(room).emit('newgamestart')
    })

    socket.on('replaceUser', (room, users, droppedPlayerId) => {
      const remainingPlayers = users.filter(user => user.id !== droppedPlayerId)
      while (remainingPlayers.length < 4) {
        let randomIdx = Math.floor(Math.random() * remainingPlayers.length - 1)
        remainingPlayers.push(remainingPlayers[randomIdx])
      }
      //Keep this console.log to debug room leaving stuff
      console.log(remainingPlayers.map(x => x.id))
      io.in(room).emit('newUsers', remainingPlayers)
    })
  })
}
