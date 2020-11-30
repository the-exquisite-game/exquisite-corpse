import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('roomCreate', room => {
  console.log(room)
})

export default socket
