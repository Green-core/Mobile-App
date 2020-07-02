import React, {Component} from 'react';

import { 
  StyleSheet,
  View,
  Text, 
  ScrollView,
} from 'react-native';
import NotificationCard from '../components/notificationCard';
export default class Notifications extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titleText}>Notifications</Text>
        <NotificationCard notificationType={"light"}  />
        <NotificationCard notificationType={"water"} />
        <NotificationCard notificationType={"fertilizer"} />
        <NotificationCard notificationType={"bugs"} />
        <View style={styles.finalSpace}/>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
    top: 72,
  },

  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#E4E4E4',
  },

  finalSpace:{
    height:100
  }
});
