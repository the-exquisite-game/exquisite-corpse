import React, {Component} from 'react'
import {Stage, Layer, Line} from 'react-konva'
import {doneDrawing} from '../socket'
import Palette from './palette'
import Timer from './timer'

class Drawing extends Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {
      tool: 'pen',
      lines: [],
      color: 'black',
      brushSize: 5
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleDoneClick = this.handleDoneClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleMouseDown(e) {
    const position = e.target.getStage().getPointerPosition()
    this.setState(prevState => {
      return {
        lines: [
          ...prevState.lines,
          {
            tool: prevState.tool,
            brushSize: prevState.brushSize,
            color: prevState.color,
            points: [position.x, position.y]
          }
        ]
      }
    })
  }

  handleMouseMove(e) {
    if (!this.props.hasClicked || this.props.clickLocation !== 'CANVAS') {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()

    //gets lastLine
    let lastLine = this.state.lines[this.state.lines.length - 1]
    //setting points - adding length to line
    lastLine.points = lastLine.points.concat([point.x, point.y])

    //replace last one
    let lineList = [...this.state.lines]

    lineList.splice(this.state.lines.length - 1, 1, lastLine)

    this.setState({lines: lineList})
  }

  handleDone(numberFinished) {
    const bodyPart = this.canvas.current.toDataURL()

    const leadingLines = this.canvas.current.toDataURL({
      y: 450,
      x: 0,
      width: 600,
      height: 50
    })
    doneDrawing(numberFinished, this.props.room, bodyPart, leadingLines)
  }

  handleDoneClick() {
    const turn = this.props.userTurn + 1
    this.handleDone(turn)
  }

  handleChange(event) {
    //changes brush size
    if (event.target.name === 'brushSize') {
      let value = +event.target.value
      this.setState({brushSize: value})
    } else if (event.target.name === 'color') {
      //changes color and invokes pen automatically
      this.setState({
        [event.target.name]: event.target.value,
        tool: 'pen'
      })
    } else if (event.target.name === 'clear') {
      //clears whole canvas
      this.canvas.current.clear()
      this.setState({
        lines: []
      })
    } else if (event.target.name === 'undo') {
      //undo
      let undoList = [...this.state.lines]
      undoList.pop()
      this.setState({lines: undoList})
    } else {
      //changes tool & tool size
      this.setState({[event.target.name]: event.target.value})
    }
  }

  render() {
    const connectingLines = this.props.connectingLines || ''
    return (
      <div className="drawing-page">
        <div id="timer">
          {this.props.timer ? (
            <div>
              <Timer
                room={this.props.room}
                handleDone={this.handleDoneClick}
                userTurn={this.props.userTurn}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <img src={connectingLines} />
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
                stroke={line.color}
                strokeWidth={line.brushSize}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>

        <Palette tool={this.state.tool} handleChange={this.handleChange} />

        <button type="button" onClick={() => this.handleDoneClick()}>
          Done!
        </button>
      </div>
    )
  }
}

export default Drawing
