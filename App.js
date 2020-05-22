import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import GreenButton from './components/customButton';
import {BoxShadow} from 'react-native-shadow';

export default class App extends Component {
  render() {
    const shadowOpt = {
      width: 80,
      height: 80,
      color: '#43E97B',
      border: 30,
      radius: 40,
      opacity: 0.4,
      x: 0,
      y: 3,
    };

    return (
      <View style={styles.container}>
        <BoxShadow setting={shadowOpt}></BoxShadow>
      </View>
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
  shadow: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1.0,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,
    color: 'white',
    elevation: 5,
  },
});
