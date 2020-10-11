import React, { Component } from 'react';
import { View, Text ,Button,StyleSheet,Alert,TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {Loading} from '../components/Loading'
//import AsyncStorage from '@react-native-community/async-storage';
import deviceStorage from '../services/deviceStorage';
import { withAppContext } from '../services/withAppContext'
import baseURL  from '../config'
 class AuthHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      user:{},
      token:'',
    }
  }

  componentDidMount(){

    const {id,jwt} = this.props.context.state.user;
  //  console.log("Context props inside auth = ",this.props.context);
  //  console.log("Context inside auth user= ",this.props.context.state.user);
  

     const headers = {
       'authorization': 'Bearer ' + jwt
     };
     //{ headers:headers}
     //`http://10.0.2.2:5000/users/get/${id}`
     //https://ancient-temple-30883.herokuapp.com/users/get
    Axios
    .get(`${baseURL}/users/get/${id}`,{headers:headers})
    .then((res) => {
      this.setState({
        user:res.data,
        loading: false
      });
    //  console.log(this.state.user);
      this.setState({loading: false});
    })
    .catch(err => {
      this.setState({loading: false});
      console.log(err)
    });
  }
  render() {
   // console.log("auth props",this.props);
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
              Authenticated screen {user.email}
            </Text>
            <Text style={styles.text}>
              Welcome {user.name}
            </Text>
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
export default withAppContext(AuthHome);