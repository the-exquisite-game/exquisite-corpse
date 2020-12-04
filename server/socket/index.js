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

    //setting nickname for users
    socket.on('set-nickname', name => {
      socket.nickname = name
    })

    //getting all users
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

      if (users.length === 4) {
        io.in(room).emit('gameStart', users)
      }
    })

    //getting their own nickname
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
    socket.on('doneDrawing', (num, room, limbs, leadingLines) => {
      //room info, and users sockets names!
      const roomInfo = io.sockets.adapter.rooms[room]

      //amount of players
      let numOfPlayers = roomInfo.length
      io.in(room).emit('done', limbs, leadingLines, num)

      if (num === 4) {
        io.in(room).emit('finished')
      }
    })
  })
}
