import React, {Component} from 'react'; 
import ProfileScreen from './screens/profile';
import ProfileSettingsScreen from './screens/profileSettings'; 
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import WelcomeScreen from './screens/Welcome';

import AccountSettingsScreen from './screens/accountSettings'; 
import ViewAllUnitsScreen from './screens/viewAllUnits'; 


export default class App extends Component {
  render() {
    return (
      //  <ProfileSettingsScreen /> 
       <ViewAllUnitsScreen />
       ) ;
      
    
  }
}
 
    {/* <ProfileSettingsScreen /> //<ProfileScreen /> <AccountSettingsScreen/>);<Demo /> <Demo /> 
    //<  */}