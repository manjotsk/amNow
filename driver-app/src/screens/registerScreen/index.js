import React from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ImageBackground
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import {connect} from 'react-redux'
import {Actions, ActionConst} from  'react-native-router-flux'

import { Loader } from '../../components'
import {Assets} from '../../themes'
import styles from './styles'
import {userApi} from '../../api/userApi'
import store from '../../store/store';
import { loginUserFailed } from '../../actions/userActions';


class RegisterScreen extends React.Component {

    componentDidMount() {
        if(this.props.response)
            Actions.maps()
    }

    state = {
        login: true
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    isRegister() {
        const {login} = this.state
        return(
            <View style={styles.link}>
                <Text style={styles.text}>{login?'Dont have ':'Already having'} account?</Text>
                <TouchableOpacity onPress={()=>this.setState({login: !this.state.login})}>
                    <Text style={styles.linkText}>
                        {login?'Register':'Login'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        console.log(this.props.message)
        return(
            <ImageBackground style={styles.container} source={Assets['background']}>
                {
                    this.state.login?
                        <View style={styles.subView}>
                            <Text style={styles.error}>{this.props.message}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}
                                placeholder='Email'
                                placeholderTextColor='black'
                                />
                            <TextInput
                                style={styles.input}
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                                placeholder='Password'
                                placeholderTextColor='black'
                                secureTextEntry
                                />
                            <TouchableOpacity
                                disabled={!this.state.email||!this.state.password}
                                onPress={()=>{
                                    const {email, password} = this.state
                                    if(!this.validateEmail(email))
                                        return store.dispatch(loginUserFailed('Email is not valid'))
                                    userApi.login(email, password)
                                }}
                                style={styles.button}
                                >
                                {this.props.loading?
                                <Loader
                                color = 'white'
                                size = {20}
                                show = {true}
                                />
                                :
                                <Text style={styles.text}>Login</Text>}
                            </TouchableOpacity>
                            <KeyboardSpacer/>
                            {this.isRegister()}
                        </View>:
                        <View style={styles.subView}>
                            <Text style={styles.error}>{this.props.message}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}
                                placeholder='Email'
                                placeholderTextColor='black'
                                autoCapitalize = 'none'
                                />
                            <TextInput
                                style={styles.input}
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                                placeholder='Password'
                                placeholderTextColor='black'
                                secureTextEntry
                                />
                            <TextInput
                                style={styles.input}
                                onChangeText={(password1) => this.setState({password1})}
                                value={this.state.password1}
                                placeholder='Retype Password'
                                placeholderTextColor='black'
                                secureTextEntry
                                />
                            <TouchableOpacity 
                                disabled={!this.state.email||!this.state.password||!this.state.password1}
                                onPress={()=>{
                                    const { email, password, password1 } = this.state
                                    password===password1?userApi.register(email, password):store.dispatch(loginUserFailed('Password Mismatch'))
                                }}
                                style={styles.button}
                                >
                                {this.state.loading?<ActivityIndicator color="white"/>:<Text style={styles.text}>Register</Text>}
                            </TouchableOpacity>
                            <KeyboardSpacer/>
                            {this.isRegister()}
                        </View>
                }
            </ImageBackground>
        )
    }
}

const mapStateToProps =state=> ({
    loading: state.user.loading,
    message: state.user.message,
    response: state.user.response
})

export default connect(mapStateToProps)(RegisterScreen)