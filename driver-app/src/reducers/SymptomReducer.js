import {
    GET_AID_INITIATED,
    GET_AID_FAILED,
    GET_AID_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    loading: false,
    message: '',
    response: null,
    token: null
}

export const saveToken =token=>({
    type: SAVE_TOKEN,
    token
})

const SAVE_TOKEN = 'SAVE_TOKEN'

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
        
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.token
            }

        default:
        return state
    }
}