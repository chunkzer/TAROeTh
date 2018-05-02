import React, {Component} from 'react'
import {fullcardMap} from '../../../util/TaroEthSerializer.js'
import cardback from  '../../../assets/FullCard/cardback.jpg'
import Spread from '../../components/spread/Spread.js'

class SpreadContainer extends Component {
  constructor(props){
    super(props);
    this.fullcardMap = fullcardMap;
  }

  render() {
    const {spread} = this.props
    if(!spread){
      let major  = {card: cardback, title: 'cardback', byline: '', summary: '', twttr_url: ''};
      let minor1 = {card: cardback, title: 'cardback', twttr_url: ''}
      let minor2 = {card: cardback, title: 'cardback', twttr_url: ''}
      let minor3 = {card: cardback, title: 'cardback', twttr_url: ''}
      this.spread = {major: major, minors: [minor1, minor2, minor3]}
    }else{
      let cards = spread.map(c => this.fullcardMap[c])
      this.spread = {major: cards[0], minors: [cards[1], cards[2], cards[3]]}
    }

    return(
      <Spread {...this.spread} {...this.props}/>
    )
  }
}

export default SpreadContainer
