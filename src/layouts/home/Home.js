import React, { Component } from 'react'
import { ContractData } from 'drizzle-react-components'
import Petitions from '../petition/petitions/Petitions.js'
import PetitionForm from '../petition/petition-form/PetitionForm.js'

class Home extends Component {

  render() {

    return (
      <div>
        <main className="site-wrap">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Hello. This dApp let's you make a petition to receive a Tarot card reading. </h2>
              <p>2017 was a frenzied year for Ethereum. The promise of a quick ETH drawing all sorts of scams and opportunistic behavior. Though I'm sure many visitors might feel an automatic disdain for a premise as outrageous as "Blockchain Powered Fortune Telling" I want to assure you that it's not my intention to squeeze money out of the uninformed. </p>
              <p>Readings are not predictions of the future (and <b>DEFINITELY NOT FINNANCIAL ADVICE!</b>) but opportunities for reflection and invitations to lateral thinking. In this respect they are much like Brian Eno and Peter Schmidt's brillian <a href="http://oblicard.com">Oblique Strategies.</a> Archetypal information that we <b>work</b> to apply in ourselves and hopefully spur change and understanding.</p>
            </div>
          </div>
        </main>
        <Petitions method="getLastPetitions"/>
        {/* <Petitions method="getPetitionsByPetitioner" methodArgs={[this.props.accounts[0]]}/> */}
        <div className="site-wrap">
          <PetitionForm />
        </div>
      </div>
    )
  }
}

export default Home
