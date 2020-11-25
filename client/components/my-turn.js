import React, {Component} from 'react'
import Drawing from './drawing-page'

class myTurn extends Component {
  render() {
    return (
      <div id="wow">
        My Turn
        <div id="container" />
        <Drawing />
      </div>
    )
  }
}

export default myTurn
