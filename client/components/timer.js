import React, {Component} from 'react'
import {stopTimer, timer} from '../socket'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 120000
    }
    this.handleTime = this.handleTime.bind(this)
  }

  //listen for timer
  componentDidMount() {
    //reset timer here and listen for it
    timer(this.props.room, this.handleTime)

    this.time = setTimeout(() => {
      this.props.handleDone()
    }, 120000)
  }

  //unsubscribes from timer
  componentWillUnmount() {
    clearTimeout(this.time)
    stopTimer()
  }

  handleTime(time) {
    this.setState({time: time})
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
    return <div> {this.msToTime(this.state.time)}</div>
  }
}

export default Timer
