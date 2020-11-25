import React, {Component} from 'react'
import {Stage, Layer, Line} from 'react-konva'

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
  }

  handleMouseDown(e) {
    //this needs hook
    this.setState({isDrawing: true})

    const position = e.target.getStage().getPointerPosition()

    //messed up here
    this.setState({
      lines: [
        ...this.state.lines,
        {...this.state.tool, points: [position.x, position.y]}
      ]
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
    let newLineList = this.state.lines.splice(
      this.state.lines.length - 1,
      1,
      lastLine
    )

    this.setState({lines: newLineList})
  }

  //on Mouse Up sets state of paint to false
  handleMouseUp() {
    this.setState({isDrawing: false})
  }

  render() {
    return (
      <div>
        <Stage
          width={600}
          height={1000}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
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
      </div>
    )
  }
}

export default Drawing
