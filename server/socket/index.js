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

    socket.on('roomCreate', () => {
      const room = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
        separator: '-'
      })
      io.emit('roomCreated', room)
    })

    socket.on('newLines', (arr, room) => {
      socket.to(room).broadcast.emit('linesToState', arr)
    })

    socket.on('joinedRoom', room => {
      socket.join(room)
    })
  })

  // io.on('roomEnter', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)
  // })

  // io.on('roomLeave', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)
  // })
}
