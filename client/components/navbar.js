import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div id="navbar">
    <div id="navbarGrid">
      <h1>Exquisite Corpse!</h1>
      <nav>
        <div>
          <img src="/images/brush.png" />
          <Link to="/home">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <img src="/images/brush.png" />
        </div>
      </nav>
    </div>
  </div>
)

export default Navbar
