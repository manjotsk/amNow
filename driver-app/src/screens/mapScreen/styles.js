import { StyleSheet } from 'react-native'

import { Metrics } from '../../themes'
import { center } from '../../themes/globalStyles'

export default StyleSheet.create({
    container: {
        ...center,
        height: Metrics.HEIGHT,
        width: Metrics.WIDTH
    }
})