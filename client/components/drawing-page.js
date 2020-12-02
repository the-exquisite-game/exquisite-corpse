import {number} from 'prop-types'
import React, {Component} from 'react'
import {Stage, Layer, Line} from 'react-konva'
import {newLine, broadcastLines, doneDrawing} from '../socket'

class Drawing extends Component {
  constructor(props) {
    super(props)
    // this.canvas = React.createRef()
    this.state = {
      tool: 'pen',
      lines: [],
      isDrawing: false,
      done: 0
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  componentDidMount() {
    broadcastLines(broadcastedState =>
      this.setState({
        lines: broadcastedState
      })
    )
  }

  handleMouseDown(e) {
    this.setState({isDrawing: true})

    const position = e.target.getStage().getPointerPosition()

    this.setState(prevState => {
      return {
        lines: [
          ...prevState.lines,
          {tool: prevState.tool, points: [position.x, position.y]}
        ]
      }
    })
  }

  handleMouseMove(e) {
    if (this.state.isDrawing === false) {
      return
    }

    const stage = e.target.getStage()
    const point = stage.getPointerPosition()

    //gets lastLine
    let lastLine = this.state.lines[this.state.lines.length - 1]

    //setting points
    lastLine.points = lastLine.points.concat([point.x, point.y])

    //replace last one
    let lineList = [...this.state.lines]

    lineList.splice(this.state.lines.length - 1, 1, lastLine)

    this.setState({lines: lineList})
    newLine(this.state.lines)
  }

  //on Mouse Up sets state of paint to false
  handleMouseUp() {
    this.setState({isDrawing: false})
  }

  handleDone(numberFinished) {
    console.log('done!', numberFinished)

    this.setState({
      done: numberFinished
    })

    //will update party page state to include another done drawing, push the drawing and num done

    //will push to history party page, for now pushing to home page
    // this.props.history.push('/home')
  }

  render() {
    return (
      <div>
        <Stage
          width={600}
          height={500}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          ref={this.props.canvas}
        >
          <Layer>
            {this.state.lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
        <select
          value={this.state.tool}
          onChange={e => {
            this.setState({tool: e.target.value})
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>

        <button
          type="button"
          onClick={() => doneDrawing(this.state.done + 1, this.handleDone)}
        >
          Done!
        </button>
      </div>
    )
  }
}

export default Drawing
