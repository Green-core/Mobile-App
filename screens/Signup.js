import React,{Component} from 'react';
import { View,StyleSheet,Text,Button,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import BackArrow from '../components/backArrow';

export default class Signup extends Component{

    render(){
        return(
            <View style={styles.container}> 
                <ScrollView>
                <BackArrow  />
                <Text style={styles.headerText}>Sign Up</Text> 
                <View style={styles.card}>
                    <Text style={ styles.inputTitles }>User Name</Text>
                    <TextInput
                        placeholder={'User Name'}
                        style={styles.textInput}
                    />
                    <Text style={ styles.inputTitles }>Email</Text>
                    <TextInput
                        placeholder={'Email'}
                        style={styles.textInput}
                    />
                    <Text style={ styles.inputTitles }>Password</Text>
                    <TextInput
                        placeholder={'Password'}
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                    <Text style={ styles.inputTitles }>Confirm Password</Text>
                    <TextInput
                        placeholder={'Confirm Password'}
                        secureTextEntry={true}
                        //  onChangeText={props.handleChange('mobile')}
                        //  value={props.values.mobile}
                        style={styles.textInput}
                    />
                </View>
                    <TouchableOpacity
                        style={styles.button}
                        //onPress={this.onPress}
                    >
                        <Text style={styles.buttonText}> Sign up </Text>
                    </TouchableOpacity>
                    <Text 
                        style={styles.loginText}
                        //onpress
                    >
                        Already have an account ? Click here to Sign in
                    </Text> 
                </ScrollView>
            </View>
        );

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
        top: 55,
        height: 400,
        width: '80%',
        margin: 'auto',
        position: 'relative',
        //zIndex: -1,

    },
    inputTitles:{
        marginLeft:25,
        fontFamily: 'Segoe UI',
        fontSize:18,
        marginTop:25,
        
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
        marginTop:95,
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
        marginLeft:55,
        marginTop:10

    }



})