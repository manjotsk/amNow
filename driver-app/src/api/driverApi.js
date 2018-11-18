import { Actions } from 'react-native-router-flux'
import firebase from './firebase'

import store from '../store/store'

const database = firebase.database()

export const driverApi = {
    addLocation: ()=> {
        database.ref('ambulance/-LRZnh7TL1odJKlHuDta').set({
            0: 0.5,
            1: 1
        })
    }
}