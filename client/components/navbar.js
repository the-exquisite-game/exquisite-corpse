import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {logout} from '../store'

/* 
  Reminder: Clean up boilermaker code
*/

const Navbar = () => (
  <div id="navbar">
    <h1>Exquisite Corpse!</h1>
    <nav>
      {
        <div>
          <Link to="/home">Home</Link>
          <Link to="/home">Gallery</Link>
        </div>
      }
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
