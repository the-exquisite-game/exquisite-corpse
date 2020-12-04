import React from 'react'
// import {default as socket} from '../socket'
import {createRoom, leaveRoom, setName} from '../socket'
import Icon from './icon'

export class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'User',
      joinRoom: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.onRoomCreated = this.onRoomCreated.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
  }

  onRoomCreated(room) {
    this.props.history.push(`/partyroom/${room}`)
  }

  componentWillUnmount() {
    leaveRoom(this.onRoomCreated)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleJoin() {
    setName(this.state.name)
    this.props.history.push(`/partyroom/${this.state.joinRoom}`)
  }

  render() {
    return (
      <div>
        <Icon />
        Enter a name!
        <label>Username:</label>
        <input
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label>Join an Existing Room</label>
        <input
          name="joinRoom"
          value={this.state.joinRoom}
          onChange={this.handleChange}
        />
        <button type="button" id="createRoom" onClick={this.handleClick}>
          Create a Room!
        </button>
        <button type="button" id="joinRoom" onClick={this.handleJoin}>
          Join a Room!
        </button>
      </div>
    )
  }

  handleClick() {
    setName(this.state.name)
    createRoom(this.onRoomCreated)
  }
}
