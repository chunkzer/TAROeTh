import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import PetitionPreview from '../../components/petition-preview/PetitionPreview.js'
import { serializePetitions, topicObjectMap } from '../../../util/TaroEthSerializer.js'


/*
 * Create component.
 */

class Petitions extends Component {
  constructor(props, context) {
    super(props)
    let TaroEth = context.drizzle.contracts.TaroEth;
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : [];
    this.serializePetitions = serializePetitions;
    this.topicObjectMap = topicObjectMap;
    this.dataKey = TaroEth.methods[this.props.method].cacheCall(...methodArgs);
  }

  render() {
    // Contract is not yet intialized.
    let TaroEth = this.props.contracts.TaroEth
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

    let contractResponse = TaroEth[this.props.method][this.dataKey].value
    let petitions = this.serializePetitions(contractResponse);
    const displayObjectProps = []

    let filterFunctions = this.props.filters ? this.props.filters : [];
    let filteredPetitions = petitions.filter(petition => filterFunctions.reduce((status, f) => {
        if(status === false) return false;
        return f(petition);
      }, true)
    )
    filteredPetitions.forEach(function (petition, index) {
      displayObjectProps.push(<Link key={index} to={process.env.PUBLIC_URL + "/petition/" + (petition.index + 1)}><PetitionPreview {...petition} /></Link>)
    })

    const emptyMessage = displayObjectProps.length !== petitions.length ? "There are no petitions matching..." : "There doesn't seem to be anything here...";

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
