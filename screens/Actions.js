import React from 'react';
import {View, Button, Switch, StyleSheet , Text} from 'react-native';
import axios from 'axios';

export default class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light: false,
      unitID: '5ec66db7aa16ff3a80870c9a',
    };
  }

  toggleSwitch = () => {
    const current = this.state.light;
    axios
      .post('http://192.168.8.100:5000/actuator/update-light-status', {
        moduleID: this.state.unitID,
        activated: current,
      })
      .then((res) => {
        console.log(res);
      });
    this.setState({...this.state, light: !current});
  };

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.titleText}>Control actuators</Text>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTextLarge}>Light bulb </Text>
          <View style={styles.switchContainer}>
             <Switch
            trackColor={{false: '#767577', true: '#28AC5B'}}
            thumbColor={this.state.light ? '#0F4021' : '#28AC5B'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => this.toggleSwitch()}
            value={this.state.light}
            style={{position:'relative',right:100}}
          /> 
          </View>
         

          <Text style={styles.cardTextLarge}>Email</Text>
          <Text style={styles.cardTextSmall}>asdfsda</Text>

          <Text style={styles.cardTextLarge}>Mobile </Text>
          <Text style={styles.cardTextSmall}>dsgsf</Text>

          <Text style={styles.cardTextLarge}>Account created on </Text>
          <Text style={styles.cardTextSmall}>asdfd</Text>
 
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

  switchContainer:{
    alignContent:'center',
    justifyContent:'center'
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

  buttonLine: {
    position: 'relative',
    left: '5%',
    right: '5%',
    width: '90%',
    top: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  buttonLineText: {
    fontSize: 14,
    paddingTop: '5%',
    paddingLeft: '2%',
    paddingRight: '8%',
    color: '#454F63',
  },
});
