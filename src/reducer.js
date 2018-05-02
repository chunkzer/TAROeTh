import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import SelectBoxReducer from './layouts/containers/select-boxes/SelectBoxReducer.js'

const reducer = combineReducers({
  routing: routerReducer,
  selectbox: SelectBoxReducer
})

export default reducer
