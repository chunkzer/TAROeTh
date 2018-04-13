import React, { Component } from 'react'
import './Navbar.css'

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <header>T A R O e T h</header>
          <ul className="navbar-menu">
            <li>My Petitions</li>
            <li>All Petitions</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Navbar
