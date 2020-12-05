import React, {Component} from 'react'
import {sendMessage} from '../socket'

const defaultState = {
  message: ''
}

export default class ChatMessageEntry extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <form id="chat-message-entry" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="messages"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }

  handleChange(evt) {
    this.setState({
      message: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    sendMessage(this.state.message, this.props.room)
    this.setState(defaultState)
  }
}
