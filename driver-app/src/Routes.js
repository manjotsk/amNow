
import React from 'react'
import {
    RegisterScreen,
    Home,
    MapScreen,
    SymptomScreen
} from './screens'
import { Router, Scene, Stack } from "react-native-router-flux"

class Routes extends React.Component {

    render = () =>
        <Router>
            <Stack key="root" hideNavBar>
              <Scene key="register" component={RegisterScreen} />
              <Scene key="home" component={Home} />
              <Scene key="maps" component={MapScreen} />
              <Scene key="symptom" component={SymptomScreen} initial/>
            </Stack>
        </Router>
  }

export default Routes