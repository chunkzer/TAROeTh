import React, { Component } from 'react'
import { ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>T A R O e T h</h1>
          <p>Ethereum powered fortune telling</p>
        </div>
          <div className="pure-u-1-1">
            <h2>TaroEth</h2>
            <p>This is your own contract you are connecting to!.</p>
            <p><strong>minimumIncentive</strong>: <ContractData contract="TaroEth" method="minimumIncentive"  /></p>
            <br/><br/>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
