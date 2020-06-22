import React, {Component} from 'react';
import ProfileScreen from './screens/profile';
import ProfileSettingsScreen from './screens/profileSettings';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import WelcomeScreen from './screens/Welcome';
import AuthHomeScreen from './screens/AuthHome';
import deviceStorage from './services/deviceStorage';
import {Loading} from './components/Loading';
import AsyncStorage from '@react-native-community/async-storage';

import LinkUnitsScreen from './screens/linkUnit';
import ViewAllUnits from './screens/viewAllUnits';

import AccountSettingsScreen from './screens/accountSettings';
import ViewAllUnitsScreen from './screens/viewAllUnits';
import UnitDetailsScreen from './screens/unitDetails';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      id:'',
      loading: true,
    };
    this.deleteItem = deviceStorage.deleteItem.bind(this);
    this.loadItem = deviceStorage.loadItem.bind(this);
    this.loadItem();
  }

  newJWT = (jwt) => {
    this.setState({jwt});
    console.log('app js '+this.state.jwt)
  };
  newID = (id) => {
    this.setState({id});
    console.log('app js '+this.state.id);
  }
 
 componentDidMount(){
    this.loadItem();
  }

  render() {
    if (this.state.loading) {
      return <Loading size={'large'} />;
    } else if (!this.state.jwt) {
      return (
        <LoginScreen newID={this.newID} newJWT={this.newJWT} />
        //  <ProfileSettingsScreen />
        // <SignUpScreen/>
        // <UnitDetailsScreen />
        // component you need to test without token
      );
    } else {
      return (
        // < WelcomeScreen />
        <AuthHomeScreen id={this.state.id} jwt={this.state.jwt}  deleteItem={this.deleteItem}  />
      );
    }

    //  < ViewAllUnits /> ) ;
  }
}

{
  /* <ProfileSettingsScreen /> //<ProfileScreen /> <AccountSettingsScreen/>);<Demo /> <Demo /> 
    //<  */
}

//   <Router>
//   <Scene key="root">
//     <Scene key="Welcome"
//       component={WelcomeScreen}
//       title="Welcome"
//       initial
//     />
//     <Scene
//       key="Signup"
//       component={SignupScreen}
//       title="SignUp"
//     />
//     <Scene
//       key="Login"
//       component={LoginScreen}
//       title="Login"
//     />
//     <Scene
//       key="Auth"
//       component={AuthHomeScreen}
//       title="Auth"
//     />
//   </Scene>
// </Router>
