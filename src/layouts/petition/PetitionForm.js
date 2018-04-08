import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PetitionForm.css'
import SelectBox from '../select-box/SelectBox.js'
import ipfs from '../../assets/ipfs.ico'

class PetitionForm extends Component {
  constructor(props, context) {
    super(props);
    this.TaroEth = context.drizzle.contracts.TaroEth
    this.topicObjArray = [{title: 'Love',     iconClass: 'fa fa-heart'},
                        {title: 'Finance',    iconClass: 'fa fa-money'},
                        {title: 'Success',    iconClass: 'fa fa-trophy'},
                        {title: 'Health',     iconClass: 'fa fa-medkit'},
                        {title: 'Work',       iconClass: 'fa fa-briefcase'},
                        {title: 'Fear',       iconClass: 'fa fa-heartbeat'},
                        {title: 'Crypto',     iconClass: 'fa fa-bitcoin'},
                        {title: 'Everything', iconClass: 'fa fa-star'},
                        ];
    this.storageObjArray = [{title: 'Youtube', iconClass: 'fa fa-youtube'},
                            {title: 'IPFS',    iconClass: 'fa fa-cube'},
                            {title: 'SWARM',   iconClass: 'fa fa-bug'},
                          ];

    var initialState = {
      topics: Object.assign(...this.topicObjArray.map(o => {return  {[o.title]: false}})),
      storageOptions: '',
      comments: '',
      incentive: 0,
    }


    // Get the contract ABI
    const abi = this.TaroEth.abi;
    this.inputs = [];

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
        if (abi[i].name === "makePetition") {
            this.inputs = abi[i].inputs;
            for (var i = 0; i < this.inputs.length; i++) {
                initialState[this.inputs[i].name] = '';
            }
            break;
        }
    }

    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    this.TaroEth.methods.MakePetition.cacheSend(...Object.values(this.state));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChange(event) {
     debugger;
     this.setState({[event.target.name]: event.target.value});
  }

  handleTopicClick(key) {
    this.setState((prevState) => ({topics: {...prevState.topics, [key]: !prevState.topics[key]}}));
  }

  handleStorageClick(title) {
    this.setState((prevState) => ({storageOptions: title}));
  }

  convertEth(eth) {
    return `${eth} USD`;
  }

  render() {
    var topicBoxes = []
    this.topicObjArray.forEach(topic => {topicBoxes.push(<SelectBox {...topic} selected={this.state.topics[topic.title]} onClick={() => this.handleTopicClick(topic.title)}/>)})

    var storageBoxes = []
    this.storageObjArray.forEach(option => {storageBoxes.push(<SelectBox {...option} selected={this.state.storageOptions === option.title} onClick={() => this.handleStorageClick(option.title)}/>)})


    return (
      <form>
        <h1>What's on your mind?</h1>
        <div className="selector">
          {topicBoxes}
        </div>

        <h1>Would you mind sharing a little about yourself?</h1><br/>
        <label>
          This is optional so don't worry too much about it.
          <div>
            <textarea name="comments" value={this.state.comments} onChange={this.handleChange} rows="5" cols="70"/>
          </div>
        </label>

        <h1>Where do you want your reading stored?</h1>
          <div className="selector">
            {storageBoxes}
          </div>

        <h1>Finally I'd like to ask you to add a little ETH incentive</h1>
        <label>
          I might get around to a few 0 ETH petitions, but this is not my job y'know...
          <div className="eth-input">
            <input name="incentive" value={this.state.incentive} onChange={this.handleChange} type="number"/>
            <span className="eth-usd">This comes around to: {this.convertEth(this.state.incentive)}</span>
          </div>
        </label>
        <button key="submit" className="pure-button" type="button" onClick={() => this.handleSubmit()}>Submit</button>
      </form>
    )
  }
}

PetitionForm.contextTypes = {
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

export default drizzleConnect(PetitionForm, mapStateToProps)
