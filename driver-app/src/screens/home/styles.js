import { StyleSheet } from 'react-native'

import { center } from '../../themes/globalStyles'
import { Metrics } from '../../themes'
 
export default StyleSheet.create({
    container: {
        ...center,
        height: Metrics.HEIGHT,
        width: Metrics.WIDTH
    },
    swipe: {
        ...center,
        width: Metrics.WIDTH,
        height: 40,
        flexDirection: 'row'
    },
    text: {
        flex: 1,
        paddingLeft: 10
    },
    swipeHeading: {
        ...center,
        flexDirection: 'row',
        paddingBottom: 5
    }
})