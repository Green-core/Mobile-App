import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
const menuImage = require('../assets/images/menu.png');
const notificationImage = require('../assets/images/notifications.png');

export default class MenuBar extends Component {
  componentDidMount() {
    //should add notification icon dynamically
  }

  render() {
    return (
      <View styles={styles.menuBarContainer}>
        <TouchableOpacity>
          <Image source={menuImage} style={styles.menuImage} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={notificationImage} style={styles.notificationImage} />
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

  menu: {
    backgroundColor: 'blue',
    position: 'relative',
    left: '-10%',
    height: 18,
    width: 22,
  },

  notification: {
    backgroundColor: 'yellow',
    height: 18,
    width: 22,
  },

  notificationImage: {
    height: 24,
    position: 'absolute',
    marginTop: 25,
    marginLeft: -10,
    left: '90%',
    width: 24,
  },
  menuImage: {
    position: 'absolute',
    left: '5%',
    marginTop: 25,
    marginLeft: 10,
    height: 18,
    width: 22,
  },
});
