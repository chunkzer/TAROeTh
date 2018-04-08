import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PetitionPreview.css'
import love from '../../assets/PreviewCard/0.png'
import finance from '../../assets/PreviewCard/1.png'
import success from '../../assets/PreviewCard/2.png'
import health from '../../assets/PreviewCard/3.png'
import work from '../../assets/PreviewCard/4.png'
import danger from '../../assets/PreviewCard/5.png'
import crypto from '../../assets/PreviewCard/6.png'
import open from '../../assets/PreviewCard/7.png'



class PetitionPreview extends Component {
  constructor(props, context) {
    super(props);
    const cardImageMap = {
      "Love": love,
      "Finance": finance,
      "Success": success,
      "Health": health,
      "Work": work,
      "Danger": danger,
      "Crypto": crypto,
      "Open": open,
    }

    const copyMap = {
      "Love": "Looking for that LOVE",
      "Finance": "Keep your finances balanced",
      "Success": "Looking for the path to success",
      "Health": "Health and hearth",
      "Work": "Work! Work! Work!",
      "Danger": "What danger lies ahead and what danger lies inside?",
      "Crypto": "HODL. SODL. Cryptic Crypto questions...",
      "Open": "An Open Petition, let the cards say what they may...",
    }
    this.cardImage = cardImageMap[this.props.topic];
    this.topicCopy = copyMap[this.props.topic];
  }

  render() {
    return (
    <li className="card">
      <img className="card-header" src={this.cardImage}/>
      <div className="card-body">
        <h1 className="preview-topic">{this.topicCopy}</h1>
        <h1 className="stuff">Status: {this.props.status}</h1>
        <span>Incentive: <i>{this.props.incentive} ETH</i></span>
        <span>From:<i>{this.props.petitioner}</i></span>
      </div>
    </li>
    )
  }
}

export default PetitionPreview
