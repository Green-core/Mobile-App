import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native'; 
export default class tipsCard extends Component {
  render() { 
    return (
      <View style={{marginVertical: 1}}>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text>{this.props.data.body}</Text>
          </View>
          <Text style={styles.text}></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardBody: {
    margin: 20,
    left: 40,
    top: -15,
  },

  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#E4E4E4',
  },
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 4,
    left: '7.5%',
    top: 120,
    height: 40,
    width: '85%',
    position: 'relative',
  },

  text: {
    top: 40,
    color: 'black',
  },
});
