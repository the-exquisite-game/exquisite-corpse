import React, {Component} from 'react'
import {Stage, Layer, Rect} from 'react-konva'
import IconImage from './icon-image.js'
import {
  lightColors,
  iconBackgrounds,
  leftArrow,
  rightArrow
} from '../utility/utilityProperties'

class Icon extends Component {
  constructor() {
    super()
    this.state = {
      color: lightColors.red
    }
    this.colorIdx = 0
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    //cycles through background colors array and matches to key in lightColors
    if (event.target.name === 'rightarrow') {
      if (this.colorIdx === iconBackgrounds.length - 1) {
        this.colorIdx = -1
      }
      this.colorIdx += 1
      this.setState({
        color: lightColors[iconBackgrounds[this.colorIdx]]
      })
    } else {
      if (this.colorIdx === 0) {
        this.colorIdx = iconBackgrounds.length
      }
      this.colorIdx -= 1
      this.setState({
        color: lightColors[iconBackgrounds[this.colorIdx]]
      })
    }
  }

  render() {
    return (
      <div className="iconCanvas">
        <button
          className="arrowButton tool"
          type="button"
          style={{
            backgroundImage: `url(/images/arrowleft.png)`,
            backgroundColor: lightColors[leftArrow[this.colorIdx]]
          }}
          name="leftarrow"
          onClick={this.handleChange}
        />
        <Stage width={100} height={100} ref={this.props.canvas}>
          <Layer>
            <Rect
              width={100}
              height={100}
              fill={this.state.color}
              cornerRadius={12}
            />
            <IconImage />
          </Layer>
        </Stage>
        <button
          className="arrowButton tool"
          type="button"
          style={{
            backgroundImage: `url(/images/arrowright.png)`,
            backgroundColor: lightColors[rightArrow[this.colorIdx]]
          }}
          name="rightarrow"
          onClick={this.handleChange}
        />
      </div>
    )
  }
}

export default Icon
