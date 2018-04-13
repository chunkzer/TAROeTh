import React, { Component } from 'react'
import './Navbar.css'
import {Link} from 'react-router'

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <header>T A R O e T h</header>
          <ul className="navbar-menu">
            <li><Link to="/petitions/me"> My Petitions</Link></li>
            <Link to="/petitions/all"> <li>All Petitions</li></Link>
          </ul>
        </div>
      </div>
    )
  }
}

export default Navbar
