import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Drawing, Home, PartyRoom} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/home" component={Home} />
        <Route path="/partyroom/:room" component={PartyRoom} />
        <Route path="/drawing/:room" component={Drawing} />
        {/* Displays our Home component as a fallback */}
        <Route component={Home} />
      </Switch>
    )
  }
}

export default Routes
