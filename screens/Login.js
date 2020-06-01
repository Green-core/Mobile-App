import React,{Component} from 'react';
import { View,StyleSheet,Text,Button,TouchableOpacity,TextInput } from 'react-native';
import BackArrow from '../components/backArrow';

export default class Login extends Component{

    render(){
        return(
            <View style={styles.container}> 
                <BackArrow  />
                <Text style={styles.headerText}>Log in</Text> 
                <View style={styles.loginBox}>
                    <Text style={ styles.inputTitles }>Email</Text>
                    <TextInput
                        placeholder={'Email'}
                        //  onChangeText={props.handleChange('name')}
                        //  value={props.values.name}
                        style={styles.textInput}
                    />
                    <Text style={ styles.inputTitles }>Password</Text>
                    <TextInput
                        placeholder={'Password'}
                        //  onChangeText={props.handleChange('mobile')}
                        //  value={props.values.mobile}
                        style={styles.textInput}
                        secureTextEntry={true}
                    />
                 </View>
                <TouchableOpacity
                    style={styles.button}
                    //onPress={this.onPress}
                >
                    <Text style={styles.buttonText}> Log in </Text>
                </TouchableOpacity>
                <Text 
                    style={styles.loginText}
                    //onpress
                >
                     Don't have account? Click here to signup
                </Text> 
          </View>
        );

    }
}

const styles = StyleSheet.create({

    container:{
        fontFamily: 'Segoe UI',
        flex: 1,
        backgroundColor: '#E4E4E4',
       // backgroundColor:'lightgreen',

    },
    headerText:{
        fontSize:30,
        fontFamily: 'Segoe UI',
        fontWeight:'500',
       // color:'green',
        marginTop:55,
        marginLeft:30,
       // textAlign:'center',

    },
    loginBox:{
       
      //  marginLeft:35,
     //   marginTop:60,
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
      //  marginTop:0,
       // marginLeft:20,
      //  marginRight:30,
        color: '#404040',
        width: '80%',
      //  alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,
      //  borderWidth:1,
      //  borderRightWidth:10,
        
      //  backgroundColor:'white',

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
        color:'green',
        marginLeft:70,
        marginTop:10

    }



})