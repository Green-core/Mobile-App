import React,{Component} from 'react';
import { View,StyleSheet,Text,Button,Image,TouchableOpacity } from 'react-native';
const logo = require('../assets/images/Logo.png');

class Welcome extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Welcome to Green Core
                </Text>
                {/* <Image style={styles.image} source={logo}/> */}
                <TouchableOpacity
                    style={styles.button}
                    //onPress={this.onPress}
                >
                    <Text style={styles.buttonText}> Log in </Text>
                </TouchableOpacity>

            </View>
        );
    }


}

const styles = StyleSheet.create({

    container:{
        fontFamily: 'Segoe UI',
       // backgroundColor:'lightgreen',

    },
    titleText:{
        fontFamily: 'Segoe UI',
        fontSize:30,
        fontWeight:'600',
        color:'green',
        marginTop:40,
        textAlign:'center',

    },
    image:{
       // width:'200',
        //height:'300',
        marginTop:'50',
        position:"absolute",
        resizeMode : 'stretch'
    },
    button:{
        backgroundColor:'green',
        marginTop:410,
        padding:10,
        alignItems:'center',
        marginLeft:100,
        marginRight:100,

    },
    buttonText:{
        color:'white',
        fontSize:20,
        fontFamily: 'Segoe UI',
     //   fontWeight:'200',
    }


})

export default Welcome;