import React, {Component} from 'react'
import ChatMessage from './chat-message'
import ChatMessageEntry from './chat-message-entry'
import {joinRoom} from '../socket'

export default class ChatWindow extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    joinRoom(this.props.room)
  }

  render() {
    const messages = this.props.messages
    return (
      <div>
        {messages.map(message => <ChatMessage message={message} />)}
        <ChatMessageEntry
          room={this.props.room}
          addMessage={this.props.addMessage}
        />
      </div>
    )
  }
}
