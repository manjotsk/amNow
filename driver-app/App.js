import React from 'react'
import { Provider } from 'react-redux'
import { Permissions, Notifications } from 'expo';

import Routes from './src/Routes'
import store from './src/store/store'
import { saveToken } from './src/reducers/SymptomReducer';

export default class App extends React.Component {

  componentDidMount() {
    console.disableYellowBox = true;
    this.registerForPushNotificationsAsync()
  }

  async  registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    store.dispatch(saveToken(token.toString()))
  
  }

  render() {
    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    )
  }
}

