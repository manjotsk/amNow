import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { TouchableOpacity, View, Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

import Header from '../../components/header';
import ambulanceIcon from '../../assets/img/ambulance.png';

import firebase from '../../firebase';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCESqye_Jcvhd1xtrOYphGDqXbvQnKaxck';

export default class App extends React.Component {
  state = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    selectedLatitude: 0,
    drivers: [],
    bestAmbulanceLat: 0,
    bestAmbulanceLon: 0,
    showPath: false,
  };

  async componentDidMount() {
    let userLocation = this.props.navigation.getParam('userLocation');
    let drivers = this.props.navigation.getParam('drivers');

    drivers = drivers.map(function(driver) {
      return {
        latlng: {
          latitude: driver.coordinates[0],
          longitude: driver.coordinates[1],
        },
        title: driver.ambuName,
        description: 'I am available',
      };
    });

    userLocation = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    };

    console.log(userLocation);
    console.log(drivers);

    let latitude = 0;
    let longitude = 0;
    let latDeltas = [];
    let lonDeltas = [];

    for (let i = 0; i < drivers.length; i++) {
      latitude = latitude + drivers[i].latlng.latitude;
      longitude = longitude + drivers[i].latlng.longitude;
    }

    latitude = latitude / drivers.length;
    longitude = longitude / drivers.length;

    console.log(latitude, longitude);

    for (let i = 0; i < drivers.length; i++) {
      latDeltas.push(Math.abs(drivers[i].latlng.latitude - latitude));
      lonDeltas.push(Math.abs(drivers[i].latlng.longitude - longitude));
    }
    console.log({ latitude, longitude });

    this.setState({
      latitude,
      longitude,
      latitudeDelta: Math.max(...latDeltas),
      longitudeDelta: Math.max(...lonDeltas),
      drivers,
    });
    var max = 10000;
    var key = 0;

    for (let i = 0; i < drivers.length; i++) {
      var dist = Math.sqrt(
        Math.pow(
          this.props.navigation.getParam('userLocation').latitude - drivers[i].latlng.latitude,
          2
        ) +
          Math.pow(
            this.props.navigation.getParam('userLocation').longitude - drivers[i].latlng.longitude,
            2
          )
      );
      if (dist < max) {
        key = i;
      }
    }
    this.setState(
      {
        bestAmbulanceLat: drivers[key].latlng.latitude,
        bestAmbulanceLon: drivers[key].latlng.longitude,
        bestAmbulanceName: drivers[key].title,
      },
      () => {
        this.setState(
          {
            showPath: true,
          },
          () => {
            this.state.bestAmbulanceName
              ? firebase
                  .database()
                  .ref(`/ambulance/${this.state.bestAmbulanceName}`)
                  .on('value', snapshot => {
                    this.setState(
                      {
                        bestAmbulanceLat: snapshot.val().coordinates[0],
                        bestAmbulanceLon: snapshot.val().coordinates[1],
                      },
                      () => {
                        this.setState({
                          showPath: true,
                        });
                      }
                    );
                  })
              : null;
          }
        );
      }
    );
  }
  render() {
    let userLocation = this.props.navigation.getParam('userLocation');
    let drivers = this.props.navigation.getParam('drivers');

    drivers = drivers.map(function(driver) {
      return {
        latlng: {
          latitude: driver.coordinates[0],
          longitude: driver.coordinates[1],
        },
        title: driver.vehicleNumber,
        description: 'I am available',
      };
    });

    userLocation = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    };

    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };

    return (
      <React.Fragment>
        {console.log(this.state)}
        <Header text={'Ambulances Nearby'} />

        {this.state.latitude != 0 ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta + 0.2,
              longitudeDelta: this.state.longitudeDelta + 0.2,
            }}
          >
            {this.state.bestAmbulanceLat != 0 ? (
              <Marker
                coordinate={{
                  latitude: this.state.bestAmbulanceLat,
                  longitude: this.state.bestAmbulanceLon,
                }}
                image={ambulanceIcon}
              />
            ) : null}
            <Marker
              coordinate={{
                latitude: 30.35399,
                longitude: 76.368567,
              }}
            />
            {drivers.map((marker, key) => (
              <Marker
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                key={key}
                image={ambulanceIcon}
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
            {console.log('\n\n\n\n\nstate', this.state)}
            {console.log(userLocation.latitude, userLocation.longitude)}
            <MapViewDirections
              origin={{
                latitude: 30.35399,
                longitude: 76.368567,
              }}
              destination={{
                latitude: this.state.bestAmbulanceLat,
                longitude: this.state.bestAmbulanceLon,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
            />
          </MapView>
        ) : null}
      </React.Fragment>
    );
  }
}
