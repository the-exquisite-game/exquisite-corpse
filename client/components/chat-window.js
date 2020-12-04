import React, {Component} from 'react'
import ChatMessage from './chat-message'
import ChatMessageEntry from './chat-message-entry'
import {joinRoom} from '../socket'

export default class ChatWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    joinRoom(this.props.room)
  }

  render() {
    return (
      <div>
        {this.state.messages.map(message => <ChatMessage message={message} />)}
        <ChatMessageEntry room={this.props.room} />
      </div>
    )
  }
}
