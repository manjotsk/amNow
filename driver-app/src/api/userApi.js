import { Actions } from 'react-native-router-flux'


import store from '../store/store'
import { loginUserInitiated, loginUserSuccessful, loginUserFailed } from '../actions/userActions'
import firebase from './firebase' 

export const userApi = {

    register: (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user=>console.log(user))
                .catch(err=> console.log(err))
    },
    login:(email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user=>console.log(user.user.email))
                .catch(err=> console.log(err))
    }
}