import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Tips from '../components/tipsCard';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';

export class tips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tips: [],
    };
  }

  componentDidMount() { 
   const {key} = this.props.route.params; 
   //console.log(this.props.route)
   
    axios
      .get(`https://ancient-temple-30883.herokuapp.com/tips/get/plant/${key}`)
      .then((res) => {
        const tips = res.data[0].tips;
        console.warn(res.data )
        this.setState({...this.state,tips, loading: false});
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {this.state.loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#2CBE64" />
            </View>
          ) : (
            <FlatList
              data={this.state.tips}
              renderItem={(item) => {
                return (
                  <View>
                    <Text style={styles.title}>• {item.item.title} </Text>
                    <Text style={styles.body}>{item.item.body} </Text>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          )}
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

  loading: {
    position: 'relative',
    top: '45%', 
  },

  container: {
    fontFamily: 'Segoe UI',
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  card: {
    borderRadius: 10,
    padding: 10,
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
    marginBottom: 0, 
  },
  body: {
    fontSize: 16,
    position: 'relative',
    left: '10%',
    width: '80%',
    margin: 10, 
    marginTop: 0, 
  },
});

export default tips;
