import React, {Component} from 'react'
import {stopTimer, timer} from '../socket'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '2:00'
    }
    this.handleTime = this.handleTime.bind(this)
  }

  //listen for timer
  componentDidMount() {
    //reset timer here and listen for it
    timer(this.props.room, this.handleTime)

    setTimeout(() => {
      this.props.handleDone()
    }, 120000)
  }

  //unsubscribes from timer
  componentWillUnmount() {
    clearTimeout()
    stopTimer()
  }

  handleTime(time) {
    const display = this.msToTime(time)
    this.setState({time: display})
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
