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

class SymptomScreen extends React.Component {

    state = {
        searching: true
    }

    render() {
        console.log(this.props.message)
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
                            alert('h')
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

})

export default connect(mapStateToProps)(SymptomScreen)