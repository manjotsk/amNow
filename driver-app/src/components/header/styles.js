import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { Metrics, Fonts } from '../../themes'
import { center } from '../../themes/globalStyles'

export default StyleSheet.create({
 container: {
    marginTop: getStatusBarHeight(),
    height: Metrics.HEIGHT*0.07,
    width: '100%',
    backgroundColor: "white",
    shadowColor: "#30c1dd",
    shadowRadius: 10,
    shadowOpacity: 0.4,
    elevation: 4,
    flexDirection: 'row'
},
 iconButton: {
    ...center,
    flex: 1
 },
 picker: {
    ...center,
    marginTop: Metrics.HEIGHT*-0.008,
    width: '60%'
 },
 icon: {
    color: '#666'
 },
 dropDown: {
    flex: 5,
    alignItems: 'flex-end',
    padding: 10
 },
 text: {
     fontSize: Fonts.moderateScale(15),
     color: '#666'
 }
})