import React from 'react'
import {getUsers} from '../socket'

export class UsersBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const users = this.unique(this.props.users) || []
    let userTurn = this.props.userTurn || {}
    return (
      <div id="users-bar">
        {users.map(
          username =>
            username.hasOwnProperty('id') && username.id === userTurn.id ? (
              <div key={username.id} id="indiv-user-sidebar-selected">
                <img id="image-sidebar" src={username.icon} />
                <div id="username-sidebar">{username.nickname}</div>
              </div>
            ) : (
              <div
                key={Math.random()
                  .toString(36)
                  .substring(7)}
                className="indiv-user-sidebar"
              >
                <img id="image-sidebar" src={username.icon} />
                <div id="username-sidebar">{username.nickname}</div>
              </div>
            )
        )}
      </div>
    )
  }

  unique(arr) {
    let seenIds = []
    let result = []
    for (let i = 0; i < arr.length; i++) {
      let currId = arr[i].id
      if (seenIds.indexOf(currId) === -1) {
        seenIds.push(currId)
        result.push(arr[i])
      }
    }
    return result
  }
}
