import React, { Component } from 'react'
import Petitions from '../petitions/Petitions.js'
import SelectBoxes from '../select-boxes/SelectBoxes.js'
import Copy from '../../../util/SelectBoxCopy.js'
import PropTypes from 'prop-types'
import '../petition-form/PetitionForm.css'
import { drizzleConnect } from 'drizzle-react'


class PetitionsContainer extends Component {
  constructor(props, context) {
    super(props);

    const ContainerTypes = ['Self', 'All', 'Address', '404'];
    this.context  = context;

    switch(true) {
      case (this.props.params.modifier ==='me'):
          this.petitionsArgs   = [this.props.accounts[0]];
          this.petitionsMethod = 'getPetitionsByPetitioner';
          this.containerType = ContainerTypes[0];
          break;
      case (this.props.params.modifier ==='all'):
          this.petitionsArgs   = [];
          this.petitionsMethod = 'getAllPetitions';
          this.containerType = ContainerTypes[1];
          break;
      case (this.props.params.modifier.slice(0,2) === "0x"):
          this.petitionsArgs   = [this.props.params.modifier];
          this.petitionsMethod = 'getPetitionsByPetitioner';
          this.containerType = ContainerTypes[2];
          break;
      default:
          this.petitionsArgs   = [];
          this.petitionsMethod = 'getAllPetitions';
          this.containerType = ContainerTypes[3];
    }

    this.filtersCopy = Copy.filters;
  }

  componentDidMount(){
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  onlyStatusFilter(petition, status) {
    return petition.status === status;
  }
  //Will Pending Readings where turnaround time has expired
  onlyExpired(petition) {
    if(petition.status !== 'Pending') return false;
    let now = new Date();
    return (petition.turnaround < now);
  }

  onlyAddress(petition, address) {
    return petition.petitioner === address;
  }

  filteringFNs() {
    let papply = (f, b) => a => f(a, b);
    return {
       null:  (x) => true,
      'All': (x) => true,
       0: papply(this.onlyStatusFilter, 'Fulfilled'),
       1: papply(this.onlyStatusFilter, 'Pending'),
       2: this.onlyExpired,
       3: papply(this.onlyStatusFilter, 'Cancelled'),
      'me': papply(this.onlyAddress, this.props.accounts[0]),
      'Self': (x) => true,
      'Address': papply(this.onlyAddress, this.props.params.modifier)
    }
  }

  render () {

    let filteringFNs = this.filteringFNs();
    this.state = this.context.store.getState().selectbox['SimpleSelectBox'];
    let filterFuncArr = this.state.filters ? [filteringFNs[this.state.filters.selected], filteringFNs[this.containerType]] : [filteringFNs[this.containerType]];
    return (
      <div className="site-wrap">
        <SelectBoxes mode="simple" data={this.filtersCopy} category="filters"/>
        <Petitions method={this.petitionsMethod} methodArgs={this.petitionsArgs} filters={filterFuncArr}/>
      </div>
    )
  }
}

PetitionsContainer.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
  }
}


export default drizzleConnect(PetitionsContainer, mapStateToProps)
