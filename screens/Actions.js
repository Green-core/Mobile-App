import React from 'react';
import {View, Button} from 'react-native';
import axios from 'axios'

export default class Actions extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.switchOn = this.switchOn.bind(this)
    this.switchOff = this.switchOff.bind(this)
  }

  switchOn() {
    console.log('unit id=',this.props.route.params.unitId)  //access unit id

    const data = {
        moduleID: "5ec66db7aa16ff3a80870c9a",
        activated: true
    }

    axios
      .post(
        'http://192.168.8.100:5000/actuator/update-light-status',
        data,
      )
      .then((res) => {
        console.log(res);
      });
  }

  switchOff() {

    const data = {
        moduleID: "5ec66db7aa16ff3a80870c9a",
        activated: false
    }

    axios
      .post(
        'http://192.168.8.100:5000/actuator/update-light-status',
        data,
      )
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    //console.log('actions props',this.props.route.params.unitId)
    return (
      <View>
        <Button title="Switch On" onPress={this.switchOn} />
        <Button title="Switch Off" onPress={this.switchOff}/>
      </View>
    );
  }
}
