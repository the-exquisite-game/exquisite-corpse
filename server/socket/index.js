const {
  uniqueNamesGenerator,
  adjectives,
  animals
} = require('unique-names-generator')

/*
  If this is the only file you need on your backend, consider deleting the boilermaker code you don't need to trim down on the codebase. E.g. do you need a database?
*/

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

    //setting nickname + icon for users
    socket.on('set-nickname', (name, icon) => {
      socket.nickname = name
      socket.icon = icon
    })

    //getting all users
    socket.on('users', room => {
      const roomInfo = io.sockets.adapter.rooms[room]
      let users = []

      for (socketID in roomInfo.sockets) {
        if (io.sockets.connected[socketID].hasOwnProperty('nickname')) {
          const nickname = io.sockets.connected[socketID].nickname

          const icon = io.sockets.connected[socketID].icon

          const userInfo = {nickname: nickname, id: socketID, icon: icon}
          users.push(userInfo)
        } else {
          socket.nickname = `User`
          socket.icon = '/images/unamusedMonster_blue.png'
          const userInfo = {
            nickname: socket.nickname,
            id: socketID,
            icon: socket.icon
          }
          users.push(userInfo)
        }
      }

      io.in(room).emit('getUsers', users)

      // can we handle other cases here? If length is < 4 display "Still waiting on more to join!" if it's > 4 "Uh oh! Too many folks at this party, we need exactly 4 players"
      if (users.length === 4) {
        io.in(room).emit('gameStart', users)
      }
    })

    //getting their own nickname
    socket.on('getMe', () => {
      const id = socket.id
      const nickname = socket.nickname
      const icon = socket.icon
      io.to(id).emit('nickname', {id: id, nickname: nickname, icon: icon})
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
