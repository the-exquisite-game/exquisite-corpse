import React from 'react'
import {getUsers} from '../socket'

export class UsersBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const users = this.props.users || []
    let userTurn = this.props.userTurn || {}
    return (
      <div id="users-bar">
        {users.map(
          username =>
            username.id === userTurn.id ? (
              <div key={username.id} id="indiv-user-sidebar-selected">
                <img id="image-sidebar" src={username.icon} />
                <div id="username-sidebar">{username.nickname}</div>
              </div>
            ) : (
              <div key={username.id} className="indiv-user-sidebar">
                <img id="image-sidebar" src={username.icon} />
                <div id="username-sidebar">{username.nickname}</div>
              </div>
            )
        )}
      </div>
    )
  }
}
