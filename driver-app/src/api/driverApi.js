import { Actions } from 'react-native-router-flux'
import firebase from './firebase'
import {API_HOST} from 'react-native-dotenv'
import axios from 'axios'

import store from '../store/store'

const database = firebase.database()

export const driverApi = {
    addLocation: (id, latitude, longitude)=> {
        database.ref(`ambulance/${id}/coordinates`).set({
            0: latitude,
            1: longitude
        })
    },
    getAid: () => {
        
    }
}