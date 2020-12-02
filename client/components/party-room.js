import React from 'react'
import Drawing from './drawing-page'
import {joinRoom} from '../socket'

export class PartyRoom extends React.Component {
  constructor() {
    super()
    this.state = {
      userTurn: '',
      users: [],
      done: 0,
      bodyPartsImage: [],
      bodyParts: ['head', 'torso', 'hips', 'legs'],
      connectingLines: ''
    }
    this.canvas = React.createRef()
    this.handleDownload = this.handleDownload.bind(this)
    this.handleTurn = this.handleTurn.bind(this)
  }

  componentDidMount() {
    joinRoom(this.props.match.params.room)
  }

  handleDownload() {
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

  //function that increases the userTurn, adds images
  handleTurn(limbs, leadingLines, numberFinished) {
    this.setState(prevState => {
      return {
        done: numberFinished,
        bodyPartsImage: [...prevState.bodyPartsImage, limbs],
        connectingLines: leadingLines
      }
    })
  }

  render() {
    return (
      <div>
        <Drawing
          canvas={this.canvas}
          handleTurn={this.handleTurn}
          userTurn={this.state.done}
          room={this.props.match.params.room}
        />
        {this.state.bodyPartsImage.length > 0
          ? this.state.bodyPartsImage.map((part, index) => {
              return <img key={this.state.bodyParts[index]} src={part} />
            })
          : ''}
        connectingLines
        {this.state.connectingLines ? (
          <img src={this.state.connectingLines} />
        ) : (
          ''
        )}
        {/* <button type="button" onClick={this.handleDownload}>
          Download
        </button> */}
        {/* <button type="button" onClick={this.handleClick}>
          Save to Gallery
        </button> */}
      </div>
    )
  }
}
