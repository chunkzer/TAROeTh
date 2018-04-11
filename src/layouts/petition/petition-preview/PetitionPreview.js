import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PetitionPreview.css'
import love from '../../../assets/PreviewCard/0.png'
import finance from '../../../assets/PreviewCard/1.png'
import success from '../../../assets/PreviewCard/2.png'
import health from '../../../assets/PreviewCard/3.png'
import work from '../../../assets/PreviewCard/4.png'
import fear from '../../../assets/PreviewCard/5.png'
import crypto from '../../../assets/PreviewCard/6.png'
import open from '../../../assets/PreviewCard/7.png'



class PetitionPreview extends Component {
  constructor(props, context) {
    super(props);
    const cardImageMap = {
      "Love": love,
      "Finance": finance,
      "Success": success,
      "Health": health,
      "Work": work,
      "Fear": fear,
      "Crypto": crypto,
      "Open": open,
    }

    const copyMap = {
      "Love": "Explorations of Love",
      "Finance": "Explorations of Finance",
      "Success": "Explorations of Success",
      "Health": "Explorations of Health",
      "Work": "Explorations of Work",
      "Fear": "Explorations onto Fears",
      "Crypto": "Explorations of Crypto",
      "Open": "Free form explorations",
    }
    this.cardImage = cardImageMap[this.props.showcaseTopic];
    this.topicCopy = copyMap[this.props.showcaseTopic];
  }

  handleClick() {
    console.log("Go To Petition with" + this.props.index);
  }

  render() {
    return (
    <li className="card" onClick={() => this.handleClick()}>
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
