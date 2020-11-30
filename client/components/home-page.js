import React from 'react'
import {default as socket} from '../socket'

export const Home = props => {
  return (
    <div>
      <button
        type="button"
        id="createRoom"
        onClick={() => {
          socket.emit('roomCreate')
        }}
      >
        Test Room
      </button>
    </div>
  )
}
