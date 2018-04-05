import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PetitionPreview from './PetitionPreview.js'
import _ from 'lodash'
import PetitionMap from '../../util/TaroEthSerializer.js'
import './PetitionPreview.css'


/*
 * Create component.
 */

class LastPetitions extends Component {
  constructor(props, context) {
    super(props)
    let TaroEth = context.drizzle.contracts.TaroEth;
    // Get the contract ABI
    const abi = TaroEth.abi;
    // Fetch initial value from chain and return cache key for reactive updates.
    this.dataKey = TaroEth.methods.getLast5Petitions.cacheCall();
    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === 'getLast5Petitions') {
          this.fnABI = abi[i]
          break
      }
    }
  }

  castDisplayData(data) {
    var results = _.zip(...[data.petitioner, data.incentive, data.turnaround, data.status, data.topic, data.storageOption])
    .map(arr => {var result = new Object
      result.petitioner = arr[0];
      result.incentive = arr[1];
      let turnaround_date = new Date();
      turnaround_date.setSeconds(arr[2]);
      result.turnaround = turnaround_date;
      result.status = PetitionMap.state[arr[3]];
      result.topic = PetitionMap.topic[arr[4]];
      result.storageOption = PetitionMap.storageOption[arr[5]];
      return result;
    })
    return results;
  }

  render() {
    // Contract is not yet intialized.
    var TaroEth = this.props.contracts.TaroEth
    if(!TaroEth.initialized) {
      return (
        <span>Initializing...</span>
      )
    }
    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(this.dataKey in TaroEth.getLast5Petitions)) {
      return (
        <span>Fetching...</span>
      )
    }

    // Show a loading spinner for future updates.
    var pendingSpinner = TaroEth.synced ? '' : ' 🔄'
    // Optionally hide loading spinner (EX: ERC20 token symbol).
    var contractResponse = TaroEth.getLast5Petitions[this.dataKey].value
    let petitions = this.castDisplayData(contractResponse)

    const displayObjectProps = []
    petitions.forEach(function (petition, index) {
    displayObjectProps.push(<li key={index}><PetitionPreview {...petition}/></li>)
  })

    return(
      <div>
        <h2 className="section-header">Latest Petitions:</h2>
        <ul className="cards">
          {displayObjectProps}
        </ul>
      </div>
    )
  }
}

LastPetitions.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(LastPetitions, mapStateToProps)
