import { Actions } from 'react-native-router-flux'
import firebase from './firebase'
import {API_HOST} from 'react-native-dotenv'
import axios from 'axios'

import store from '../store/store'
import { aidInitiated } from '../actions/symptomActions';

const database = firebase.database()

export const driverApi = {
    addLocation: (id, latitude, longitude)=> {
        database.ref(`ambulance/${id}/coordinates`).set({
            0: latitude,
            1: longitude
        })
    },
    saveToken: (id, token) =>{
        database.ref(`ambulance/${id}/pushtoken`).set({
            token: token
        })
    },
    getAid: (symptoms) => {
        store.dispatch(aidInitiated())
        return axios({
            method: 'post',
            url: `${API_HOST}/ml`,
            timeout: 15000
            })
            .then(response => {
                console.log(response)
            }).catch(err=> {
                console.log(err)
            })
    }
}