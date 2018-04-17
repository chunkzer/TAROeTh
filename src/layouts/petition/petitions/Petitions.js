import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import PetitionPreview from '../petition-preview/PetitionPreview.js'
import _ from 'lodash'
import PetitionMap from '../../../util/TaroEthSerializer.js'
import '../petition-preview/PetitionPreview.css'
import utils from 'web3-utils'


/*
 * Create component.
 */

class Petitions extends Component {
  constructor(props, context) {
    super(props)
    let TaroEth = context.drizzle.contracts.TaroEth;

    const abi = TaroEth.abi;
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : [];

    this.dataKey = TaroEth.methods[this.props.method].cacheCall(...methodArgs);
    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === [this.props.method]) {
          this.fnABI = abi[i]
          break
      }
    }
  }

  castDisplayData(data) {

    var results = _.zip(...[data.petitioner, data.incentive, data.turnaround, data.status, data.showcaseTopic, data.storageOption, data.indexes])
    .map(arr => {var result = new Object
      result.petitioner = arr[0];
      result.incentive = utils.fromWei(arr[1]);
      let turnaround_date = new Date();
      turnaround_date.setSeconds(arr[2]);
      result.turnaround = turnaround_date;
      result.status = PetitionMap.status[arr[3]];
      result.showcaseTopic = PetitionMap.topic[arr[4]];
      result.storageOption = PetitionMap.storageOption[arr[5]];
      result.index = Number(arr[6]);
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
    if(!(this.dataKey in TaroEth[this.props.method])) {
      return (
        <span>Fetching...</span>
      )
    }

    var contractResponse = TaroEth[this.props.method][this.dataKey].value
    let petitions = this.castDisplayData(contractResponse)
    const displayObjectProps = []
    var filterFunctions = this.props.filters ? this.props.filters : [];

    var filteredPetitions = petitions.filter(petition => filterFunctions.reduce((status, f) => {
        if(status === false) return false;
        return f(petition);
      }, true)
    )

    filteredPetitions.forEach(function (petition, index) {
      displayObjectProps.push(<Link key={index} to={"/petition/" + (petition.index + 1)}><PetitionPreview {...petition}/></Link>)
    })

    const emptyMessage = displayObjectProps.length != petitions.length ? "There are no petitions matching..." : "There doesn't seem to be anything here...";

    return(
      <div>
        <ul className="cards">
          {displayObjectProps}
          {displayObjectProps.length === 0 ? <div>{emptyMessage}</div> : ''}
        </ul>
      </div>
    )
  }
}

Petitions.contextTypes = {
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

export default drizzleConnect(Petitions, mapStateToProps)
