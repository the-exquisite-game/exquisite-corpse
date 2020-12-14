import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div id="navbar">
    <div id="navbarGrid">
      <h1 className="gradient-text">Exquisite Corpse!</h1>
      <nav>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
      </nav>
    </div>
  </div>
)

export default Navbar
