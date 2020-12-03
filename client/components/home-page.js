import React from 'react'
import {default as socket} from '../socket'
import {createRoom, leaveRoom} from '../socket'

export class Home extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.onRoomCreated = this.onRoomCreated.bind(this)
  }

  onRoomCreated(room) {
    this.props.history.push(`/partyroom/${room}`)
  }

  componentWillUnmount() {
    leaveRoom(this.onRoomCreated)
  }

  render() {
    return (
      <div>
        <button type="button" id="createRoom" onClick={this.handleClick}>
          Test Room
        </button>
      </div>
    )
  }

  handleClick() {
    createRoom(this.onRoomCreated)
  }
}
