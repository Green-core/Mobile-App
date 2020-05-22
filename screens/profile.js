import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function Settings({text, onPress, width = 50}) {
  return (
    <View>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    borderRadius: 5,
    height: 49,
  },
  button: {
    borderRadius: 5,
    height: 49,
  },

  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
