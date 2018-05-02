import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { serializePetition } from '../../../util/TaroEthSerializer.js'
import './Petition.css'
import SpreadContainer from '../spread-container/SpreadContainer.js'
import Interpretation from '../../components/interpretation/Interpretation.js'
import PetitionAdmin from '../../components/petition-admin/PetitionAdmin.js'
import PetitionInfo from '../../components/petition-info/PetitionInfo.js'


class Petition extends Component {
  constructor(props, context) {
    super(props);
    let TaroEth = context.drizzle.contracts.TaroEth;
    this.petitionIndex = String(this.props.params.id - 1);
    this.petitionKey = TaroEth.methods.getPetition.cacheCall(this.petitionIndex);
    this.readingKey = TaroEth.methods.getReading.cacheCall(this.petitionIndex);
    this.ownerKey = TaroEth.methods.owner.cacheCall();
    this.serializePetition = serializePetition;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.cancelPetition= this.cancelPetition.bind(this);

    this.state = {
      url: '',
      commentary: ''
    };

  }

  cancelPetition() {
    let TaroEth = this.context.drizzle.contracts.TaroEth
    this.stackId = TaroEth.methods.cancelPetition.cacheSend(this.petitionIndex, {gas: 6654755});
  }

  isCancellable(petition) {
    return (petition.turnaround < new Date());
  }

  handleSubmit() {
    let TaroEth = this.context.drizzle.contracts.TaroEth;
    this.stackId = TaroEth.methods.updateReading.cacheSend(this.state.url, this.state.commentary, this.petitionIndex, {gas: 6654755});
  }

  handleChange(event) {
     this.setState({[event.target.name]: event.target.value});
  }

  render() {

    var TaroEth = this.props.contracts.TaroEth
    if(!TaroEth.initialized) {
      return (
        <span>Fetching Contract...</span>
      )
    }

    if(!(this.petitionKey in TaroEth.getPetition)) {
      return (
        <div className="site-wrap">
          <span className="fetching">Fetching Petition...</span>
        </div>
      )
    }

    if((TaroEth.getPetition[this.petitionKey].value.turnaround === '0' )) {
      return (
        <div className="site-wrap">
          <span className="fetching">Invalid Petition Id provided...</span>
        </div>
      )
    }

    let petition = this.serializePetition(TaroEth.getPetition[this.petitionKey].value);
    let reading = TaroEth.getReading[this.readingKey] ? TaroEth.getReading[this.readingKey].value : '';
    let owner = TaroEth.owner[this.ownerKey] ? TaroEth.owner[this.ownerKey].value : '';
    let topics = petition.topics.map(t => t.title).join(',')

    return (
      <div className="site-wrap container">
        <PetitionInfo topicCard={petition.topicData} topics={topics} petition={petition} cancellable={this.isCancellable(petition)} cancelFn={this.cancelPetition}/>
        {reading ? <div className="petition-reading-section">
                    <div className="petition-reading-spread">
                      <SpreadContainer spread={reading.spread} topic={petition.topicData} shareable={false} status='success'/>
                      {petition.status === 'Fulfilled' ? <Interpretation {...reading}/> : ''}
                    </div>
                  </div> : ''

        }
        {
          this.props.accounts[0] === owner ?  <PetitionAdmin url={this.state.url}
                                               commentary={this.state.commentary}
                                               onChange={this.handleChange}
                                               onSubmit={this.handleSubmit}/> : ''
        }
      </div>
    )
  }
}

Petition.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
    accounts: state.accounts
  }
}

export default drizzleConnect(Petition, mapStateToProps)
