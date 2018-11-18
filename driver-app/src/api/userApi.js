import { Actions, ActionConst } from 'react-native-router-flux'


import store from '../store/store'
import { loginUserInitiated, loginUserSuccessful, loginUserFailed } from '../actions/userActions'
import firebase from './firebase' 

export const userApi = {

    register: (email, password) => {
        store.dispatch(loginUserInitiated())
        firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(user=>{
                            store.dispatch(loginUserSuccessful(user))
                            Actions.home({type: ActionConst.RESET})
                        })
                        .catch(err=> {
                            console.log('h')
                            loginUserFailed('Register Failed, Try Again')
                        })
    },
    login:(email, password) => {
        store.dispatch(loginUserInitiated())
        firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user=>{
                    store.dispatch(loginUserSuccessful(user))
                    Actions.home({type: ActionConst.RESET})
                })
                .catch(err=> store.dispatch(loginUserFailed('Login Failed, Try Again')))
    },
    logout:() => {
        firebase.auth().signOut()
        .then(()=> {
            Actions.register({type: ActionConst.RESET})
        })
        .catch(error=> {
            console.log(error)
        });
    }
}