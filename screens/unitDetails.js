import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import BackArrow from '../components/backArrow';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import MiniChart from '../components/miniChart';
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { withAppContext } from '../services/withAppContext'

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
    const {id,jwt} = this.props.context.state.user;  // user id and jwt token
    console.log('unitId = ',this.props.route.params.unitId)  // access unit id
    //console.log('context=',this.props.context)
    //console.log('id = ',id)
    //console.log(`https://ancient-temple-30883.herokuapp.com/units/get/${id}`)
    //"https://ancient-temple-30883.herokuapp.com/units/get/5ec66db7aa16ff3a80870c9a"
    axios
      .get( 
        "https://ancient-temple-30883.herokuapp.com/units/get/5ec66db7aa16ff3a80870c9a",
      )
      .then(async (res) => {
        const units = await res.data;
        this.setState({units});
        //console.log(JSON.stringify(this.state.units[0].soilMoistureSensor, null ,2))

        const soilMoistureSensor = await this.state.units[0].soilMoistureSensor
          .pastReadings;
        const temperatureSensor = await this.state.units[0].temperatureSensor
          .pastReadings;
        const lightIntensitySensor = await this.state.units[0]
          .lightIntensitySensor.pastReadings;
        const humiditySensor = await this.state.units[0].humiditySensor
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
              parseInt(data.reading.substring(0, data.reading.length - 1)),
            );
            sensorDataTimeStamp.push(time);
            time = null;
          });

        temperatureSensor
          .slice(Math.max(temperatureSensor.length - 6, 1))
          .forEach((data) => {
            temperatureData.push(
              parseInt(data.reading.substring(0, data.reading.length - 1)),
            );
          });

        lightIntensitySensor
          .slice(Math.max(lightIntensitySensor.length - 6, 1))
          .forEach((data) => {
            lightIntensityData.push(
              parseInt(data.reading.substring(0, data.reading.length - 3)),
            );
          });

        humiditySensor
          .slice(Math.max(humiditySensor.length - 6, 1))
          .forEach((data) => {
            humidityData.push(
            parseInt(data.reading.substring(0, data.reading.length - 1)),
            );
          });

        console.log(humidityData); 
        this.setState({
          ...this.state,
          sensorDataTimeStamp,
          soilMoistureData,
          temperatureData,
          lightIntensityData,
          humidityData
        });
      })
      .catch((error) => console.log(error));
  }

  render() { 
   // console.log('routes',this.props.route.params.unitId)
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackArrow />

          <View style={styles.cardHolder}>
            <Text style={styles.titleText}>
              {this.props.name} plant details{' '}
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
    height: 150,
  },
});
export default withAppContext(UnitDetailScreen);

 