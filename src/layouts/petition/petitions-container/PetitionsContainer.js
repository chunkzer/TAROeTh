import React, { Component } from 'react'
import {Redirect} from 'react-router'
import Petitions from '../petitions/Petitions.js'
import SelectBox from '../../select-box/SelectBox.js'
import PetitionForm from '../petition-form/PetitionForm.js'
import '../petition-form/PetitionForm.css'
import { drizzleConnect } from 'drizzle-react'


class PetitionsContainer extends Component {
  constructor(props, context) {
    super(props);

    const ContainerTypes = ['Self', 'All', 'Address', '404'];


    switch(true) {
      case (this.props.params.modifier =='me'):
          this.containerType = ContainerTypes[0];
          break;
      case (this.props.params.modifier =='all'):
          this.containerType = ContainerTypes[1];
          break;
      case (this.props.params.modifier.slice(0,2) === "0x"):
          this.containerType = ContainerTypes[2];
          break;
      default:
          this.containerType = ContainerTypes[3];
    }

    this.filterObjArray=[{title: 'Fulfilled',   iconClass: 'fa fa-heart'},
                        {title:  'Pending',     iconClass: 'fa fa-money'},
                        {title:  'Expired',     iconClass: 'fa fa-trophy'},
                        {title:  'Cancelled',   iconClass: 'fa fa-medkit'},
                        ];

    this.state = {
      statusFilter: '',
    }

  }

  handleClick(key){
    this.setState((prevState) => ({statusFilter: key === prevState.statusFilter ? '' : key}));
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

  render () {
    let papply = (f, b) => a => f(a, b);

    var filterFuncObj = {
      '':  (x) => true,
      'All': (x) => true,
      'Fulfilled': papply(this.onlyStatusFilter, 'Fulfilled'),
      'Pending': papply(this.onlyStatusFilter, 'Pending'),
      'Cancelled': papply(this.onlyStatusFilter, 'Cancelled'),
      'Expired': this.onlyExpired,
      'me': papply(this.onlyAddress, this.props.accounts[0]),
      'Self': (x) => true,
      'Address': papply(this.onlyAddress, this.props.params.modifier)
    }


    var filterBoxes = []

    var filterFuncArr = [filterFuncObj[this.state.statusFilter], filterFuncObj[this.containerType]]

    this.filterObjArray.forEach((filter, index) => {filterBoxes.push
      (<span key={index}><SelectBox {...filter}
        selected={this.state.statusFilter === filter.title}
        onSelect={(e) => this.handleClick(filter.title)}
     /></span>
   )})

    return (
      <div className="site-wrap">
        <h1>My Petitions</h1>
        <label>Filter for Status:</label>
        <div className="selector">
          {filterBoxes}
        </div>
        <Petitions method="getLastPetitions" filters={filterFuncArr}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
  }
}


export default drizzleConnect(PetitionsContainer, mapStateToProps)