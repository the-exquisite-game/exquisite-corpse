import React from 'react'
import Drawing from './drawing-page'
import {getMe, getUsers, joinRoom} from '../socket'

export class PartyRoom extends React.Component {
  constructor() {
    super()
    this.state = {
      userTurn: '',
      users: [],
      me: '',
      done: 0,
      bodyPartsImage: [],
      bodyParts: ['head', 'torso', 'hips', 'legs'],
      connectingLines: ''
    }
    this.canvas = React.createRef()
    this.handleDownload = this.handleDownload.bind(this)
    this.handleTurn = this.handleTurn.bind(this)

    this.handleUsers = this.handleUsers.bind(this)

    this.handleMyself = this.handleMyself.bind(this)
  }

  componentDidMount() {
    //joins the room via link (do we want to change this?)
    joinRoom(this.props.match.params.room)

    //gets all users + listens for more
    getUsers(this.handleUsers, this.props.match.params.room)

    //gets my nickname
    getMe(this.handleMyself)

    //create whose turn it is
  }

  handleUsers(users) {
    this.setState({users: users})
  }

  handleMyself(me) {
    this.setState({me: me})
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

  initializeTurn() {
    //has to be broadcasted as well
  }
  //function that increases the userTurn, adds images
  handleTurn(limbs, leadingLines, numberFinished) {
    this.setState(prevState => {
      return {
        done: numberFinished,
        userTurn: prevState.users[numberFinished],
        bodyPartsImage: [...prevState.bodyPartsImage, limbs],
        connectingLines: leadingLines
      }
    })
  }

  render() {
    return (
      <div>
        {/* add ternary that says if userTurn === me, show drawing */}
        <Drawing
          canvas={this.canvas}
          handleTurn={this.handleTurn}
          userTurn={this.state.done}
          room={this.props.match.params.room}
          connectingLines={this.state.connectingLines}
        />

        {/* I did this for testing */}
        {/* {this.state.bodyPartsImage.length > 0
          ? this.state.bodyPartsImage.map((part, index) => {
              return <img key={this.state.bodyParts[index]} src={part} />
            })
          : ''}
        connectingLines
        {this.state.connectingLines ? (
          <img src={this.state.connectingLines} />
        ) : (
          ''
        )} */}
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
