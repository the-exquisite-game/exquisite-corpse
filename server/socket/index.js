module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    //create the room
    socket.on('roomCreate', () => {
      let roomNo = 3
      socket.join(roomNo)
      //console.log(`room no.: 3`)
      io.to(roomNo).emit('roomCreated', roomNo)
    })

    //broadcast Lines
    socket.on('newLines', arr => {
      socket.broadcast.emit('linesToState', arr)
    })

    //finish drawing
    socket.on('doneDrawing', () => {
      console.log('DONE!')
      socket.emit('done', 1)
    })
  })

  // io.on('roomEnter', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)
  // })

  // io.on('roomLeave', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)
  // })
}
