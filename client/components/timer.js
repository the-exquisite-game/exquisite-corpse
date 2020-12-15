import React, {Component} from 'react'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 120000
    }
    this.handleTime = this.handleTime.bind(this)
    this.setTimer = this.setTimer.bind(this)
    this.countdown = this.countdown.bind(this)
  }

  //listen for timer
  componentDidMount() {
    this.countdown()

    // this.time = setTimeout(() => {
    //   this.props.handleDone()
    // }, 120000)
  }

  //timer
  countdown() {
    this.counter = setInterval(this.setTimer, 1000)
  }

  setTimer() {
    if (this.state.time > 0) {
      this.setState({time: this.state.time - 1000})
    } else {
      this.props.handleDone()
    }
  }

  //unsubscribes from timer
  componentWillUnmount() {
    clearTimeout(this.time)
    clearInterval(this.counter)
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
