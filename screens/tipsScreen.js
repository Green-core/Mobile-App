import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Tips from '../components/tipsCard';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';

const data = {
  type: 'Chilly',
  tips: [
    {
      _id: '5f12e73dac71f8313cd5b3d3',
      title: 'Title of tip 1',
      body: 'body of tip 1 ',
    },
    {
      _id: '5f12e73dac71f8313cd5b3d1',
      title: 'Title of tip 2',
      body: 'body of tip 2 ',
    },
    {
      _id: '5f12e73dac71f8313cd5b3d2',
      title: 'Title of tip 3',
      body: 'body of tip 3 ',
    },
  ],
};

export class tips extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <FlatList
            data={data.tips}
            renderItem={(item) => {
              console.log(item.item);
              return (
                <View>
                  <Text style={styles.title}>• {item.item.title} </Text>
                  <Text style={styles.body}>{item.item.body} </Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          /> 
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
  },

  container: {
    fontFamily: 'Segoe UI',
    flex: 1,
   backgroundColor: '#E4E4E4', 
  },
  card: {
    borderRadius: 10,
    padding:10,
    backgroundColor: 'white',
    marginHorizontal: 4,
    left: '7.5%',
    top: '5%', 
    width: '85%',
    height: '90%',
    position: 'relative',
  },
  title: {
    fontSize: 22,
    margin: 10,
    backgroundColor: 'green',
  },
  body: {
    fontSize: 16,
    position: 'relative',
    left: '10%',
    width: '80%',
    margin: 10,
    backgroundColor: 'yellow',
  },
});

export default tips;
