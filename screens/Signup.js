import React,{Component} from 'react';
import { View,StyleSheet,Text,ScrollView,Alert,KeyboardAvoidingView,TextInput } from 'react-native';
import Axios from 'axios';

import { Loading }from '../components/Loading';
import {   GreenButtonSmall} from './../components/customButtons';
import baseURL  from '../config'
export default class Signup extends Component{

    constructor(props){        
        super(props);        
        this.state={
           name :'',         
           email:'',
           password: '' ,
           confirmPassword:'',
           errors:[],
           loading:false,
           statusError:'',
        }   
    }

    registerUser = () => {
       this.setState({loading:true})
        const user = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        }
        Axios
           .post(`${baseURL}/users/register`,user)  
           .then(res=>{
                if(res.status === 200){
                    // console.log(res.data)
                    Alert.alert('Successfuly Registered');
                    this.setState({loading:false});
                    this.props.navigation.navigate('VerifyEmail',{email:user.email})
                    // this.props.navigation.reset({
                    //     key:'null',
                    //     index: 0,
                    //     routes: [{ name: 'Auth' }],
                    //   });
                }
               this.setState({loading:false});
           })
           .catch(err=>{
                console.log(err)
                if(err.response){
                    console.log('res',err.response);
                    if(err.response.status === 422){     
                        this.setState({errors:err.response.data});         
                        Alert.alert('Sign Up Failed');
                        //Alert.alert("Network Error");
                    }
                    else{
                        this.setState({statusError:'Network Error'})
                        this.setState({errors:err.response.data});
                    }
                }
                else{
                    console.log('err.message = '+err.message);
                }
                this.setState({loading:false});
            })
    }

    errFilter = (key) =>{
        const {errors} = this.state;
        if(errors && errors.length){
            let data = errors.filter((err) => err.param ==key).map((param)=>{return param.msg });
            console.log(data[0])
            return data[0];
        }
        else{
            let data = []
            return data[0]='';
        }
    }

    render(){
        const { loading,email,password,name,confirmPassword,statusError} = this.state;
        if(loading){
            return(
                <View style={styles.container}> 
                    <Loading size={"large"}/>
                </View>
            )
        }
        else{
            return(
                <View style={styles.container}> 
                    <ScrollView keyboardShouldPersistTaps="handled">
                    <Text style={styles.headerText}>Sign Up</Text> 
                    <KeyboardAvoidingView enabled>
                    <View style={styles.card}>
                        <Text style={styles.errorText}>{statusError}</Text>
                        <Text style={styles.inputTitles}>Name</Text>
                        <TextInput
                            placeholder={'Name'}
                            style={styles.TextInput}
                            onChangeText={(name)=>{this.setState({name})}}
                            value = {name}
                        />
                        <Text  style={styles.errorText}> {this.errFilter('name')}</Text>

                        <Text style={styles.inputTitles}>Email</Text>
                        <TextInput
                            placeholder={'Email'}
                            keyboardType='email-address'
                            autoCapitalize = "none"
                            style={styles.TextInput}
                            onChangeText={(email)=>{this.setState({email})}}
                            value = {email}
                        />
                        <Text  style={styles.errorText}> {this.errFilter('email')}</Text>

                        <Text style={ styles.inputTitles }>Password</Text>
                        <TextInput
                            placeholder={'Password'}
                           // keyboardType='visible-password'
                            autoCapitalize = "none"
                            secureTextEntry={true}
                            style={styles.TextInput}
                            onChangeText={(password)=>{this.setState({password})}}
                            value = {password}
                        />
                        <Text  style={styles.errorText}> {this.errFilter('password')}</Text>

                        <Text style={ styles.inputTitles }>Confirm Password</Text>
                        <TextInput
                            placeholder={'Confirm Password'}
                            secureTextEntry={true}
                            autoCapitalize = "none"
                            style={styles.TextInput}
                            onChangeText={(confirmPassword)=>{this.setState({confirmPassword})}}
                            value = {confirmPassword}
                        />
                        <Text  style={styles.errorText}> {this.errFilter('confirmPassword')}</Text>    
                    </View>
                    </KeyboardAvoidingView>

                    <View style={styles.centerButton} >
                        < GreenButtonSmall text={"Sign Up"} onPress={this.registerUser} />   
                    </View>
                    <Text 
                        style={styles.loginText}
                        onPress={()=>{this.props.navigation.navigate('Login')}}
                    >
                        Already have an account ? Click here to Sign in
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
        fontFamily: 'Segoe UI',
        borderRadius: 6,
        backgroundColor: 'white',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: 1},
       // marginHorizontal: 4,
        marginLeft: 40,
        top: 30,
        height: 400,
        width: '80%',
        marginBottom: 10,
        position: 'relative',
        //zIndex: -1,
    },
    inputTitles:{
        marginLeft:25,
        fontFamily: 'Segoe UI',
        fontSize:16,
        marginTop:6,     
    },
    TextInput:{
        marginLeft:25,
        fontFamily: 'Segoe UI',
        fontSize:15,
        color: '#404040',
        width: '80%',
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },
    errorText:{
        color:'red',
        fontSize:13,
        marginLeft:25,
    },
    loginText:{
        fontFamily: 'Segoe UI',
        color:'green',
        fontSize:16,
        marginLeft:55,
        marginTop:13,
    },
    centerButton:{ 
        top:'1%',
        alignContent:'center',
        alignItems:'center', 
      },
})