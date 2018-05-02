import React, {Component} from 'react'


class AdminPanel extends Component {
  constructor(props) {
    this.state {
      turnaround: '',
      minimumIncentive: 0
    }
  }

  withdraw() {
      let TaroEth = this.context.drizzle.contracts.TaroEth;
      this.stackId = TaroEth.methods.withdraw.cacheSend({gas: 6654755});
    }

  modifyConstraints(){
    let TaroEth = this.context.drizzle.contracts.TaroEth;
    this.stackId = TaroEth.methods.withdraw.cacheSend({gas: 6654755});
  }

  render() {

    return(
    <div className='site-wrap'>
      <button className='withdraw' onClick={() => this.withdraw()}> Withdraw Unlocked Balance </button><br/>
      <label>This will withdraw any unlocked balance from the contract.</label>
    </div>
    )
  }
}
