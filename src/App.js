import React, { Component } from 'react'
import Navbar from './layouts/components/navbar/Navbar'
import Footer from './layouts/components/footer/Footer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default App
