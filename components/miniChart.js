import React, {Component ,useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View , Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';



const MiniChart = ({xdata, ydata, dataPoints =[0,0,0,0,0,0] , yAxisLabel , yAxisSuffix , yAxisInterval , labels , title , subTitle}) => {
  
  const graphData = {
    labels: labels,
    datasets: [
      {
        data: [
         ...dataPoints
        ],
      },
    ],
  };


  const chart = () =>{
    const graphData = {
      labels: labels,
      datasets: [
        {
          data: [
           ...dataPoints
          ],
        },
      ],
    };
    setGraphDataState(graphData)
  }
 
const [graphDataState, setGraphDataState] = useState(graphData) 

useEffect(() => {
  chart()
},[dataPoints])
 
  return (  
   
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <LineChart
            data={graphDataState}
            width={Dimensions.get('window').width * 0.9} // from react-native
            height={320}
            yAxisLabel={yAxisLabel}
            yAxisSuffix={ yAxisSuffix}
            yAxisInterval={yAxisInterval} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#2CBE64',
              backgroundGradientTo: '#33C974',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 1,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: '#16C60C',
              },
            }}
            bezier
            style={styles.chartCanvas}
          />
        </View>  
  );
};

const styles = StyleSheet.create({
 card:{ 
  marginLeft: 35,
  marginTop: 60,
  paddingTop: 21,
  borderRadius: 20,
  backgroundColor: 'white',
  shadowOpacity: 0.3,
  shadowOffset: {width: 1, height: 1},
  marginHorizontal: 4,
  marginLeft: '5%',
  top: 60,
  height: 400,
  width: '90%',
  margin: 'auto',
  position: 'relative', 
 },

 chartCanvas:{
  borderRadius: 20,
  color:'red'
 },

 canvasContainer:{
  color:'red'

 },

title:{
  fontSize:20,
  alignContent:'center',
  textAlign:'center'
}

,
subTitle:{
  fontSize:16,
  alignContent:'center',
  textAlign:'center',
  color:'#93979E',
  marginBottom:10
}
});


export default MiniChart;