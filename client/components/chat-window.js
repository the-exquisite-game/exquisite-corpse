import React, {Component} from 'react'
import ChatMessage from './chat-message'
import ChatMessageEntry from './chat-message-entry'
import {joinRoom} from '../socket'

export default class ChatWindow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const messages = this.props.messages
    return (
      <div id="chat-window">
        <div id="chat-messages">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <ChatMessageEntry room={this.props.room} me={this.props.me} />
      </div>
    )
  }
}
