import React, {Component} from 'react'; 
import ProfileScreen from './screens/profile';
import ProfileSettingsScreen from './screens/profileSettings'; 
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import WelcomeScreen from './screens/Welcome';
import AuthHomeScreen from './screens/AuthHome';
import deviceStorage from './services/deviceStorage';
import {Loading} from './components/Loading'

import LinkUnitsScreen from './screens/linkUnit'
import ViewAllUnits from './screens/viewAllUnits'

import AccountSettingsScreen from './screens/accountSettings'; 
import ViewAllUnitsScreen from './screens/viewAllUnits'; 


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true
    }
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT = (jwt) =>{
    this.setState({jwt});
  }

  render() { 
  
      
      if (this.state.loading) {
        return (
          <Loading size={'large'} />
         );
      }
      else if (!this.state.jwt) {
        return (
          // <LoginScreen newJWT={this.newJWT}/>
          //  <ProfileSettingsScreen />    
          <SignupScreen/>
          // component you need to test without token
    
        ); 
      }
      else{
        return(
          // < WelcomeScreen />
          <AuthHomeScreen jwt={this.state.jwt} deleteJWT={this.deleteJWT}/>
        )
      }
 
  //  < ViewAllUnits /> ) ; 
      
    
  }
}
 
    {/* <ProfileSettingsScreen /> //<ProfileScreen /> <AccountSettingsScreen/>);<Demo /> <Demo /> 
    //<  */}


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