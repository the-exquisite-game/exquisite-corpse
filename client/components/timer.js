import React, {Component} from 'react'
import {stopTimer, timer} from '../socket'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '2:00'
    }
  }

  //listen for timer
  componentDidMount() {
    timer(this.props.room, time => {
      const display = this.msToTime(time)
      this.setState({time: display})
    })
  }

  //unsubscribes from timer
  componentWillUnmount() {
    stopTimer()
  }

  msToTime(time) {
    const minutes = Math.floor(time / 60000)
    const seconds = ((time % 60000) / 1000).toFixed(0)

    if (seconds === '60') {
      return minutes + 1 + ':00'
    } else {
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }

  render() {
    return <div> {this.state.time}</div>
  }
}

export default Timer
