import React from 'react'
import {getUsers} from '../socket'

export class UsersBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const users = this.props.users || []
    return (
      <div className="indiv-user-sidebar">
        {users.map(username => (
          <div key={username.id}>
            <img src={username.icon} />
            {username.nickname}
          </div>
        ))}
      </div>
    )
  }
}
