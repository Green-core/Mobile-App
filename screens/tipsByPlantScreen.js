import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Tips from '../components/tipsCard';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import { withAppContext } from '../services/withAppContext'
import baseURL  from '../config'
 

export class tips extends Component {


  constructor(props) {
    super(props);
    this.state = {
      plants:[]
    };
  }

  componentDidMount() {
    const {id} = this.props.context.state.user;  
    console.log(id);
     axios 
     .get(`${baseURL}/tips/get/${id}`) 
       .then((res) => {
         const plants = res.data;
         console.log(JSON.stringify(plants))
         this.setState({ plants});
       })
       .catch((error) => console.log(error));
   }
 
   navigateToTips(key){
      //alert(key)
      this.props.navigation.navigate("Tips" , {key})
      //navigate to tips Screen with props 
   }


  render() { 
    return (
      <View style={styles.container}> 
        <FlatList
          style={styles.flatList}
          data={this.state.plants}
          renderItem={(item) => { 
            return (
              <View style={styles.card}>
                <Text style={styles.cardText} onPress={()=>{this.navigateToTips(item.item)}}>{item.item} </Text>
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
    top: '5%',
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
    marginBottom: 15,
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

export default withAppContext(tips);