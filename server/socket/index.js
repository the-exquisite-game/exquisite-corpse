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

    //finish drawing button
    socket.on('doneDrawing', num => {
      console.log('DONE!', num)

      //io.sockets.clients('room').length

      //room info, and users sockets names!
      let room = io.sockets.adapter.rooms[3]
      console.log(room)

      //can I get the room # from the url?

      //amount of players
      let numOfPlayers = room.length

      console.log(numOfPlayers)

      if (num < numOfPlayers) {
        socket.emit('done', num)
      } else {
        socket.emit('finished')
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
