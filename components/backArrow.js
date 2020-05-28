import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
const arrowImage = require('../assets/images/arrow.png'); 

export default class BackArrow extends Component {
 
  render() {
    return (
      <View styles={styles.menuBarContainer}>
        <TouchableOpacity>
          <Image source={arrowImage} style={styles.arrowImage} />
        </TouchableOpacity>

 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBarContainer: {
    display: 'flex',
    alignSelf: 'stretch',
    textAlign: 'center',
    height: '10%',
    flexDirection: 'row',
  },
 
  arrowImage: {
    position: 'absolute',
    left: '5%',
    marginTop: 25,
    marginLeft: 10,
    height: 15,
    width: 33,
  },
});
