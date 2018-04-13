import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PetitionMap from '../../../util/TaroEthSerializer.js'
import './PetitionPreview.css'

class PetitionPreview extends Component {
  constructor(props, context) {
    super(props);

    this.cardImage = PetitionMap.topicObj[this.props.showcaseTopic].previewImage;
    this.header = PetitionMap.topicObj[this.props.showcaseTopic].header;
  }

  handleClick() {
    console.log("Go To Petition with" + this.props.index);
  }

  render() {
    return (
    <li className="card" onClick={() => this.handleClick()}>
      <img className="card-header" src={this.cardImage}/>
      <div className="card-body">
        <h1 className="preview-topic">{this.header}</h1>
        <h1 className="stuff">Status: {this.props.status}</h1>
        <span>Incentive: <i>{this.props.incentive} ETH</i></span>
        <span>From:<i>{this.props.petitioner}</i></span>
      </div>
    </li>
    )
  }
}

export default PetitionPreview
