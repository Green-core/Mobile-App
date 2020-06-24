import React, { Component } from 'react';
import { View, Text ,Button,StyleSheet,Alert,TouchableOpacity} from 'react-native';
import {Loading} from '../components/Loading'
import deviceStorage from '../services/deviceStorage';
//TODO modal
export default class AuthHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:false
    }
    this.deleteItem = deviceStorage.deleteItem.bind(this);
  }
  
  logOut = ()=>{
    this.setState({loading:true})
    this.deleteItem();
    alert('go to login')
   // this.props.navigation.navigate('AuthStack',{screen:'Login'});
  }

  render() {
    console.log(this.props);
   
    if (this.state.loading){
      return(
          <Loading size={'large'} />
      )
    } 
    else {
        return(
          <View style={styles.container}>
            <Text style={styles.text}>
              Are you sure you want to log out ?
            </Text>
            <View style={styles.btwWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.logOut}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>alert('pop up modal')}
              //this.props.navigation.navigate('Login',{screenname:'profile'})
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            </View>
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
  text:{
      marginLeft:20,
      fontSize:20
  },
  btwWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
  }, 
  button:{
    backgroundColor:'green',
    marginTop:100,
    paddingHorizontal:25,
    paddingVertical:10,
    alignItems:'center',
    marginLeft:40,
    marginRight:20,

  },
  buttonText:{
    fontFamily: 'Segoe UI',
    color:'white',
    fontSize:15,
    fontWeight:'200',
  },
});