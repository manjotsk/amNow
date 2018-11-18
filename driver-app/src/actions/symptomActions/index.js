import {
    GET_AID_FAILED,
    GET_AID_INITIATED,
    GET_AID_SUCCESS
} from '../types'

export const aidInitiated =()=> ({
    type: GET_AID_INITIATED
})

export const loginUserFailed =message=> ({
    type: GET_AID_FAILED,
    message
})

export const loginUserSuccessful =payload=> ({
    type: GET_AID_SUCCESS,
    payload
})