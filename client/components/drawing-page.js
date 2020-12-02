import React, {Component} from 'react'
import {Stage, Layer, Line} from 'react-konva'
import {
  newLine,
  broadcastLines,
  joinRoom,
  doneDrawing,
  turnListener
} from '../socket'

class Drawing extends Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {
      tool: 'pen',
      lines: [],
      isDrawing: false
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleDoneClick = this.handleDoneClick.bind(this)
  }

  componentDidMount() {
    // joinRoom(this.props.room)
    broadcastLines(broadcastedState => {
      this.setState({
        lines: broadcastedState
      })
    })

    //listening for turns being done
    turnListener(this.handleDone)
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
    newLine(this.state.lines, this.props.room)
  }

  //on Mouse Up sets state of paint to false
  handleMouseUp() {
    this.setState({isDrawing: false})
  }

  handleDone(numberFinished) {
    console.log('done!', numberFinished)

    const bodyPart = this.canvas.current.toDataURL()

    const leadingLines = this.canvas.current.toDataURL({
      y: 400,
      x: 0,
      width: 600,
      height: 100
    })

    //updates party-room state
    this.props.handleTurn(bodyPart, leadingLines, numberFinished)
  }

  handleDoneClick() {
    doneDrawing(this.props.userTurn + 1, this.props.room)
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
          ref={this.canvas}
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

        <button type="button" onClick={() => this.handleDoneClick()}>
          Done!
        </button>
      </div>
    )
  }
}

export default Drawing
