import React from 'react'
import { View, Text } from 'react-native'
import Swipeout from 'react-native-swipeout';
import {connect} from 'react-redux'
import { Actions } from 'react-native-router-flux';

import { Color, Metrics } from '../../themes'
import styles from './styles'
import { InfiniteAnimation } from '../../animations' 
import { Header } from '../../components'
import { userApi } from '../../api/userApi';
import { driverApi } from '../../api/driverApi';
 
const swipeoutBtns = [
    {
      text: 'Accept',
      onPress: ()=>Actions.maps(),
      backgroundColor: Color.green
    },
    {
        text: 'Reject',
        onPress: ()=>alert('Hello'),
        backgroundColor: Color.red
    }
  ]

class Home extends React.Component {

    componentDidMount() {
        const {id, token} =this.props
        driverApi.saveToken(id, token)
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                buttonText = "Log Out"
                heading = "Home"
                onPress = {()=>userApi.logout()}
                />
                <View style={styles.swipeHeading}>
                    <Text style={styles.text}>Sr. No</Text>
                    <Text style={styles.text}>Location</Text>
                    <Text style={styles.text}>Distance</Text>
                </View>
                <Swipeout right={swipeoutBtns}>
                    <View style={styles.swipe}>
                        <Text style={styles.text}>1</Text>
                        <Text style={styles.text}>Elevate</Text>
                        <Text style={styles.text}>1 KM</Text>
                    </View>
                </Swipeout>
                <InfiniteAnimation source={'heartrate'} width={Metrics.WIDTH}/>
            </View>
        )
    }
}

const mapStateToProps =state=> ({
    id: state.user.response.user.uid,
    token: state.symptom.token
})

export default connect(mapStateToProps)(Home)