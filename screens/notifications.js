import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';
import NotificationCard from '../components/notificationCard';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
import BackgroundTimer from 'react-native-background-timer';
import baseURL  from '../config'
export default class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };

  }

  displayPushNotifications() {
    axios
      .get(
        `${baseURL}/notifications/check/5edca6c3f37915125cf1e8d7`,
      )
      .then((res) => {
        if (res.data.state) {
          this.setState({...this.state, data: res.data.data});
          PushNotification.localNotification({
            ticker: 'My Notification Ticker', // (optional)
            largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
            color: 'red', // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 100, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            title: 'GreenCore',
            message: 'New notifications',
          });
        }
      });
  }

  getData() {
    this.setState({...this.state, data: []});
    axios
      .get(
        `${baseURL}/notifications/check/5edca6c3f37915125cf1e8d7`,
      )
      .then((res) => {
        this.setState({...this.state, data: res.data.data});
      });
  }

  componentDidMount() {
    this.getData();
    BackgroundTimer.runBackgroundTimer(() => {
      if (!this.state.notified) {
        this.displayPushNotifications();
        this.getData();
        console.log('Notified');
      }
    }, 60000);
  }

  render() {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    const notifications = this.state.data.map((element) => {
      console.log(element.value);
      return <NotificationCard data={element} navigation={this.props.navigation.navigate} />;
    });

    return (
      <ScrollView style={styles.container}> 
        {notifications}
        <View style={styles.finalSpace} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
    bottom : '10%',
  },

  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#E4E4E4',
  },

  finalSpace: {
    height: 100,
  },
});
