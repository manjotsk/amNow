import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'native-base'
import {Actions} from 'react-native-router-flux'
import moment from 'moment'

import styles from './styles'

export default class Header extends React.Component {

    state= {}

    render() {
        return(
            <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton} onPress={()=>Actions.drawerOpen()}>
                <Icon name='ios-menu' style={styles.icon}/>
            </TouchableOpacity>
            <View style={styles.dropDown}>
                <Text style={styles.text}>{moment().format('MMM DD')}</Text>
            </View>
            <View style={styles.iconButton}>
                <Icon name='md-calendar' style={styles.icon}/>
            </View>
            <View style={styles.iconButton}>
                <Icon name='md-more' style={styles.icon}/>
            </View>
            </View>
        )
    }
}