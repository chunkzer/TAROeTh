import { combineReducers } from 'redux'
import FaveSelectBoxReducer from './fave-select-boxes/reducer.js'
// import MultiSelectBoxReducer from 'multi-select-boxes/reducer.js'
import SimpleSelectBoxReducer from './simple-select-boxes/reducer.js'

const SelectBoxReducer = combineReducers({
  SimpleSelectBox: SimpleSelectBoxReducer,
  FaveSelectBox: FaveSelectBoxReducer,
  // multiSelecttBox: MultiSelectBoxesReducer
})

export default SelectBoxReducer
