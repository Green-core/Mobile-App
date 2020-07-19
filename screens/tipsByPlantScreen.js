import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Tips from '../components/tipsCard';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';

const data = {
  data: [
    {
      _id: '5f12e73dac71f8313cd5b3d3',
      type: 'Chilly',
      title: 'title of tip 1',
      body: 'body of tip 1 ',
    },
    {
      _id: '5f12e73dac71f8313cd5b3d2',
      type: 'Gotukola',
      title: 'title of tip 2',
      body: 'body of tip 2',
    },
  ],
};

export class tips extends Component {
  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Tips by plant name </Text>
        <FlatList
          style={styles.flatList}
          data={data.data}
          renderItem={(item) => {
            console.log(item.item.type);
            return (
              <View style={styles.card}>
                <Text style={styles.cardText}>{item.item.type} </Text>
              </View>
            );
          }}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{height: 200}}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.finalSpace} />
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
    top: 72,
  },

  flatList: {
    position: 'relative',
    top: '10%',
  },

  container: {
    height: '100%',
    backgroundColor: '#E4E4E4',
  },
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 4,
    marginBottom: 10,
    left: '7.5%',
    top: '40%',
    height: 50,
    width: '85%',
    position: 'relative',
  },
  cardText: {
    fontSize: 22,
    margin: 10,
  },
});

export default tips;
