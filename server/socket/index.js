const {
  uniqueNamesGenerator,
  colors,
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
        dictionaries: [colors, animals],
        length: 2,
        separator: '-'
      })
      socket.join(room)
      io.to(room).emit('roomCreated', room)
    })

    socket.on('newLines', arr => {
      socket.broadcast.emit('linesToState', arr)
    })
  })

  // io.on('roomEnter', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)
  // })

  // io.on('roomLeave', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)
  // })
}
