import React from 'react';
import axios from 'axios';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { Location, Permissions } from 'expo';

import styles from './style';
import Header from '../../../components/header';
import PlusAnimation from '../../components/plusanimation';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      location: null,
      distance: 1000,
      drivers: [],
    };
  }

  handleEmergencyPress() {
    if (!this.state.play) {
      this.setState({
        play: true,
      });
      const url = `http://172.20.10.5:3000/ambulance?latitude=${
        this.state.location.coords.latitude
      }&longitude=${this.state.location.coords.longitude}
      &distance=${this.state.distance}`;
      console.log({ url });

      setTimeout(() => {
        axios
          .get(url)
          .then(res => {
            const drivers = res.data;
            if (drivers.length == 0) {
              alert(`here drivers.length ${this.state.distance}`);
              this.setState({ play: false, distance: this.state.distance + 3000000 });
            } else {
              alert('here navigating');
              this.setState({ drivers, play: false });
              this.props.navigation.navigate('TrackingScreen', {
                userLocation: this.state.location,
                drivers,
              });
            }
          })
          .catch(error => {
            this.setState({ play: false, distance: this.state.distance + 500 });
          });
      }, 3000);
    } else {
      this.setState({
        play: false,
      });
    }
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log(location);

    this.setState({ location });
  };

  render() {
    let buttonText = '';
    let statusText = '';

    if (this.state.play) {
      buttonText = 'Cancel';
      statusText = 'Looking for ambulances nearby...';
    } else {
      buttonText = 'Emergency';
      statusText = ' ';
    }

    return (
      <React.Fragment>
        <Header text={'Patient App'} />
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <View style={styles.userDetails}>
              <Text style={styles.userDetailsText}>Logged in as Alpha Queue</Text>
            </View>
            <PlusAnimation play={this.state.play} />
          </View>
          <View style={styles.searchStatus}>
            <Text style={[styles.userDetailsText, { textAlign: 'center', fontSize: 18 }]}>
              {statusText}
            </Text>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={this.handleEmergencyPress.bind(this)}>
              <View style={styles.emergencyButton}>
                <Text style={styles.emergencyButtonText}>{buttonText}</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <View>
                <Text style={styles.reportText}>Report an accident</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

export default Home;
