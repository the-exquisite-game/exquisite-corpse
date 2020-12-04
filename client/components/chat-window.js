import React, {Component} from 'react'
import ChatMessage from './chat-message'

export default class ChatWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: null
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {this.state.messages.map(message => <ChatMessage message={message} />)}
      </div>
    )
  }
}
