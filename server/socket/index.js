const {uniqueNamesGenerator} = require('unique-names-generator')
const {adjectives, animals} = require('../dictionary')

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
      const playerThatLeft = socket.id
      const room = Object.values(socket.rooms).filter(
        roomName => roomName !== playerThatLeft
      )[0]
      if (room) {
        const socketsInRoom = Object.keys(
          io.sockets.adapter.rooms[room].sockets
        )
        const remainingPlayer = socketsInRoom.find(
          socketId => playerThatLeft !== socketId
        )
        socket.to(remainingPlayer).emit('playerDisconnected', playerThatLeft)
      }
    })

    socket.on('playerLeaving', () => {
      const playerThatLeft = socket.id
      const room = Object.values(socket.rooms).filter(
        roomName => roomName !== playerThatLeft
      )[0]
      if (room) {
        const socketsInRoom = Object.keys(
          io.sockets.adapter.rooms[room].sockets
        )
        const remainingPlayer = socketsInRoom.find(
          socketId => playerThatLeft !== socketId
        )
        socket.to(remainingPlayer).emit('playerDisconnected', playerThatLeft)
      }
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
    socket.on('users', (room, user) => {
      const roomInfo = io.sockets.adapter.rooms[room]
      let users = []

      if (!user) {
        for (let socketID in roomInfo.sockets) {
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
      } else {
        users = [...user]
      }

      if (users.length === 4 || user) {
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
      const playerPool = unique(remainingPlayers)
      const indicesToReplace = indicesOfDroppedPlayer(users, droppedPlayerId)
      indicesToReplace.forEach(index => {
        const randomIdx = Math.floor(Math.random() * playerPool.length)
        users[index] = playerPool[randomIdx]
      })
      io.in(room).emit('newUsers', users)
    })
  })
}

function unique(arr) {
  let seenIds = []
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let currId = arr[i].id
    if (seenIds.indexOf(currId) === -1) {
      seenIds.push(currId)
      result.push(arr[i])
    }
  }
  return result
}

function indicesOfDroppedPlayer(users, droppedPlayerId) {
  const droppedIndices = []
  users.forEach((user, idx) => {
    if (user.id === droppedPlayerId) {
      droppedIndices.push(idx)
    }
  })
  return droppedIndices
}
