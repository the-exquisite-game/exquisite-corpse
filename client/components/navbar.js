import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div id="navbar">
    <h1>Exquisite Corpse!</h1>
    <nav>
      {
        <div>
          <Link to="/home">Home</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
      }
    </nav>
  </div>
)

export default Navbar
