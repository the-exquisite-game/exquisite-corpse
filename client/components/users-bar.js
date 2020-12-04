import React from 'react'
import {getUsers} from '../socket'

export class UsersBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const users = this.props.users || []
    return (
      <div>
        {users.map(username => (
          <div key={username.id}>{username.nickname}</div>
        ))}
      </div>
    )
  }
}
