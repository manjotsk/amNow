import React from 'react'
import { View, Text } from 'react-native'
import Swipeout from 'react-native-swipeout';

import { Color } from '../../themes'
import styles from './styles'

var swipeoutBtns = [
    {
      text: 'Accept',
      onPress: ()=>alert('Hello'),
      backgroundColor: Color.green
    },
    {
        text: 'Reject',
        onPress: ()=>alert('Hello'),
        backgroundColor: Color.red
    }
  ]

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
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
            </View>
        )
    }
}

export default Home