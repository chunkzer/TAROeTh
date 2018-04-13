import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PetitionForm.css'
import PetitionMap from '../../../util/TaroEthSerializer.js'
import SelectBox from '../../select-box/SelectBox.js'

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
                        {title: 'Everything', iconClass: 'fa fa-arrows-alt'},
                        ];
    this.storageObjArray = [{title: 'Youtube', iconClass: 'fa fa-youtube'},
                            {title: 'IPFS',    iconClass: 'fa fa-cube'},
                            {title: 'SWARM',   iconClass: 'fa fa-bug'},
                          ];

    var initialState = {
      comments: '',
      topics: Object.assign(...this.topicObjArray.map(o => {return  {[o.title]: false}})),
      showcaseTopic: '',
      storageOptions: '',
      incentive: 0,
      formValid: false,
      formErrors: {},
      displayFormErrors: false,
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

  //(string _comments, bool[8] _topics, Topic _showcaseTopic, VideoStorageOptions _storageOption)
  handleSubmit() {
    this.validateFields();
  }

  submitForm() {
    if(this.state.formValid){
      this.TaroEth.methods.makePetition.cacheSend(this.state.comments,
                                                Object.values(this.state.topics),
                                                PetitionMap.topicObj[this.state.showcaseTopic].id,
                                                PetitionMap.rStorageOption[this.state.storageOption],
                                                {value: this.state.incentive});
    }else{
      this.setState(() => ({displayFormErrors: true}));
    }
  }


  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChange(event) {
     this.setState({[event.target.name]: event.target.value});
  }

  handleTopicClick(event, key, fave=false) {
    if(fave){
      this.setState((prevState) => ({topics: {...prevState.topics, [key]: true}}));
      this.setState(() => ({showcaseTopic: (this.state.showcaseTopic === key ? '' : key)}));
      event.stopPropagation();
    }else{
      if(!(Object.values(this.state.topics).includes(true))) {
        this.setState((prevState) => ({topics: {...prevState.topics, [key]: true}}));
        this.setState(() => ({showcaseTopic: key}));
      }else if(key !== this.state.showcaseTopic){
        this.setState((prevState) => ({topics: {...prevState.topics, [key]: !prevState.topics[key]}}));
      }
    }
  }

  handleStorageClick(title) {
    this.setState((prevState) => ({storageOptions: title}));
  }

  convertEth(eth) {
    return `${eth} USD`;
  }

  validateFields() {
    console.log('validateFields!')
    let fieldValidationErrors = {};
    if(typeof PetitionMap.topicObj[this.state.showcaseTopic] === "undefined"){
      fieldValidationErrors.topics = 'Please choose a favored topic to continue';
    }
    if(typeof PetitionMap.rStorageOption[this.state.storageOptions] === "undefined"){
      fieldValidationErrors.storageOptions = 'Please choose where you\'d like the video reading to be stored';
    }

    this.setState(() => ({formErrors: fieldValidationErrors}), this.validateForm)
  }

  validateForm(){
    let valid = (Object.keys(this.state.formErrors).length == 0 ? true : false)
    this.setState(() =>({formValid: valid}), this.submitForm)
  }

  render() {
    var topicBoxes = []
    this.topicObjArray.forEach((topic, index) => {topicBoxes.push
      (<span key={index}><SelectBox {...topic}
       selected={this.state.topics[topic.title]}
       faved={this.state.showcaseTopic === topic.title}
       onSelect={(e) => this.handleTopicClick(e, topic.title)}
       onFave={(e) => this.handleTopicClick(e, topic.title, true)}
     /></span>
   )})

    var storageBoxes = []
    this.storageObjArray.forEach((option, index) => {storageBoxes.push
      (<span key={index}><SelectBox {...option}
        selected={this.state.storageOptions === option.title}
        onSelect={() => this.handleStorageClick(option.title)}
      /></span>
    )})


    return (
      <div className="site-wrap">
        <form>
          <h1>What's on your mind?</h1>
          <label>Make sure to pick out ONE favored topic...</label>
          {this.state.displayFormErrors && this.state.formErrors.topics ? <div className="form-error">{this.state.formErrors.topics}</div> : ''}
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
          {this.state.displayFormErrors && this.state.formErrors.storageOptions ? <div className="form-error">{this.state.formErrors.storageOptions}</div> : ''}
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
    </div>
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
