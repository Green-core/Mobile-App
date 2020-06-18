import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({ size }) => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size={size}/>
    </View>
  );
};

const styles =StyleSheet.create( {
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});

export { Loading };