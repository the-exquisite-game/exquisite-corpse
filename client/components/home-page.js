import React from 'react'
// import {default as socket} from '../socket'
import {createRoom, leaveRoom, setNameAndIcon} from '../socket'
import Icon from './icon'
import {Instructions} from './instructions'
import swal from '@sweetalert/with-react'

export class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'User',
      joinRoom: ''
    }
    this.canvas = React.createRef()
    this.handleClick = this.handleClick.bind(this)
    this.onRoomCreated = this.onRoomCreated.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
    this.displayInstructions = this.displayInstructions.bind(this)
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

  displayInstructions() {
    swal(<Instructions />)
  }

  handleJoin() {
    const icon = this.canvas.current.toDataURL()
    setNameAndIcon(this.state.name, icon)
    this.props.history.push(`/partyroom/${this.state.joinRoom}`)
  }

  render() {
    return (
      <div className="home-page">
        <Icon canvas={this.canvas} />
        <span>
          <label>Enter a nickname:</label>
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
        </span>
        <div id="buttons-container">
          <button type="button" id="createRoom" onClick={this.handleClick}>
            Create a Room!
          </button>
          <button type="button" id="joinRoom" onClick={this.handleJoin}>
            Join a Room!
          </button>
        </div>
        <button
          className="instructions-button"
          type="button"
          onClick={this.displayInstructions}
        >
          Instructions
        </button>
      </div>
    )
  }

  handleClick() {
    const icon = this.canvas.current.toDataURL()
    setNameAndIcon(this.state.name, icon)
    createRoom(this.onRoomCreated)
  }
}
