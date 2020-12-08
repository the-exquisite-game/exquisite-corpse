import React from 'react'
import Drawing from './drawing-page'
import {
  getMe,
  getUsers,
  initializeGame,
  joinRoom,
  turnListener
} from '../socket'
import {UsersBar} from './users-bar'
import {FinalMonster} from './finalMonster'
import swal from '@sweetalert/with-react'
import ChatWindow from './chat-window'
import Timer from './timer'

export class PartyRoom extends React.Component {
  constructor() {
    super()
    this.state = {
      userTurn: {},
      users: [],
      me: '',
      done: 0,
      bodyPartsImage: [],
      bodyParts: ['head', 'torso', 'legs', 'feet'],
      connectingLines: '',
      gamePlay: false,
      finished: false,
      chatMessages: []
    }

    this.canvas = React.createRef()
    this.handleDownload = this.handleDownload.bind(this)
    this.handleTurn = this.handleTurn.bind(this)
    this.handleUsers = this.handleUsers.bind(this)
    this.handleMyself = this.handleMyself.bind(this)
    this.gameStart = this.gameStart.bind(this)
    this.handleFinish = this.handleFinish.bind(this)
    this.handleTooManyPlayers = this.handleTooManyPlayers.bind(this)
    this.addMessage = this.addMessage.bind(this)
  }

  componentDidMount() {
    //joins the room via link
    joinRoom(
      this.props.match.params.room,
      this.addMessage,
      this.handleTooManyPlayers
    )

    //gets all users + listens for more
    getUsers(this.handleUsers, this.props.match.params.room)

    //gets my nickname
    getMe(this.handleMyself)

    //listening for turns being done
    turnListener(this.handleTurn, this.handleFinish)

    //listening for Game Start
    initializeGame(this.gameStart)
  }

  handleTooManyPlayers() {
    this.props.history.push(`/home`)
    //third argument here is the image
    swal('Sorry, room is full!', 'Only four players allowed :(', 'warning')
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

  gameStart(users) {
    this.setState({users: users, userTurn: users[0], gamePlay: true})
  }

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

  handleFinish() {
    this.setState({gamePlay: false, finished: true})
  }

  addMessage(message) {
    this.setState(prevState => ({
      chatMessages: [...prevState.chatMessages, message]
    }))
  }

  render() {
    const myself = this.state.me
    const userTurn = this.state.userTurn || {}
    const room = this.props.match.params.room

    return (
      <div id="party-room">
        <div id="users-section">
          <UsersBar users={this.state.users} id="users-bar" />
        </div>
        <div id="party-room-canvas">
          {this.state.gamePlay ? (
            <div>
              It is {userTurn.nickname}'s turn! Drawing the{' '}
              {this.state.bodyParts[this.state.done]}
              {/* timer here? */}
              <Timer room={room} />
              {myself.id === userTurn.id ? (
                <Drawing
                  canvas={this.canvas}
                  handleTurn={this.handleTurn}
                  userTurn={this.state.done}
                  room={room}
                  connectingLines={this.state.connectingLines}
                />
              ) : (
                ''
              )}
            </div>
          ) : (
            <div>
              {this.state.finished ? (
                <div id="finalMonster">
                  <FinalMonster
                    bodyParts={this.state.bodyPartsImage}
                    canvas={this.canvas}
                  />
                  <button type="button" onClick={this.handleDownload}>
                    Download
                  </button>
                </div>
              ) : (
                `Waiting for ${4 - this.state.users.length} more players!`
              )}
            </div>
          )}
        </div>
        {/* <button type="button" onClick={this.handleClick}>
          Save to Gallery
        </button> */}
        <ChatWindow
          messages={this.state.chatMessages}
          room={room}
          me={this.state.me}
        />
      </div>
    )
  }
}
