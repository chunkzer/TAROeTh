const initialState = {}

const SimpleSelectBoxReducer = (state = initialState, action) => {
  if (action.type === 'MOUNT_NEW_SIMPLE_SELECT_BOXES'){
    if(action.category in state){
      return {...state}
    }else {
      return {
        ...state,
        [action.category]: {
          selected: action.selected,
        }
      }
    }
  }
  if (action.type === 'SELECT_SIMPLE_SELECT_BOX'){
    if(state[action.category].selected !== action.selected){
      return {
        ...state,
        [action.category]: {
          selected: action.selected
        }
      }
    }else{
      return {
        ...state,
        [action.category]: {
          selected: null
        }
      }
    }
  }
  if (action.type === 'CLEAR_SIMPLE_SELECT_BOX'){
    return {
      ...state,
      [action.category]: {
        selected: null
      }
    }
  }
  return state
}

export default SimpleSelectBoxReducer
