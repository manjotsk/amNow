import {combineReducers} from 'redux'

import UserReducer from './UserReducer'
import SymptomReducer from './SymptomReducer'

export default combineReducers({
    user: UserReducer,
    symptom: SymptomReducer 
})