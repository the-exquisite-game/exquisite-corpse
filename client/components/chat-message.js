import React from 'react'

export default function ChatMessage(props) {
  const message = props.message
  return (
    <div>
      {message.nickname}: {message.content}
    </div>
  )
}
