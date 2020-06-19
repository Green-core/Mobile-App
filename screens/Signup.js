import React,{Component} from 'react';
import { View,StyleSheet,Text,Button,TouchableOpacity,TextInput,ScrollView,Alert } from 'react-native';
import BackArrow from '../components/backArrow';
import { Loading }from '../components/Loading';
import Axios from 'axios';
import deviceStorage from '../services/deviceStorage';

export default class Signup extends Component{

    constructor(props){        
        super(props);        
        this.state={
           name :'',         
           email:'',
           password: '' ,
           confirmPassword:'',
           error:'',
           loading:false,
        }   
    }

    registerUser = () => {
// TODO validation show error text
       this.setState({loading:true})
        const user = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        }
        Axios
           .post("http://10.0.2.2:5000/users/register",user)  
           .then(res=>{
                if(res.status === 200){
                    console.log(res.data)
                    //this.setState({loading:false});
                    Alert.alert('Successfuly registered')
               }
               else{
                    console.log(res.err);
               }
               this.setState({loading:false});
           })
           .catch(err=>{
               console.log(err)
               this.setState({loading:false});
               Alert.alert('Failed')
           })
    }

    render(){
        const { loading,email,password,name,confirmPassword } = this.state;
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
                    <ScrollView>
                    <BackArrow  />
                    <Text style={styles.headerText}>Sign Up</Text> 
                    <View style={styles.card}>
                        <Text style={styles.inputTitles}>Name</Text>
                        <TextInput
                            placeholder={'Name'}
                            style={styles.textInput}
                            onChangeText={(name)=>{this.setState({name})}}
                            value = {name}
                        />
                        <Text style={ styles.inputTitles }>Email</Text>
                        <TextInput
                            placeholder={'Email'}
                            style={styles.textInput}
                            onChangeText={(email)=>{this.setState({email})}}
                            value = {email}
                        />
                        <Text style={ styles.inputTitles }>Password</Text>
                        <TextInput
                            placeholder={'Password'}
                            secureTextEntry={true}
                            style={styles.textInput}
                            onChangeText={(password)=>{this.setState({password})}}
                            value = {password}
                        />
                        <Text style={ styles.inputTitles }>Confirm Password</Text>
                        <TextInput
                            placeholder={'Confirm Password'}
                            secureTextEntry={true}
                            style={styles.textInput}
                            onChangeText={(confirmPassword)=>{this.setState({confirmPassword})}}
                            value = {confirmPassword}
                        />
                    </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.registerUser}
                        >
                            <Text style={styles.buttonText}> Sign up </Text>
                        </TouchableOpacity>
                        <Text 
                            style={styles.loginText}
                            //TODO noavigation to login 
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
       
      //  marginLeft:35,
     //   marginTop:60,
        fontFamily: 'Segoe UI',
        borderRadius: 6,
        backgroundColor: 'white',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: 1},
       // marginHorizontal: 4,
        marginLeft: 40,
        top: 45,
        height: 370,
        width: '80%',
        margin: 'auto',
        position: 'relative',
        //zIndex: -1,

    },
    inputTitles:{
        marginLeft:25,
        fontFamily: 'Segoe UI',
        fontSize:18,
        marginTop:15,
        
    },
    textInput:{
        marginLeft:25,
        fontFamily: 'Segoe UI',
        fontSize:15,
      //  marginTop:0,
        color: '#404040',
        width: '80%',
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },
    button:{
        backgroundColor:'green',
        marginTop:80,
        padding:9,
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
        color:'green',
        fontSize:16,
        marginLeft:55,
        marginTop:10

    }



})