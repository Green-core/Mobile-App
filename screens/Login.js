import React,{Component} from 'react';
import { View,StyleSheet,Text,TextInput, ScrollView,Alert,KeyboardAvoidingView } from 'react-native';
import Axios from 'axios';
import { Loading }from '../components/Loading';
import deviceStorage from '../services/deviceStorage';
import {  GreenButtonSmall} from './../components/customButtons';
import { withAppContext } from '../services/withAppContext'

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
          loading: false,
          //error:'',
        };
        
    }

    loginUser = () =>{
        this.setState({loading:true})
        const user = {
           email:this.state.email,
           password:this.state.password
       }
       //'https://ancient-temple-30883.herokuapp.com/users/login'
       Axios
         .post("https://ancient-temple-30883.herokuapp.com/users/login",user)
         .then(res=>{
            if(res.status === 200){
               // console.log('res = ',res.data.response)
                deviceStorage.saveItem('id',res.data.id);
                deviceStorage.saveItem("jwtToken", res.data.token);
                Alert.alert('Successfuly login')
                const data ={
                    id:res.data.id,
                    email:res.data.email,
                    jwt:res.data.token
               }
               //  console.log("Login  data = ",data)
                // console.log("login context",this.props.context)
                 this.props.context.setData(data);

                this.props.navigation.reset({
                    key:null,     //go to the root navigator
                    index: 0,     //go to first screen
                    routes: [{ name: 'App' }],
                  });
            }
            this.setState({loading:false})
         })
         .catch(err=>{
            console.log(err)
            if(err.response){
                console.log('res',err.response);
                if(err.response.status === 400){
                    Alert.alert("Incorrect Email or Password");
                }
                else if(err.response.status === 404){
                    Alert.alert("Network Error")
                }
                else if(err.response.status === 403){
                    Alert.alert(err.response.data.err)
                }
            }
            else{
                console.log('err.message = '+err.message);
                Alert.alert(err.message);
            }
             this.setState({loading:false,email:'',password:''})
         })
    }

    render(){
      //  console.log('login props',this.props)
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
                    <Text style={styles.headerText}>Log In</Text>
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
                        onPress={()=>this.props.navigation.navigate('RequestEmail')}
                    >
                        Forgot Password
                    </Text> 
                    <View style={styles.centerButton} >
                        < GreenButtonSmall text={"Log In"} onPress={this.loginUser} />   
                    </View>
                    <Text 
                        style={styles.loginText}
                        onPress={()=>this.props.navigation.navigate('Signup')}
                    >
                        Don't have an account? Click here to Sign Up
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
        top: 80,
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
        top:100,
        textDecorationLine:'underline'
    },
    centerButton:{ 
        marginTop:100,
       // alignContent:'center',
        alignItems:'center', 
      },
})

export default withAppContext(Login);