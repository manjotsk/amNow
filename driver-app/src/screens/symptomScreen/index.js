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

import { Header } from '../../components'

import { Loader } from '../../components'
import {Assets} from '../../themes'
import styles from './styles'
import { driverApi } from '../../api/driverApi';

class SymptomScreen extends React.Component {

    state = {
        searching: true,
        symptoms: ''
    }

    render() {
        return(
            <ImageBackground style={styles.container} source={Assets['background']}>
                <Header
                    buttonText = "Self Help"
                    heading = "Home"
                    onPress = {()=>Actions.symptom()}
                    />
                <View style={styles.subView}>
                    <Text style={styles.error}>{this.props.message}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(symptoms) => this.setState({symptoms})}
                        value={this.state.symptoms}
                        placeholder='Symptoms'
                        placeholderTextColor='black'
                        />
                    <TouchableOpacity
                        disabled={!this.state.symptoms}
                        onPress={()=>{
                            const {symptoms} = this.state
                            driverApi.getAid(symptoms.split(','))
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
                        <Text style={styles.text}>Submit</Text>}
                    </TouchableOpacity>
                    <KeyboardSpacer/>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps =state=> ({
    loading: state.symptom.loading
})

export default connect(mapStateToProps)(SymptomScreen)