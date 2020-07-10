import React from 'react';
import {View, Image, Button, Switch, ToastAndroid, StyleSheet, Text} from 'react-native';
import axios from 'axios';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const expan = require('./../assets/images/expan.png');
const grayLine = require('../assets/images/line.png');
const waterDrop = require('../assets/images/notifications/water.png');
const lightBulb = require('../assets/images/notifications/bulb.png');
const bees = require('../assets/images/notifications/bee.png');
const fertilizer = require('../assets/images/notifications/fertilizer.png');

export default class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light: false,
      unitID: '5ec66db7aa16ff3a80870c9a',
    };
  }

  toggleSwitch = () => {
    const newState = !this.state.light;
    axios
      .put(
        `https://ancient-temple-30883.herokuapp.com/units/actuators/${this.state.unitID}`,
        {
          actuator: 'lightActuator',
          state: newState,
        },
      )
      .then((res) => {
        
        console.log(res);
      });
    this.setState({...this.state, light: newState});
  };

  addWater = () => {
    axios
      .put(
        `https://ancient-temple-30883.herokuapp.com/units/actuators/${this.state.unitID}`,
        {
          actuator: 'waterMotorActuator',
          state: 'true',
        },
      )
      .then((res) => {
        ToastAndroid.showWithGravityAndOffset(
          "Water added !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
         100
        );
        console.log(res);
      });
  };

  addFertilizer = () => {
    axios
      .put(
        `https://ancient-temple-30883.herokuapp.com/units/actuators/${this.state.unitID}`,
        {
          actuator: 'fertilizerActuator',
          state: 'true',
        },
      )
      .then((res) => {
        ToastAndroid.showWithGravityAndOffset(
          "Fertilizer added !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
         100
        );
        console.log(res);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Control actuators</Text>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.detailLine}>
              <Text style={styles.leftText}>Light bulb </Text>

              <View style={styles.switchContainer}>
                <Switch
                  trackColor={{false: '#0F4021', true: '#28AC5B'}}
                  thumbColor={this.state.light ? '#0F4021' : '#28AC5B'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => this.toggleSwitch()}
                  value={this.state.light}
                  style={{position: 'relative', right: 100}}
                />
              </View>
            </View>

            <View style={styles.detailLine}>
              <Text style={styles.leftText}>Add water </Text>

              <View style={styles.switchContainer}>
                <View style={styles.buttonImageContainer}><TouchableWithoutFeedback
                    onPress={() => {
                      this.addWater();
                    }}>
                  <Image source={waterDrop} style={styles.buttonImage} />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>

            <View style={styles.detailLine}>
              <Text style={styles.leftText}>Add fertilizer </Text>

              <View style={styles.switchContainer}>
                <View style={styles.buttonImageContainer}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.addFertilizer();
                    }}>
                    <Image source={fertilizer} style={styles.buttonImage} />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },

  leftText: {
    fontSize: 20,
  },
  buttonImage: {
    height: 30,
    width: 30,
    margin: 10,
  },

  buttonImageContainer: {
    height: 50,
    width: 50,
    position: 'relative',
    bottom: 13,
    right: '400%',
    borderRadius: 25,
    backgroundColor: 'white',
    elevation: 5,
  },
  detailLine: {
    marginVertical: 40,
    position: 'relative',
    left: '5%',
    right: '5%',
    width: '90%',
    top: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  switchContainer: {
    marginLeft: 80,
    position: 'relative',
    left: '390%',
  },

  centerButton: {
    top: '1%',
    alignContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
    top: 72,
  },

  cardContent: {
    paddingHorizontal: '10%',
    marginHorizontal: 10,
  },

  cardTextLarge: {
    paddingTop: '15%',
    fontSize: 18,
    color: '#A6A6A6',
    fontFamily: 'Segoe UI',
  },

  cardTextSmall: {
    paddingLeft: '15%',
    paddingTop: '5%',
    fontFamily: 'Segoe UI',
    fontSize: 18,
    color: '#404040',
  },

  cardTextModule: {
    paddingLeft: '15%',
    paddingTop: '2%',
    fontFamily: 'Segoe UI',
    fontSize: 18,
    width: '100%',
    color: '#404040',
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 4,
    left: '6.5%',
    top: '14%',
    height: '78%',
    width: '85%',
    margin: 'auto',
    position: 'relative',
  },
  grayLine: {
    top: 40,
    width: '80%',
    left: '10%',
    right: '10%',
  },

  buttonLineText: {
    fontSize: 14,
    paddingTop: '5%',
    paddingLeft: '2%',
    paddingRight: '8%',
    color: '#454F63',
  },
});
