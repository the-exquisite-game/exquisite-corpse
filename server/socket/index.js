const {
  uniqueNamesGenerator,
  adjectives,
  animals
} = require('unique-names-generator')

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
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

    socket.on('set-nickname', name => {
      socket.nickname = name
    })

    socket.on('users', room => {
      const roomInfo = io.sockets.adapter.rooms[room]
      let users = []

      for (socketID in roomInfo.sockets) {
        if (io.sockets.connected[socketID].hasOwnProperty('nickname')) {
          const nickname = io.sockets.connected[socketID].nickname

          const userInfo = {nickname: nickname, id: socketID}
          users.push(userInfo)
        } else {
          socket.nickname = `User`
          const userInfo = {nickname: socket.nickname, id: socketID}
          users.push(userInfo)
        }
      }

      io.in(room).emit('getUsers', users)
    })

    socket.on('getMe', () => {
      const id = socket.id
      const nickname = socket.nickname
      io.to(id).emit('nickname', {id: id, nickname: nickname})
    })

    socket.on('newLines', (arr, room) => {
      socket.to(room).broadcast.emit('linesToState', arr)
    })

    socket.on('joinedRoom', room => {
      socket.join(room)
    })

    //finish drawing button
    socket.on('doneDrawing', (num, room) => {
      //room info, and users sockets names!
      const roomInfo = io.sockets.adapter.rooms[room]

      //amount of players
      let numOfPlayers = roomInfo.length
      socket.to(room).broadcast.emit('done', num)

      if (num === numOfPlayers) {
        io.in(room).emit('finished')
      }
    })
  })

  // io.on('roomEnter', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)
  // })

  // io.on('roomLeave', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)
  // })
}
