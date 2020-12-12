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
      name: 'Frankenstein',
      timer: true
    }
    this.canvas = React.createRef()
    this.handleClick = this.handleClick.bind(this)
    this.onRoomCreated = this.onRoomCreated.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
    this.displayInstructions = this.displayInstructions.bind(this)
  }

  onRoomCreated(room) {
    this.props.history.push({
      pathname: `/partyroom/${room}`,
      state: {timer: this.state.timer}
    })
  }

  componentWillUnmount() {
    leaveRoom(this.onRoomCreated)
  }

  handleChange(event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    this.setState({[event.target.name]: value})
  }

  displayInstructions() {
    swal(<Instructions />)
  }

  async handleJoin() {
    const icon = this.canvas.current.toDataURL()
    setNameAndIcon(this.state.name, icon)

    //swal is a promise
    const room = await swal({
      text: "Enter the room's code!",
      buttons: {
        cancel: 'Cancel',
        confirm: {
          text: 'Enter'
        }
      },
      content: 'input'
    })

    if (room !== null) {
      this.props.history.push(`/partyroom/${room}`)
    }
  }

  handleClick() {
    const icon = this.canvas.current.toDataURL()
    setNameAndIcon(this.state.name, icon)
    createRoom(this.onRoomCreated)
  }

  render() {
    return (
      <div className="home-page">
        <div className="home-div">
          Welcome to Exquisite Corpse!
          <span id="nicknameInput">
            <label>Nickname:</label>
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </span>
          <Icon canvas={this.canvas} />
          <span className="roomButtons">
            <button type="button" id="createRoom" onClick={this.handleClick}>
              Create a Room!
            </button>
            <label>
              Timed Game?
              <input
                name="timer"
                type="checkbox"
                checked={this.state.timer}
                onChange={this.handleChange}
              />
            </label>
          </span>
          <span className="roomButtons">
            <button type="button" id="joinRoom" onClick={this.handleJoin}>
              Join a Room!
            </button>
            <label> Enter a room code from a buddy!</label>
          </span>
          <button
            className="instructions-button"
            type="button"
            onClick={this.displayInstructions}
          >
            Instructions
          </button>
        </div>
      </div>
    )
  }
}
