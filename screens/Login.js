import React,{Component} from 'react';
import { View,StyleSheet,Text,Button,TouchableOpacity,TextInput, ScrollView,Alert } from 'react-native';
import BackArrow from '../components/backArrow';
import Axios from 'axios';
import { Loading }from '../components/Loading';
import deviceStorage from '../services/deviceStorage';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
          loading: false,
          //error:'',
         // errors:[]
        };
        
    }

    loginUser = () =>{
        //TODO validation and error text
        this.setState({loading:true})
        const user = {
           email:this.state.email,
           password:this.state.password
       }
       Axios
         .post('http://10.0.2.2:5000/users/login',user)
         .then(res=>{
             console.log('request status = '+res.status);
            if(res.status === 200){
                deviceStorage.saveItem('id',res.data.id);
                this.props.newID(res.data.id)
                deviceStorage.saveItem("jwtToken", res.data.token);
                this.props.newJWT(res.data.token);
                Alert.alert('Successfuly loged in')
            }
            this.setState({loading:false})
         })
         .catch(err=>{
             console.log(err);
             if(err.response.status ===400){
                 Alert.alert("Incorrect Email or Password");
                // console.log('err.response = '+err.response.data);
                // console.log('err.response = '+err.response.status);
                // console.log('err.response = '+err.response.headers);
                // console.log('err.response = '+err.response);
             }
            else if(err.response.status ===404){
                 Alert.alert("Network Error")
            }
            else{
             console.log('err.message = '+err.message)
            }
           // console.log(err.config);
            // this.setState({errors:err.response.data})
             this.setState({loading:false})
           //  Alert.alert('Login Failed')
         })
    }

    render(){
        const { loading,email,password,error } = this.state;
        if(loading){
            return(
                    <Loading size={"large"}/>
            )
        }
        else{
            return(
                <View style={styles.container}> 
                    <ScrollView>
                    <BackArrow  />
                    <Text style={styles.headerText}>Log in</Text> 
                    <View style={styles.card}>
                        {/* <Text style={styles.errorText}>{error}</Text> */}
                        <Text style={ styles.inputTitles }>Email</Text>
                        <TextInput
                            placeholder={'Email'}
                            onChangeText={(email)=>{this.setState({email})}}
                            value={email}
                            style={styles.textInput}
                        />
                        <Text style={ styles.inputTitles }>Password</Text>
                        <TextInput
                            placeholder={'Password'}
                            onChangeText={(password)=>{this.setState({password})}}
                            value={password}
                            style={styles.textInput}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.loginUser}
                    >
                        <Text style={styles.buttonText}> Log In </Text>
                    </TouchableOpacity>
                    <Text 
                        style={styles.loginText}
                        //onpress
                    >
                        Don't have account? Click here to Sign Up
                    </Text> 
                    </ScrollView>
                </View>    
            );
        }
    }
}

const styles = StyleSheet.create({

    container:{
        fontFamily: 'Segoe UI',
        flex: 1,
        backgroundColor: '#E4E4E4',
    },
    headerText:{
        fontSize:30,
        fontFamily: 'Segoe UI',
        fontWeight:'500',
        marginTop:55,
        marginLeft:30,
    },
    card:{
        borderRadius: 6,
        backgroundColor: 'white',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: 1},
       // marginHorizontal: 4,
        marginLeft: 35,
        top: 100,
        height: 250,
        width: '80%',
        margin: 'auto',
        position: 'relative',
      //  zIndex: -1,
    },
    inputTitles:{
        marginLeft:25,
        fontFamily: 'Segoe UI',
        fontSize:18,
        marginTop:30,   
    },
    textInput:{
        marginLeft:20,
        fontFamily: 'Segoe UI',
        fontSize:15,
        color: '#404040',
        width: '80%',
        borderColor: "#ccc",
        borderBottomWidth: 1,
      //  borderWidth:1,
      //  borderRightWidth:10,
      //  backgroundColor:'white',
    },
    errorText:{
        color:'red',
        fontSize:13,
        marginLeft:25,
    },
    button:{
        backgroundColor:'green',
        marginTop:200,
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
    loginText:{
        fontFamily: 'Segoe UI',
        fontSize:16,
        color:'green',
        marginLeft:70,
        marginTop:10
    }
})