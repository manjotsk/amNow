import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { TouchableOpacity, View, Text } from 'react-native';
import {connect} from 'react-redux'
import MapViewDirections from 'react-native-maps-directions';

import { Assets } from '../../themes'

import { Header } from '../../components'

import { InfiniteAnimation } from '../../animations'
import { Location, Permissions } from 'expo';
import styles from './styles';
import { driverApi } from '../../api/driverApi'

const GOOGLE_MAPS_APIKEY = 'AIzaSyCESqye_Jcvhd1xtrOYphGDqXbvQnKaxck';


class MapScreen extends React.Component {

    state = {

    }

    componentDidMount () {
        this._getLocationAsync()
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            locationResult: 'Permission to access location was denied',
          })
        } else {
          this.setState({ hasLocationPermissions: true })
        }
     
        const location = await Location.watchPositionAsync({
            enableHighAccuracy: true,
            distanceInterval: 3
          }, newLocation=>{
            this.setState({locationResult:newLocation})
            console.log(newLocation)
            driverApi.addLocation(this.props.id, newLocation.coords.latitude, newLocation.coords.longitude )
          })
       }

  render() {
      console.log(this.props.id)
    return (
      <React.Fragment>
        <Header
                    buttonText = "Self Help"
                    heading = "Home"
                    onPress = {()=>Actions.symptom()}
                    />
        {this.state.locationResult?
        <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.locationResult.coords.latitude,
          longitude: this.state.locationResult.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {[
          {
            latlng: {
              latitude: this.state.locationResult.coords.latitude,
              longitude: this.state.locationResult.coords.longitude
            },
            title: 'Ambulance 1',
            description: 'I am available',
          },
        ].map((marker, key) => (
          <Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            key={key}
            image={Assets['ambulance']}
          >

            <Callout tooltip>
              <TouchableOpacity onPress={() => alert(`Clicked`)}>
                <View style={{ backgroundColor: '#FFFFFF' }}>
                  <Text>
                    {marker.title}
                    {'\n'}
                    {marker.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
        <MapViewDirections
              origin={{
                latitude: 30.3524514,
                longitude: 76.3603436,
              }}
              destination={{
                latitude: 30.3454,
                longitude: 76.3773,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
            />
      </MapView>:
      <View style={styles.container}>
        <InfiniteAnimation source={'healthtap'}/>
      </View>
    }
      </React.Fragment>
    );
  }
}

const mapStateToProps =state=> ({
    id: state.user.response.user.uid
}) 

export default connect(mapStateToProps)(MapScreen)
  
