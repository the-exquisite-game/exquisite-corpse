import React, {Component} from 'react'
import ChatMessage from './chat-message'
import ChatMessageEntry from './chat-message-entry'
import {joinRoom} from '../socket'
import * as Scroll from 'react-scroll'

export default class ChatWindow extends Component {
  constructor(props) {
    super(props)
    this.scrollToBottom = this.scrollToBottom.bind(this)
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
        <ChatMessageEntry
          room={this.props.room}
          me={this.props.me}
          scrollToBottom={this.scrollToBottom}
        />
      </div>
    )
  }

  scrollToBottom() {
    Scroll.animateScroll.scrollToBottom('animateScroll', {
      containerId: 'chat-window'
    })
  }
}
