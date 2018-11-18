import {
    GET_AID_INITIATED,
    GET_AID_FAILED,
    GET_AID_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    loading: false,
    message: '',
    response: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case GET_AID_INITIATED:
            return {
                ...state,
                loading: true,
                message: ''
            }
        
        case GET_AID_FAILED:
            return {
                ...state,
                loading: false,
                message: action.message
            }

        case GET_AID_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }

        default:
        return state
    }
}