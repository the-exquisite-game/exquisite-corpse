import React, {Component} from 'react'
import {Stage, Layer, Rect} from 'react-konva'
import IconImage from './icon-image.js'
// import ColoredRect from './trash/rect-color.js'
import {lightColors, darkColors} from '../../script/paletteProperties'

class Icon extends Component {
  constructor() {
    super()
    this.state = {
      color: lightColors.red
    }
    this.canvas = React.createRef()
    this.backgrounds = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    this.colorIdx = 0

    // this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // handleClick() {
  //   const img = this.canvas.current.toDataURL()
  //   console.log('partyroomIMG', img)
  //   this.downloadURI(img, 'icon.png')
  // }

  // downloadURI(uri, name) {
  //   let link = document.createElement('a')
  //   link.download = name
  //   link.href = uri
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  // }

  handleChange(event) {
    //cycles through background colors array and matches to key in lightColors
    if (event.target.name === 'rightarrow') {
      if (this.colorIdx === this.backgrounds.length - 1) {
        this.colorIdx = -1
      }

      this.colorIdx += 1
      console.log(this.colorIdx)
      this.setState({
        color: lightColors[this.backgrounds[this.colorIdx]]
      })
    } else {
      if (this.colorIdx === 0) {
        this.colorIdx = this.backgrounds.length
      }
      this.colorIdx -= 1
      this.setState({
        color: lightColors[this.backgrounds[this.colorIdx]]
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
            backgroundImage: `url(/images/arrowleft.png)`
          }}
          name="leftarrow"
          onClick={this.handleChange}
        />
        <Stage width={100} height={100} ref={this.canvas}>
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
            backgroundImage: `url(/images/arrowright.png)`
          }}
          name="rightarrow"
          onClick={this.handleChange}
        />
        <button type="button" onClick={this.handleClick}>
          Download
        </button>
      </div>
    )
  }
}

export default Icon
