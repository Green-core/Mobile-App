import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';
import NotificationCard from '../components/notificationCard';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
import BackgroundTimer from 'react-native-background-timer';

export default class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      notified:false
    };

    // PushNotification.configure({
    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //   },
    //   onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
    //   onAction: function (notification) {
    //     console.log("ACTION:", notification.action);
    //     console.log("NOTIFICATION:", notification);
    //   },

    //   onRegistrationError: function(err) {
    //     console.error(err.message, err);
    //   },
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },

    //   popInitialNotification: true,

    //   requestPermissions: true,
    // });
  }
  als() {
    alert('hwasdf');
  }

  displayPushNotifications() {
    axios
      .get(
        `https://ancient-temple-30883.herokuapp.com/notifications/check/5edca6c3f37915125cf1e8d7`,
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

  componentDidMount() {
    BackgroundTimer.runBackgroundTimer(() => {
      if(!this.state.notified){ 
        this.displayPushNotifications();
        console.log('Notified');
        this.setState({...this.state , notified:true})
      }
    }, 30000);
  }

  render() {
    this.setState({...this.state , notified:false})
    //send api request and recieve list of notifications if exists

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titleText}>Notifications</Text>
        <NotificationCard notificationType={'light'} />
        <NotificationCard notificationType={'water'} />
        <NotificationCard notificationType={'fertilizer'} />
        <NotificationCard notificationType={'bugs'} />
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
    top: 72,
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
