import React from 'react'
import {default as socket} from '../socket'

/*export const Home = props => {
  const handleClick = () => {
    socket.emit('roomCreate');
    props.history.push('/drawing');
  }

  return (
    <div>
      <button
        type="button"
        id="createRoom"
        onClick={handleClick
        }>
        Test Room
      </button>
    </div>
  )
} */

export class Home extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div>
        <button type="button" id="createRoom" onClick={this.handleClick}>
          Test Room
        </button>
      </div>
    )
  }

  handleClick() {
    socket.emit('roomCreate')
    this.props.history.push('/drawing')
  }
}
