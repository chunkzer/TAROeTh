import React from 'react'
import './Navbar.css'
import {Link} from 'react-router'

const Navbar = () => {
  return (
    <div>
      <div className="header">
        <Link to={process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/'}><header>T A R O e T h</header></Link>
        <ul className="navbar-menu">
          <Link to={process.env.PUBLIC_URL + "/petitions/me" }><li> My Petitions</li></Link>
          <Link to={process.env.PUBLIC_URL + "/petitions/all"}> <li>All Petitions</li></Link>
          <Link to={process.env.PUBLIC_URL + "/about/"}> <li>FAQ</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
