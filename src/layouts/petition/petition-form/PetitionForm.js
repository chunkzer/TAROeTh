import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PetitionForm.css'
import PetitionMap from '../../../util/TaroEthSerializer.js'
import SelectBox from '../../select-box/SelectBox.js'
import cardback from  '../../../assets/FullCard/cardback.jpg'
import axios from 'axios'
import utils from 'web3-utils'

class PetitionForm extends Component {
  constructor(props, context) {
    super(props);
    this.context = context;
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
      incentive: '0',
      formValid: false,
      formErrors: {},
      displayFormErrors: false,
      ethValue: ''
    }
    // Iterate over abi for correct function.
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    this.validateFields();
  }

  submitForm() {
    let TaroEth = this.context.drizzle.contracts.TaroEth
    let nonces = [Math.random(), Math.random(), Math.random(), Math.random()].map(n => Math.floor(n * 255))
    if(this.state.formValid){
      this.stackId = TaroEth.methods.makePetition.cacheSend(this.state.comments,
                                                Object.values(this.state.topics),
                                                PetitionMap.topicObj[this.state.showcaseTopic].id,
                                                PetitionMap.rStorageOption[this.state.storageOptions],
                                                nonces,
                                                {value: utils.toWei(this.state.incentive),
                                                gas: 6654755});

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
    return "$ " + (eth * this.state.ethValue) + " USD";
  }

  transactionStatus() {
    var drizzleState = this.context.drizzle.store.getState();

    if (drizzleState.transactionStack[this.stackId]) {
      this.txHash = drizzleState.transactionStack[this.stackId]
      return drizzleState.transactions[this.txHash].status
    }else{
      return '';
    }
  }

  getSpread() {
    let TaroEth = this.context.drizzle.contracts.TaroEth
    var drizzleState = this.context.drizzle.store.getState();
    let spread = drizzleState.transactions[this.txHash].receipt.events.NewPetition.returnValues.spread;
    return spread;
  }

  validateFields() {
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

  componentDidMount(){
    axios({
      url: "https://api.coinmarketcap.com/v1/ticker/ethereum/",
      method: 'get'
    }).then(response => {
      this.setState(() => ({ethValue: Number(response.data[0].price_usd) }))
    })
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
    var fullcard;
    if(this.state.showcaseTopic === ''){
      fullcard = (<div className="card-preview"><img src={cardback}></img></div>)
    }else{
      fullcard = (<div className="card-preview"><img src={PetitionMap.topicObj[this.state.showcaseTopic].fullcard}></img></div>)
    }

    var transactionStatus = this.transactionStatus();

    var major  = {card: cardback, byline: '', summary: ''};
    var minor1 = <img src={cardback}/>
    var minor2 = <img src={cardback}/>
    var minor3 = <img src={cardback}/>

    if(transactionStatus === 'success'){
      var spread = this.getSpread();
      major  = PetitionMap.fullcards[spread[0]]
      minor1 = <img src={PetitionMap.fullcards[spread[1]]}/>
      minor2 = <img src={PetitionMap.fullcards[spread[2]]}/>
      minor3 = <img src={PetitionMap.fullcards[spread[3]]}/>

    }


    return (
      <div className="site-wrap">

        <form className={"petition-form" + (transactionStatus !== '' ? ' hidden' : '')}>
          <div className="form-fields">
            <h2>What's on your mind?</h2>
            <label>Make sure to pick out ONE favored topic...</label>
            {this.state.displayFormErrors && this.state.formErrors.topics ? <div className="form-error">{this.state.formErrors.topics}</div> : ''}
            <div className="selector">
              {topicBoxes}
            </div>

            <h2>Would you mind sharing a little about yourself?</h2><br/>
            <label>
              This is optional so don't worry too much about it.
              <div>
                <textarea name="comments" value={this.state.comments} onChange={this.handleChange} rows="5" cols="70"/>
              </div>
            </label>

            <h2>Where do you want your reading stored?</h2>
            {this.state.displayFormErrors && this.state.formErrors.storageOptions ? <div className="form-error">{this.state.formErrors.storageOptions}</div> : ''}
              <div className="selector">
                {storageBoxes}
              </div>

          <h2>Consider adding an ETH incentive:</h2>
          <label>
            I might get around to a few 0 ETH petitions, but this is not my job y'know...
            <div className="eth-input">
              <input name="incentive" value={this.state.incentive} onChange={this.handleChange} type="number"/>
              {this.state.ethValue !== '' ? <span className="eth-usd">This comes around to: {this.convertEth(this.state.incentive)}</span> : ''}
            </div>
          </label>
          <button key="submit" className="pure-button" type="button" onClick={() => this.handleSubmit()}>Submit</button>
        </div>
        <div className="card-preview">
          {fullcard}
        </div>
      </form>

      <div className={'transaction-preview' + (transactionStatus === '' ? ' hidden' : '')}>
        <div className="spread-preview">
          <div className="top-preview">
            <div className="topic-preview">
              {fullcard}
            </div>
            <div className="reading-preview-text">
              <p>Success! Here are the cards in your spread: </p>
              <p>Your reading is focused on {this.state.showcaseTopic}</p>
              <p>Your spread is dominated by <b>{major.title}</b> </p>
              <p>{major.summary}</p>
              <p><i> - {major.byline}</i></p>
            </div>
            <div className="card-preview-major">
              <img src={major.card} />
            </div>
          </div>
          <div className="bottom-preview">
            <div className="card-preview-minor">
              {minor1}
            </div>
            <div className="card-preview-minor">
              {minor2}
            </div>
            <div className="card-preview-minor">
              {minor3}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

PetitionForm.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  debugger;
  return {
    contracts: state.contracts
  }
}

export default PetitionForm
