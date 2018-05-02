import React, { Component} from 'react'
import simpleSelectActions from './simple-select-boxes/ActionCreators.js'
import faveSelectActions from './fave-select-boxes/ActionCreators.js'
import SelectBox from './select-box/SelectBox.js'
import PropTypes from 'prop-types'
import _ from 'lodash'

class SelectBoxes extends Component{
  constructor(props, context){
    super(props)
    const {store} = context;
    this.store = store;
    switch(this.props.mode){
      case('simple'):
        this.actions = simpleSelectActions;
        this.reducer = 'SimpleSelectBox'
        break;
      case('fave'):
        this.actions = faveSelectActions;
        this.reducer = 'FaveSelectBox'
        break;
      default:
        this.actions = simpleSelectActions;
        break;
    }
  }

  selectedFN(id) {
    let store = this.store.getState().selectbox[this.reducer][this.props.category]
    switch(this.props.mode){
      case('simple'):
        return (() => store.selected === id)
      case('fave'):
        return (() => store.selected[id])
      case('multi'):
        return (() => store.selected[id])
      default:
        return (() => store.selected === id)

    }
  }

  initialState(mode){
    switch(mode){
      case('simple'): return null
      case('fave'): return (_.fill(Array(this.props.data.length), false))
      case('multi'): return (_.fill(Array(this.props.data.length), false))
      default: return null;
    }
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() =>
      this.forceUpdate()
    );

    let initialState = this.initialState(this.props.mode);
    this.store.dispatch(this.actions.mount(this.props.category, initialState))
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleSelect(id) {
    this.store.dispatch(this.actions.select(this.props.category, id))
  }

  handleFave(e, id) {
    if(this.props.mode === 'fave'){
      this.store.dispatch(this.actions.fave(this.props.category, id))
    }
    e.stopPropagation()
  }

  render(){
      let state = this.store.getState().selectbox[this.reducer][this.props.category];

    if(!state){
      return(
        <div>Fetching...</div>
      )
    }

    let boxes = [];
    this.props.data.forEach((option, index) => {boxes.push(
      <span key={index}>
        <SelectBox {...option}
            selected={this.selectedFN(index)()}
            onSelect={() => this.handleSelect(index)}
            faved={state.faved === index}
            onFave={this.props.mode === 'fave' ? (e) => this.handleFave(e, index) : false}/>
      </span>
    )})

    return (
      <div className="selector">
        {boxes}
      </div>
    )
  }
}

SelectBoxes.contextTypes = {
  store: PropTypes.object
}

export default SelectBoxes
