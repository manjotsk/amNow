import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { TouchableOpacity, View, Text } from 'react-native';

import { Assets } from '../../themes'

import { InfiniteAnimation } from '../../animations'
import { Location, Permissions } from 'expo';
import styles from './styles';

export default class MapScreen extends React.Component {

    state = {

    }

    componentDidMount () {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            locationResult: 'Permission to access location was denied',
          });
        } else {
          this.setState({ hasLocationPermissions: true });
        }
     
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: location });
        
        // Center the map on the location we just fetched.
         this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
       };

  render() {

    console.log(this.state.locationResult?this.state.locationResult.coords.latitude:null)

    return (
      <React.Fragment>
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
      </MapView>:
      <View style={styles.container}>
        <InfiniteAnimation source={'healthtap'}/>
      </View>
    }
      </React.Fragment>
    );
  }
}
  
