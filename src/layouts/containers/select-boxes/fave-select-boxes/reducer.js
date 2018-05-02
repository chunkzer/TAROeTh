const initialState = {}
import * as R from 'ramda'

const FaveSelectBoxReducer = (state = initialState, action) => {
  if (action.type === 'MOUNT_NEW_FAVE_SELECT_BOXES'){
    if(action.category in state){
      return {
        ...state
      }
    }else {
      return {
        ...state,
        [action.category]: {
          selected: action.selected,
          faved: ''
        }
      }
    }
  }
  if (action.type === 'SELECT_FAVE_SELECT_BOX'){
    if(!state[action.category].selected.includes(true)){
      return {
        ...state,
        [action.category]: {
          selected: R.adjust((i) => !i, action.id, state[action.category].selected),
          faved: action.id
        }
      }
    }else {
      if(state[action.category].faved !== action.id){
        return {
          ...state,
          [action.category]: {
            selected: R.adjust((i) => !i, action.id, state[action.category].selected),
            faved: state[action.category].faved
          }
        }
      }else{
        return state;
      }
    }
  }
  if (action.type === 'FAVE_FAVE_SELECT_BOX'){
    return {
      ...state,
      [action.category]: {
        selected: R.adjust((i) => true, action.id, state[action.category].selected),
        faved: action.id
      }
    }
  }
  if (action.type === 'CLEAR_FAVE_SELECT_BOX'){
    return {
      ...state,
      [action.category]: {
        selected: state[action.category].selected.map(i => false),
        faved: ''
      }
    }
  }

  return state
}

export default FaveSelectBoxReducer
