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
    this.createMessage = this.createMessage.bind(this)
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <form
          id="chat-message-entry"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
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
    sendMessage(this.createMessage(this.state.message), this.props.room)
    this.setState(defaultState)
    //this.props.scrollToBottom()
  }

  createMessage(message) {
    return {
      id: Math.floor(Math.random() * 10000),
      nickname: this.props.me.nickname,
      content: message
    }
  }
}
