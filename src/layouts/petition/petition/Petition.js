import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import PetitionMap from '../../../util/TaroEthSerializer.js'
import PetitionPreview from '../petition-preview/PetitionPreview.js'
import '../petition-preview/PetitionPreview.css'
import './Petition.css'
import Moment from 'react-moment'


class Petition extends Component {
  constructor(props, context) {
    super(props);
    let TaroEth = context.drizzle.contracts.TaroEth;
    this.petitionIndex = String(this.props.params.id - 1);
    this.petitionKey = TaroEth.methods.getPetition.cacheCall(this.petitionIndex);

    this.getReading = TaroEth.methods.getReading;
  }

  castReadingData(data) {

  }

  castPetitionData(data) {
    let result = {};
    result.topics = data.topics.reduce( (topics, topic, index) => {
      if(topic) topics.push(PetitionMap.topic[index])
      return topics;
    }, []);
    result.showcaseTopic = PetitionMap.topic[data.showcaseTopic];
    result.incentive = data.incentive;
    result.storageOption = PetitionMap.storageOption[data.storageOption];
    result.status = PetitionMap.status[data.status];
    result.comments = data.comments;
    result.turnaround = new Date(data.turnaround * 1000);
    return result;
  }

  cancelPetition() {
    return true;
  }

  isCancellable(petition) {
    return false;
  }

  render() {
    var TaroEth = this.props.contracts.TaroEth
    if(!TaroEth.initialized) {
      return (
        <span>Initializing...</span>
      )
    }
    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(this.petitionKey in TaroEth.getPetition)) {
      return (
        <span>Fetching...</span>
      )
    }

    var petition = this.castPetitionData(TaroEth.getPetition[this.petitionKey].value);
    var topicsArr = []
    petition.topics.forEach( (topic, index) => topicsArr.push(<b key={index}>{topic}</b>))
    var reading;
    var readingSection;
    var cancelButton;
    var cancellableBy;

    if(petition.status === 'Fulfilled'){
      this.readingKey = this.getReading.cacheCall(this.petitionIndex);
      reading = TaroEth.getReading[this.readingKey].value;
      readingSection =  (
        <div className="reading-section">
          <div className="reading-commentary">
            <h1> Reading </h1>
            <p>{reading.commentary}</p>
          </div>
            <iframe  className="reading-video" src={reading.url} frameBorder="0" allowFullScreen></iframe>
        </div>
      )
    }else if(petition.status === 'Pending') {
      cancellableBy = (<li>Cancellable by: <b><Moment format="YYYY/MM/DD">{petition.turnaround}</Moment></b></li>)
      if(this.isCancellable(petition)){
        cancelButton = (
          <div>
            <button className="cancellation" onClick={() => this.cancelPetition()}> CANCEL </button><br/>
            <label>This will get your incentive back, though it won't refund gas fees...</label>
          </div>
        )
      }
    }

    //Take a look at this embed later...
    // reading = {url: 'https://www.youtube.com/embed/ohQPySWJToo', commentary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'};

    return (
      <div className="site-wrap container">
      <div className="petition-section">
        <div className="main-topic-img">
          <img src={PetitionMap.topicObj[petition.showcaseTopic].fullcard}/>
        </div>
        <div className="petition-info">
          <h1 className='topic'>
            {PetitionMap.topicObj[petition.showcaseTopic].header}
          </h1>
          <label>Topics: {topicsArr}</label>
          <ul>
            <li>Main topic requested: <b>{petition.showcaseTopic}</b> </li>
            <li>Petition Status:  <b>{petition.status}</b></li>
            <li>Incentive included: <b>{petition.incentive} ETH</b></li>
            {cancellableBy}

          </ul>
          <p className='comments'>
            {petition.comments}
          </p>
          { cancelButton }

        </div>
      </div>
      {readingSection}
      </div>
    )
  }
}

Petition.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(Petition, mapStateToProps)
