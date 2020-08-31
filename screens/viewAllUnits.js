import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, Image} from 'react-native';
import {GreenButtonSmall} from './../components/customButtons';
import MenuBar from '../components/menuBar';
import axios from 'axios';
import {withAppContext} from '../services/withAppContext';

const plantImage = require('../assets/images/plants/mango.jpg');
const grayLine = require('../assets/images/line.png');

class ViewAllUnitsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      baseURL: 'https://ancient-temple-30883.herokuapp.com',
    };
  }

  componentDidMount() {
    const {id, jwt} = this.props.context.state.user;
    axios
      .get(`${this.state.baseURL}/units/get/${id}`)
      .then(async (res) => {
        const units = await res.data;
        this.setState({units});
        //console.log(JSON.stringify(units, null ,2))

        console.log(JSON.stringify(units[0].soilTemp, null, 2));
      })
      .catch((error) => console.log(error));
  }

  navigateToDetails = (unitId) => {
    this.props.navigation.navigate('Unit Details', {unitId});
    //alert(unitID);
  };

  navigateToActions = (unitId) => {
    this.props.navigation.navigate('Actions', {unitId});
    //alert(unitID);
  };

  render() {
    const allCards = this.state.units.map((unit) => {
      const temparatureReading = unit.temperatureSensor.lastReading.substring(
        0,
        unit.temperatureSensor.lastReading.length,
      );
      const soilMoistureReading = unit.soilMoistureSensor.lastReading;
      const lightIntensityReading = unit.lightIntensitySensor.lastReading;
      const humidityReading = unit.humiditySensor.lastReading.substring(
        0,
        unit.humiditySensor.lastReading.length,
      );

      return (
        <View style={styles.card} key={unit._id}>
          <View style={styles.cardHeader}>
            <Image source={plantImage} style={styles.plantImage} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.plantName}>{unit.unitName}</Text>
              <Text style={styles.subTitleText}>{unit._id} </Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.contentTitles}>
              <Text style={styles.cardContentTitle}>Device name </Text>
              <Text style={styles.cardContentTitle}>Plant type </Text>
              <Text style={styles.cardContentTitle}>Location </Text>
              <Text style={styles.cardContentTitle}>Unit condition </Text>
            </View>

            <View style={styles.contentDetails}>
              <Text style={styles.cardContentDetail}>Test Name</Text>
              <Text style={styles.cardContentDetail}>Test Type </Text>
              <Text style={styles.cardContentDetail}>{unit.location} </Text>
              <View style={styles.cardContentDetailCondition}>
                <Text>Soil temperature : {temparatureReading} °C </Text>
                <Text>Soil moisture : {soilMoistureReading} % </Text>
                <Text>Light intensity level : {lightIntensityReading} </Text>
                <Text>Relative humidity: {humidityReading} %</Text>
                <Text> {''}</Text>
              </View>
            </View>
          </View>
          <Image source={grayLine} style={styles.grayLine} />
          <View style={styles.buttonLine}>
            <Text
              style={styles.buttonLineText}
              onPress={() => {
                this.navigateToDetails(unit._id);
              }}>
              Details
            </Text>
            <Text
              style={styles.buttonLineText}
              onPress={() => {
                this.navigateToActions(unit._id);
              }}>
              Actions{' '}
            </Text>
          </View>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardHolder}>
            <Text style={styles.titleText}>Linked units</Text>
            {allCards}
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

  contentTitles: {top: 10},

  contentDetails: {
    top: 10,
  },
  subTitleText: {
    color: '#979CA8',
  },

  grayLine: {
    top: 20,
    width: '90%',
    left: '5%',
  },

  buttonLine: {
    position: 'relative',
    left: '5%',
    width: '90%',
    top: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  buttonLineText: {
    fontSize: 16,
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '8%',
    color: '#454F63',
  },

  cardContentTitle: {
    fontSize: 16,
    fontFamily: 'Gibson-Regular',
    color: '#78849E',
    marginTop: 10,
  },

  cardContentDetail: {
    fontSize: 15,
    fontFamily: 'Gibson-Regular',
    marginTop: 11,
  },
  cardContentDetailCondition: {
    fontSize: 15,
    fontFamily: 'Gibson-Regular',
    marginTop: 35,
  },

  cardHeader: {
    width: '100%',
    height: 64,
    display: 'flex',
    flexDirection: 'row',
  },
  headerTextContainer: {
    left: 12,
    top: 19,
  },

  plantName: {
    fontSize: 16,
    fontFamily: 'Gibson-Regular',
  },

  plantImage: {
    height: 43,
    width: 43,
    marginLeft: 20,
    marginTop: 20,
  },

  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 4,
    left: '7.5%',
    top: 120,
    height: 360,
    width: '85%',
    margin: 'auto',
    position: 'relative',
    marginBottom: 40,
  },

  cardHolder: {
    height: 'auto',
  },
  finalSpace: {
    height: 150,
  },
});
export default withAppContext(ViewAllUnitsScreen);
