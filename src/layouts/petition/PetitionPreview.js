import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PetitionPreview.css'
import love from '../../assets/preview-cards/Love-card.png'
import finance from '../../assets/preview-cards/Finance-card.png'
import success from '../../assets/preview-cards/Success-card.png'



class PetitionPreview extends Component {
  constructor(props, context) {
    super(props);
    const cardImageMap = {
      "Love": love,
      "Finance": finance,
      "Success": success,
    }
    this.cardImage = cardImageMap[this.props.topic];
  }

  render() {
    return (
    <div className="card">
      <div className="card-topic">
        <img src={this.cardImage}/>
        <div className="card-title">
          <h1>{this.props.topic}</h1>
          <button className="button "><i className="fa fa-eye"/></button>
        </div>
      </div>
      <div className="card-body">
        <p>Status: {this.props.status}</p>
        <p>Incentive: {this.props.incentive} ETH</p>
        <p>From:<i>{this.props.petitioner}</i></p>
      </div>
    </div>
    )
  }
}

export default PetitionPreview
