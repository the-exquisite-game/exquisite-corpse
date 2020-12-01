import React, {Component} from 'react'
import {Stage, Layer, Line} from 'react-konva'
import Palette from './palette'

class Drawing extends Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {
      tool: 'pen',
      lines: [],
      isDrawing: false,
      color: '#df4b26',
      brushSize: 5
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleMouseDown(e) {
    this.setState({isDrawing: true})

    const position = e.target.getStage().getPointerPosition()

    //messed up here
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
    let lineList = this.state.lines

    let newLineList = lineList.splice(this.state.lines.length - 1, 1, lastLine)

    this.setState({lines: lineList})
  }

  //on Mouse Up sets state of paint to false
  handleMouseUp() {
    this.setState({isDrawing: false})
  }

  handleChange(event) {
    if (event.target.name === 'brushSize') {
      let value = +event.target.value
      this.setState({brushSize: value})
    } else {
      this.setState({[event.target.name]: event.target.value})
    }
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
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
        <Palette tool={this.state.tool} handleChange={this.handleChange} />
      </div>
    )
  }
}

export default Drawing
