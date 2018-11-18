import React from 'react'
import { Provider } from 'react-redux'

import Routes from './src/Routes'
import store from './src/store/store'

export default class App extends React.Component {

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    )
  }
}

