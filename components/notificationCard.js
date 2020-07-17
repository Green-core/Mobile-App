import React, {Component} from 'react';
import axios from 'axios';
import {
  Animated,
  StyleSheet,
  ToastAndroid,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Axios from 'axios';
const expan = require('./../assets/images/expan.png');
const grayLine = require('../assets/images/line.png');
const waterDrop = require('../assets/images/notifications/water.png');
const lightBulb = require('../assets/images/notifications/bulb.png');
const bees = require('../assets/images/notifications/bee.png');
const fertilizer = require('../assets/images/notifications/fertilizer.png');
const humidity = require('../assets/images/notifications/humidity.png');
export default class NotificationCard extends Component {
  constructor() {
    super();
    this.state = {
      animatedHeight: new Animated.Value(140),
      animatedOpacity: new Animated.Value(0),
      viewState: true,
      rotateAnimation: new Animated.Value(0),
      isVisible:true,
    };
  }

  toggleAnimation = () => {
    if (this.state.viewState == true) {
      Animated.parallel([
        Animated.timing(this.state.animatedHeight, {
          toValue: 180,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.animatedOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.rotateAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({viewState: false});
      });
    } else {
      Animated.parallel([
        Animated.timing(this.state.animatedHeight, {
          toValue: 140,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.animatedOpacity, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.rotateAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(this.setState({viewState: true}));
    }
  };

  onClickPerform = (id, type) => {
    console.log(id, type) 
    this.state.isVisible = false
    console.log(this.state.isVisible)
    if (type == 'LT') {
      axios
        .put(
          `https://ancient-temple-30883.herokuapp.com/units/actuators/${id}`,
          {
            actuator: 'lightActuator',
            state: 'true',
          },
        )
        .then((res) => {
          this.state.isVisible = false
          console.log(this.state.isVisible)
          ToastAndroid.showWithGravityAndOffset(
            'Light turned on  !',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            100,
          );
        });
    } else {
      axios
        .put(
          `https://ancient-temple-30883.herokuapp.com/units/actuators/${id}`,
          {
            actuator: 'waterMotorActuator',
            state: 'true',
          },
        )
        .then((res) => {
          ToastAndroid.showWithGravityAndOffset(
            'Water added !',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            100,
          ); 
        });
    }
  };

  onClickActions = (id, type) => {
    //navigate to actions with id
  };

  render() {
    //select the notification image
    var imagePath = '';
    var title = this.props.data.name;
    var message = this.props.data.value;
    var type = this.props.data.type;
    var id = this.props.data.id;

    switch (type) {
      case 'LT':
        imagePath = lightBulb;
        title = 'Need some light';
        message = `Light intensity level is ${this.props.data.value}lux`;
        break;
      case 'SM':
        imagePath = waterDrop;
        title = 'Need to add water';
        message = `soil moisture level is ${this.props.data.value}%`;
        break;
    }

    var rotateProp = this.state.rotateAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg'],
    });

    var animatedHeight = {
      height: this.state.animatedHeight,
    };
 
      return (
        <View>
          {this.state.isVisible?(
        <View style={{marginVertical: 1}} > 
          <Animated.View style={[styles.card, animatedHeight]}>
            <View style={styles.cardHeader}>
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>{title}</Text>
                <Text style={styles.headerSubTitle}>{this.props.data.name}</Text>
              </View>
              <View style={styles.headerImage}>
                <Image
                  source={imagePath}
                  style={styles.notificationHeaderImage}
                />
              </View>
            </View>
  
            <Animated.View
              style={{...styles.cardBody, opacity: this.state.animatedOpacity}}>
              <Text>{message}</Text>
            </Animated.View>
  
            <TouchableWithoutFeedback onPress={this.toggleAnimation}>
              <View style={styles.expanContainer}>
                <Animated.Image
                  source={expan}
                  style={{...styles.expan, transform: [{rotate: rotateProp}]}}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.text}></Text>
          </Animated.View>
          <Animated.View style={styles.buttonBar}>
            <Image source={grayLine} style={styles.grayLine} />
            <View style={styles.buttonLine}>
              <Text
                style={styles.buttonLineText}
                onPress={() => {
                  this.onClickPerform( id,  type);
                }}>
                {' '}
                Perform{' '}
              </Text>
              <Text
                style={styles.buttonLineText}
                onPress={() => {
                  onClickActions( id,  type);
                }}>
                Actions
              </Text>
            </View>
          </Animated.View>
        </View> ):<View><Text>Done</Text></View>}
        </View>
      );
     

  }
}

const styles = StyleSheet.create({
  expan: {
    height: 40,
    width: 40,
  },
  notificationHeaderImage: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: -40,
  },
  cardHeader: {
    margin: 20,
  },

  cardBody: {
    margin: 20,
    left: 40,
    top: -15,
  },

  headerText: {
    position: 'relative',
    left: 50,
  },
  headerTitle: {
    fontSize: 18,
  },
  headerSubTitle: {
    color: '#707070',
  },
  buttonBar: {
    position: 'relative',
    left: '10%',
    width: '80%',
    alignItems: 'center',
    alignContent: 'space-around',
  },

  buttonLineText: {
    fontSize: 16,
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '8%',
    color: '#454F63',
  },
  buttonLine: {
    position: 'relative',
    left: '5%',
    width: '90%',
    top: 65,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  expanContainer: {
    top: 15,
    position: 'absolute',
    right: 10,
  },

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
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 4,
    left: '7.5%',
    top: 120,
    height: 40,
    width: '85%',
    //margin: 'auto',
    position: 'relative',
  },
  animatedBox: {
    width: 180,
    height: 180,
    backgroundColor: '#0091EA',
  },
  grayLine: {
    width: '100%',
    left: 4,
    position: 'relative',
    top: 65,
  },

  text: {top: 40, color: 'black'},
});
