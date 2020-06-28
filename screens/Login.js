import React,{Component} from 'react';
import { View,StyleSheet,Text,Button,TouchableOpacity,TextInput, ScrollView,Alert,KeyboardAvoidingView } from 'react-native';
import BackArrow from '../components/backArrow';
import Axios from 'axios';
import { Loading }from '../components/Loading';
import deviceStorage from '../services/deviceStorage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
          loading: false,
          success:false,
          //error:'',
         // errors:[]
        };
        
    }

    loginUser = () =>{
        this.setState({loading:true})
        const user = {
           email:this.state.email,
           password:this.state.password
       }
       Axios
         .post('http://10.0.2.2:5000/users/login',user)
         .then(res=>{
            if(res.status === 200){
                deviceStorage.saveItem('id',res.data.id);
                deviceStorage.saveItem("jwtToken", res.data.token);
                Alert.alert('Successfuly loged in')
                console.log(res.data);
                this.setState({success:true});
                this.props.navigation.navigate('App',{jwt:res.data.jwt})
            }
            this.setState({loading:false})
         })
         .catch(err=>{
             if(err.response.status ===400){
                 Alert.alert("Incorrect Email or Password");
             }
            else if(err.response.status ===404){
                 Alert.alert("Network Error")
            }
            else{
             Alert.alert('Login Failed')
             console.log('err.message = '+err.message)
            }
             this.setState({loading:false,email:'',password:''})
           //  Alert.alert('Login Failed')
         })
    }

    render(){
        console.log('login '+this.props)
      //  const {navigation} = this.props;
        const { loading,email,password,error } = this.state;
        if(loading){
            return(
                    <Loading size={"large"}/>
            )
        }
        else{
            return(
                <View style={styles.container}> 
                    <ScrollView keyboardShouldPersistTaps="handled">
                    {/* <BackArrow  /> */}
                    <Text style={styles.headerText}>Log in</Text>
                    {/* <KeyboardAvoidingView > */}
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
                    {/* </KeyboardAvoidingView>  */}
                    <Text 
                        style={styles.forgotText}
                        onPress={()=>Alert.alert("Reset password token has sent to your Email.Please Check Your Emails !")}
                    >
                        Forgot Password
                    </Text> 
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.loginUser}
                    >
                        <Text style={styles.buttonText}> Log In </Text>
                    </TouchableOpacity>
                    <Text 
                        style={styles.loginText}
                       onPress={()=>this.props.navigation.navigate('Signup')}
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
        marginLeft:65,
        marginTop:10
    },
    forgotText:{
        fontFamily: 'Segoe UI',
        fontSize:16,
        color:'green',
        marginLeft:150,
       // marginRight:50,
        top:140,
        textDecorationLine:'underline'
    }
})