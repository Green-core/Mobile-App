import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';

import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import MiniChart from '../components/miniChart';
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import {withAppContext} from '../services/withAppContext';
import baseURL  from '../config'

class UnitDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      soilMoistureData: [0, 0, 0, 0, 0, 0],
      temperatureData: [0, 0, 0, 0, 0, 0],
      lightIntensityData: [0, 0, 0, 0, 0, 0],
      humidityData: [0, 0, 0, 0, 0, 0],
      sensorDataTimeStamp: [],
    }; 
  }

  componentDidMount() {
    const {id, jwt} = this.props.context.state.user; // user id and jwt token


    axios
      .get(`${baseURL}/units/get/unit/${this.props.route.params.unitId}`)
      .then(async (res) => {
        const units = await res.data;
        this.setState({units});

        const soilMoistureSensor = await this.state.units.soilMoistureSensor
          .pastReadings;
        const temperatureSensor = await this.state.units.temperatureSensor
          .pastReadings;
        const lightIntensitySensor = await this.state.units.lightIntensitySensor
          .pastReadings;
        const humiditySensor = await this.state.units.humiditySensor
          .pastReadings;

        const soilMoistureData = [];
        const temperatureData = [];
        const lightIntensityData = [];
        const humidityData = [];
        const sensorDataTimeStamp = [];

        soilMoistureSensor
          .slice(Math.max(soilMoistureSensor.length - 6, 1))
          .forEach((data) => {
            var dt = new Date(data.time);
            var h = dt.getHours(),
              m = dt.getMinutes();
            var time;
            if (h == 12) {
              time = h + ':' + m + ' PM';
            } else {
              time = h > 12 ? h - 12 + ':' + m + ' PM' : h + ':' + m + ' AM';
            }
            dt = t = null;

            soilMoistureData.push(
              parseInt(data.reading.substring(0, data.reading.length)),
            );
            sensorDataTimeStamp.push(time);
            time = null;
          });

        temperatureSensor
          .slice(Math.max(temperatureSensor.length - 6, 1))
          .forEach((data) => {
            temperatureData.push(
              parseInt(data.reading.substring(0, data.reading.length)),
            );
          });

        lightIntensitySensor
          .slice(Math.max(lightIntensitySensor.length - 6, 1))
          .forEach((data) => {
            lightIntensityData.push(
              parseInt(data.reading.substring(0, data.reading.length)),
            );
          });

        humiditySensor
          .slice(Math.max(humiditySensor.length - 6, 1))
          .forEach((data) => {
            humidityData.push(
              parseInt(data.reading.substring(0, data.reading.length)),
            );
          });

        // console.log({sensorDataTimeStamp});
        // console.log({soilMoistureData});
        // console.log({temperatureData});
        // console.log({lightIntensityData});
        // console.log({humidityData});
        this.setState({
          ...this.state,
          sensorDataTimeStamp,
          soilMoistureData,
          temperatureData,
          lightIntensityData,
          humidityData,
        });
      })
      .catch((error) => console.log(error));

      console.log(JSON.stringify(this.props.route.params.unitID))
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}> 

          <View style={styles.cardHolder}>
            <Text style={styles.titleText}> 
            </Text>

            <MiniChart
              dataPoints={this.state.soilMoistureData}
              yAxisSuffix="%"
              yAxisInterval={1}
              xAxisInterval={1}
              labels={this.state.sensorDataTimeStamp}
              title="Soil Moisture"
              subTitle={
                this.state.sensorDataTimeStamp[0] +
                ' - ' +
                this.state.sensorDataTimeStamp[
                  this.state.sensorDataTimeStamp.length - 1
                ]
              }
            />

            <MiniChart
              dataPoints={this.state.temperatureData}
              yAxisInterval={1}
              yAxisSuffix=" °C"
              labels={this.state.sensorDataTimeStamp}
              title="Temparature ( °C )"
              subTitle={
                this.state.sensorDataTimeStamp[0] +
                ' - ' +
                this.state.sensorDataTimeStamp[
                  this.state.sensorDataTimeStamp.length - 1
                ]
              }
            />

            <MiniChart
              dataPoints={this.state.lightIntensityData}
              yAxisSuffix=" lux"
              yAxisInterval={1}
              labels={this.state.sensorDataTimeStamp}
              title="Light Intensity level "
              subTitle={
                this.state.sensorDataTimeStamp[0] +
                ' - ' +
                this.state.sensorDataTimeStamp[
                  this.state.sensorDataTimeStamp.length - 1
                ]
              }
            />

            <MiniChart
              dataPoints={this.state.humidityData}
              yAxisSuffix=" %"
              yAxisInterval={1}
              labels={this.state.sensorDataTimeStamp}
              title="Relative humidity"
              subTitle={
                this.state.sensorDataTimeStamp[0] +
                ' - ' +
                this.state.sensorDataTimeStamp[
                  this.state.sensorDataTimeStamp.length - 1
                ]
              }
            />

            <View style={styles.finalSpace}></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#E4E4E4',
  },

  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
    top: 72,
  },

  finalSpace: {
    height: 60,
  },
});
export default withAppContext(UnitDetailScreen);
