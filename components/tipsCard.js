import React, {Component} from 'react';
import axios from 'axios';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
const expan = require('./../assets/images/expan.png');
const grayLine = require('../assets/images/line.png');

export default class tipsCard extends Component {
  constructor() {
    super();
    this.state = {
  
    };
  }

  

  render() {
    console.log(this.props.data.body)
    var title = this.props.data.name;
    var body = this.props.data.body;
    var type = this.props.data.type;
 

    return (
      <View style={{marginVertical: 1}}>
        <View style={ styles.card }>
          <View style={styles.cardHeader}>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>{title}</Text>
              <Text style={styles.headerSubTitle}>{this.props.data.name}</Text>
            </View> 
          </View>

          <View
            style={ styles.cardBody }>
            <Text>{body}</Text>
          </View>
 
          <Text style={styles.text}></Text>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  expan: {
    height: 40,
    width: 40,
  },
  notificationHeaderImage: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: -40,
  },
  cardHeader: {
    margin: 20,
  },

  cardBody: {
    margin: 20,
    left: 40,
    top: -15,
  },

  headerText: {
    position: 'relative',
    left: 50,
  },
  headerTitle: {
    fontSize: 18,
  },
  headerSubTitle: {
    color: '#707070',
  },
  buttonBar: {
    position: 'relative',
    left: '10%',
    width: '80%',
    alignItems: 'center',
    alignContent: 'space-around',
  },

  buttonLineText: {
    fontSize: 16,
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '8%',
    color: '#454F63',
  },
  buttonLine: {
    position: 'relative',
    left: '5%',
    width: '90%',
    top: 65,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  expanContainer: {
    top: 15,
    position: 'absolute',
    right: 10,
  },

  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
    top: 72,
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
    //margin: 'auto',
    position: 'relative',
  },
  animatedBox: {
    width: 180,
    height: 180,
    backgroundColor: '#0091EA',
  },
  grayLine: {
    width: '100%',
    left: 4,
    position: 'relative',
    top: 65,
  },

  text: {top: 40, color: 'black'},
});
