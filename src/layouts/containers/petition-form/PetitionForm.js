import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PetitionForm.css'
import Serializer from '../../../util/TaroEthSerializer.js'
import Copy from '../../../util/SelectBoxCopy.js'
import cardback from  '../../../assets/FullCard/cardback.jpg'
import SpreadContainer from '../spread-container/SpreadContainer.js'
import SelectBoxes from '../select-boxes/SelectBoxes.js'
import axios from 'axios'
import utils from 'web3-utils'

class PetitionForm extends Component {
  constructor(props, context) {
    super(props);
    this.context = context;

    this.topicsCopy = Copy.topics;
    this.storageOptionsCopy = Copy.storageOptions;

    var initialState = {
      comments: '',
      incentive: '0',
      formValid: false,
      formErrors: {},
      displayFormErrors: false,
      ethValue: ''
    }
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
                                                            this.store.selected,
                                                            this.store.faved,
                                                            this.sStore.selected,
                                                            nonces,
                                                            {value: utils.toWei(this.state.incentive),
                                                            gas: 4254755});

    }else{
      this.setState(() => ({displayFormErrors: true}));
    }
  }

  handleChange(event) {
     this.setState({[event.target.name]: event.target.value});
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
    var drizzleState = this.context.drizzle.store.getState();
    let spread = drizzleState.transactions[this.txHash].receipt.events.NewPetition.returnValues.spread;
    return spread;
  }

  validateFields() {
    let fieldValidationErrors = {};
    if(typeof Serializer.topicObj[this.store.faved] === 'undefined'){
      fieldValidationErrors.topics = 'Please choose a favored topic to continue';
    }
    if(typeof Serializer.storageOption[this.sStore.selected] === "undefined"){
      fieldValidationErrors.storageOptions = 'Please choose where you\'d like the video reading to be stored';
    }

    this.setState(() => ({formErrors: fieldValidationErrors}), this.validateForm)
  }

  validateForm(){
    let valid = (Object.keys(this.state.formErrors).length === 0 ? true : false)
    this.setState(() =>({formValid: valid}), this.submitForm)
  }

  componentDidMount(){
    axios({
      url: "https://api.coinmarketcap.com/v1/ticker/ethereum/",
      method: 'get'
    }).then(response => {
      this.setState(() => ({ethValue: Number(response.data[0].price_usd) }))
    })

    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render() {
    this.reducerState = this.context.store.getState();
    this.store = this.reducerState.selectbox['FaveSelectBox'].topics;
    this.sStore = this.reducerState.selectbox['SimpleSelectBox'].storageOptions;


    this.topicCard = {title: 'cardback', card: cardback}
    if(this.store && this.store.faved !== '') {
      this.topicCard = Serializer.topicObj[this.store.faved];
    }

    let transactionStatus = this.transactionStatus();
    if(transactionStatus === 'success'){
      this.spread = this.getSpread();
    }

    return (
      <div className="site-wrap">
        <form className={"petition-form" + (transactionStatus !== '' ? ' hidden' : '')}>
          <div className="form-fields">
            <h2>What's on your mind?</h2>
            <label>Make sure to pick out ONE favored topic...</label>
            {this.state.displayFormErrors && this.state.formErrors.topics ? <div className="form-error">{this.state.formErrors.topics}</div> : ''}
            <div className="selector">
              <SelectBoxes category='topics' data={this.topicsCopy} mode='fave'/>
            </div>

            <h2>Would you mind sharing a little about yourself?</h2><br/>
            <label>
              This is optional so don't worry too much about it.
              <div>
                <textarea name="comments" value={this.state.comments} maxLength="500" onChange={this.handleChange} rows="5" cols="70"/>
              </div>
            </label>

            <h2>Where do you want your reading stored?</h2>
            {this.state.displayFormErrors && this.state.formErrors.storageOptions ? <div className="form-error">{this.state.formErrors.storageOptions}</div> : ''}
            <SelectBoxes category='storageOptions' data={this.storageOptionsCopy} mode='simple'/>

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
          <img alt={this.topicCard.title} src={this.topicCard.card}/>
        </div>
      </form>

      <div className={'transaction-preview' + (transactionStatus === '' ? ' hidden' : '')}>
        <SpreadContainer spread={this.spread} topic={this.topicCard} shareable={true} status={transactionStatus}/>
      </div>
    </div>
    )
  }
}

PetitionForm.contextTypes = {
  drizzle: PropTypes.object,
  store: PropTypes.object
}

export default PetitionForm
