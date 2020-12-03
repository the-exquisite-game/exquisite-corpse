import React from 'react'
import Drawing from './drawing-page'

export class PartyRoom extends React.Component {
  constructor() {
    super()
    this.canvas = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const img = this.canvas.current.toDataURL()
    this.downloadURI(img, 'corpse.png')
  }
  downloadURI(uri, name) {
    let link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  render() {
    return (
      <div>
        <Drawing canvas={this.canvas} room={this.props.match.params.room} />
        <button type="button" onClick={this.handleClick}>
          Download
        </button>
        {/* <button type="button" onClick={this.handleClick}>
          Save to Gallery
        </button> */}
      </div>
    )
  }
}
