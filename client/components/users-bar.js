import React from 'react'
import {getUsers} from '../socket'

export class UsersBar extends React.Component {
  constructor() {
    super()
    this.state = {
      users: ['mox', 'mer']
    }
  }
  // componentDidMount() {
  //   getUsers((usersArr) =>
  //     this.setState({
  //       users: usersArr,
  //     })
  //   )
  // }
  render() {
    const users = this.state.users
    return (
      <div>{users.map(username => <div key={username}>{username}</div>)}</div>
    )
  }
}
