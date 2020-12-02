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
      socket.join(room)
      io.to(room).emit('roomCreated', room)
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
        socket.to(room).broadcast.emit('finished')
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
