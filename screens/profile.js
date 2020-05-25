import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View ,SafeAreaView, ScrollView} from 'react-native';
import { 
  GreenButtonMedium ,  GreenButtonSmall
} from './../components/customButtons';
import MenuBar from '../components/menuBar';
import axios from 'axios';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      _id: "",
      name: "loading...",
      email: "loading...",
      mobile: "loading...", 
      modules: [
      {
      connected_date: "",
      _id: "",
      module_id: "loading..."
      }, 
      ],
      created_at: "loading...", 
      };
  }
  
  modules = ""
  componentDidMount() {
    //get profile details usind _id
    axios
      .get(
        ' https://ancient-temple-30883.herokuapp.com/users/get/5ecb578fb2b10b0844de4cff',
      )
      .then((res) => {
        const userData = res.data;  
        this.setState({...userData });
      })
      .catch((error) => console.log(error));
     }



  render() {

    const modules = this.state.modules.length
  

    var timeStamp=  new Date(this.state['created_at'])
    var todate= timeStamp.getDate();
    var tomonth=timeStamp.getMonth()+1;
    var toyear= timeStamp.getFullYear();
    const date=toyear+'-'+tomonth+'-'+todate;

    return (

      <View style={styles.container}> 

        <MenuBar />
        <Text style={styles.titleText}>Profile</Text>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTextLarge}>Name </Text>
            <Text style={styles.cardTextSmall}>{this.state['name']}</Text>

            <Text style={styles.cardTextLarge}>Email</Text>
            <Text style={styles.cardTextSmall}>{this.state['email']}</Text>

            <Text style={styles.cardTextLarge}>Mobile </Text>
            <Text style={styles.cardTextSmall}>{this.state['mobile']}</Text>

            <Text style={styles.cardTextLarge}>Account created on </Text>
    <Text style={styles.cardTextSmall}>{  date }</Text>

            <Text style={styles.cardTextLarge}>Number of modules  </Text>
            <Text style={styles.cardTextSmall}>{modules}</Text>  
          
           
          </View> 
               <View style={styles.centerButton} >
                  < GreenButtonSmall text={"Edit profile"}  onPress={()=>{alert('Hello')}} />   
                </View>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },

  centerButton:{ 
    top:'1%',
    alignContent:'center',
    alignItems:'center', 
  },
  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
    top: 72,
  },

  cardContent: {
    paddingHorizontal: '10%',
    marginHorizontal: 10,
  },

  cardTextLarge: {
    paddingTop: '15%',
    fontSize: 18,
    color: '#A6A6A6',
    fontFamily: 'Segoe UI',
  },
  
  cardTextSmall: {
    paddingLeft: '15%',
    paddingTop: '5%',
    fontFamily: 'Segoe UI',
    fontSize: 18,
    color: '#404040',
  },

  cardTextModule: {
    paddingLeft: '15%',
    paddingTop: '2%',
    fontFamily: 'Segoe UI',
    fontSize: 18,
    width:'100%',
    color: '#404040',
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 4,
    left: '6.5%',
    top: '14%',
    height: '78%',
    width: '85%',
    margin: 'auto',
    position: 'relative',
  },
});
