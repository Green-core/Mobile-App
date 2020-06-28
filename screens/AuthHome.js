import React, { Component } from 'react';
import { View, Text ,Button,StyleSheet,Alert,TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {Loading} from '../components/Loading'
import AsyncStorage from '@react-native-community/async-storage';
import deviceStorage from '../services/deviceStorage';

export default class AuthHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      user:{},
      jwt:'',
      id:''    
    }
    //this.loadItem = deviceStorage.loadItem.bind(this);
  //  this.loadItem();
  }

  componentDidMount(){
    console.log(this.props);
     this.setState({loading:true});
     AsyncStorage.getItem('jwtToken').then((jwt) => {
      this.setState({jwt})
  })  
     console.log('auth home'+this.state.jwt)
     console.log('authHome'+this.state.id)
  //   console.log('params jwt'+this.props.route.params.jwt)

     const headers = {
       'authorization': 'Bearer ' + this.state.jwt
     };
     //${this.props.id}
     ///{params:{id:this.props.id}}
    Axios
    .get('http://10.0.2.2:5000/users/get/5ecb578fb2b10b0844de4cff',{ headers:headers})
    .then((res) => {
      this.setState({
        user:res.data,
        loading: false
      });
      //console.log(this.state.user);
      //TODO : Navigate to login page
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err)
    });
  }
  render() {
   // console.log(this.props);
    const {loading,user} = this.state;
   
    if (loading){
      return(
          <Loading size={'large'} />
      )
    } 
    else {
        return(
          <View style={styles.container}>
            <Text style={styles.text}>
              Authenticated screen
            </Text>
            <Text style={styles.text}>
              Welcome {user.name}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>this.props.navigation.navigate('Logout')}
            >
              <Text style={styles.buttonText}> Log Out </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
            onPress={()=>this.props.navigation.navigate('Profile settings')}
            >
              <Text style={styles.buttonText}> Profile Settings </Text>
            </TouchableOpacity>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  }, 
  button:{
    backgroundColor:'green',
    marginTop:10,
    marginBottom:10,
    padding:10,
    alignItems:'center',
    marginLeft:100,
    marginRight:100,

  },
  buttonText:{
    fontFamily: 'Segoe UI',
    color:'white',
    fontSize:20,
    fontWeight:'200',
  },
});