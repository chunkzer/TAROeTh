import React, { Component } from 'react'
import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <footer>
      <div className="footer-p">
        <div className="dev-p">
        <h3>Devs: </h3>
        <p>This site was created primarily to get a real taste of dApp development. If you're interested in the process and lessons learned creating this site you can read more <a href="#">here</a></p>
        </div>

        <div className="regular-p">
          <h3>Regular folk:</h3>
          <p>Though the premise is ridiculous at it's face I'd like to invite skeptical and mocking individuals to read <a href="#">this</a> and appreciate some arguments in defense of this sort of 'fortune telling'. I hope you can find some fun and reflection here.</p>
        </div>
      </div>

      <div className="footer-icons">
        <a href="github.com/chunkzer"><i className="fa fa-github"></i></a>
        <a href="twitter.com/chunkzer"><i className="fa fa-twitter"></i></a>
      </div>
      </footer>


    )
  }
}

export default Footer
