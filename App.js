import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  GreenButtonSmall,
  GreenButtonMedium,
  GreenButtonLarge,
  GreenButtonPlus,
} from './components/customButton';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <GreenButtonSmall text="Sign up" />
        <Text></Text>
        <GreenButtonMedium text="hello" />
        <Text></Text>
        <GreenButtonLarge text="hello" />
        <Text></Text>
        <GreenButtonPlus />
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
});
