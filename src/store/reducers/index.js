import {
    combineReducers
} from 'redux'
import selectedDataReducer from './selectedReducer'
import staticDataReducer from './staticReducer'

export default combineReducers({
    selectedDataReducer,
    staticDataReducer
})