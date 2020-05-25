import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { GreenButtonMedium} from './components/customButtons'
import ProfileScreen from './screens/profile'


export default class App extends Component {
  render() {

    return (  

    
<ProfileScreen /> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#43E97B',
    shadowOpacity: 0.9,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
