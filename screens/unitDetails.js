import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import BackArrow from '../components/backArrow';
import Axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import MiniChart from '../components/miniChart';

export default class UnitDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const dataPoints = [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    ];
    const dataPoints2 = [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    ];
    const dataPoints3 = [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    ];

    const dataPoints4 = [
      Math.random() * 7,
      Math.random() * 7,
      Math.random() * 7,
      Math.random() * 7,
      Math.random() * 7,
      Math.random() * 7,
    ];

    const labels = ['7', '8', '9', '10', '11', '12'];

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackArrow />

          <View style={styles.cardHolder}>
            <Text style={styles.titleText}>
              {this.props.name} plant details{' '}
            </Text>
            <MiniChart
              dataPoints={dataPoints}
              // yAxisLabel="$"
              // yAxisSuffix="k"
              yAxisInterval={1}
              labels={labels}
              title="Temparature"
              subTitle="7.00am - 12.00pm"
            />
            <MiniChart
              dataPoints={dataPoints2}
              // yAxisLabel="$"
              //yAxisSuffix="k"
              yAxisInterval={1}
              labels={labels}
              title="Soil moisture level"
              subTitle="8.00am - 5.00pm"
            />

            <MiniChart
              dataPoints={dataPoints2}
              // yAxisLabel="$"
              //yAxisSuffix="k"
              yAxisInterval={1}
              labels={labels}
              title="Soil N2 level(mg/kg)"
              subTitle="8.00am - 5.00pm"
            />

            <MiniChart
              dataPoints={dataPoints4}
              yAxisInterval={1}
              labels={labels}
              title="Soil pH value"
              subTitle="8.00am - 5.00pm"
            />

            <MiniChart
              dataPoints={dataPoints3}
              yAxisSuffix="%"
              yAxisInterval={1}
              labels={labels}
              title="Relative humidity"
              subTitle="8.00am - 5.00pm"
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

/*
     <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuBar />

          <View style={styles.cardHolder}>
            <Text style={styles.titleText}>Linked units</Text>
            {allCards}
            <View style={styles.finalSpace}></View>
          </View>
        </ScrollView>
      </View>
 */

/**
  *       <View style={styles.container}>
       <BackArrow />   

       <Text style={ styles.headerText}>{this.props.name} plant details </Text>
       <ScrollView> 
            <MiniChart 
            dataPoints={dataPoints}
           // yAxisLabel="$"
           // yAxisSuffix="k"
            yAxisInterval={1} 
            labels ={labels}
            title ="Soil temparature"
            subTitle="7.00am - 12.00pm"
            /> 
            <MiniChart 
            dataPoints={dataPoints}
           // yAxisLabel="$"
            //yAxisSuffix="k"
            yAxisInterval={1} 
            labels ={labels}
            title ="Soil moisture level"
            subTitle="8.00am - 5.00pm" /> 
            <MiniChart dataPoints={dataPoints} /> 

          <View style={styles.finalSpace} />
        </ScrollView>
      </View>
  */
