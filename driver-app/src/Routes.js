
import React from 'react'
import {
    RegisterScreen,
    Home,
    MapScreen
} from './screens'
import { Router, Scene, Stack } from "react-native-router-flux"

class Routes extends React.Component {

    render = () =>
        <Router>
            <Stack key="root" hideNavBar>
              <Scene key="register" component={RegisterScreen} />
              <Scene key="home" component={Home} />
              <Scene key="maps" component={MapScreen} initial/>
            </Stack>
        </Router>
  }

export default Routes