import React from 'react'
// import {default as socket} from '../socket'
import {createRoom, leaveRoom} from '../socket'

export class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'User'
    }
    this.handleClick = this.handleClick.bind(this)
    this.onRoomCreated = this.onRoomCreated.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  onRoomCreated(room) {
    this.props.history.push(`/partyroom/${room}`)
  }

  componentWillUnmount() {
    leaveRoom(this.onRoomCreated)
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  render() {
    return (
      <div>
        Enter a name!
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <button type="button" id="createRoom" onClick={this.handleClick}>
          Create a Room!
        </button>
        {/* <button type = "button" id = "joinRoom" onClick = {this.handleJoin} >Join a Room!</button> */}
      </div>
    )
  }

  handleClick() {
    createRoom(this.onRoomCreated, this.state.name)
  }
}
