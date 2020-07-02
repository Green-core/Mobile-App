import React,{Component} from 'react';
import { View,StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const logo = require('../assets/images/Logo.png');

class Welcome extends Component{

    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        setTimeout(() => {
            AsyncStorage.getItem('jwtToken').then((token) => {
                this.props.navigation.replace(
                    token === null ? 'Auth' : 'App'
                )    
            })  
        }, 2000);
    }

    render(){
        return(
            <View style={styles.container}>
                <Image style={{ width: 230, height: 250 ,resizeMode : 'contain',top:180}} source={logo}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        fontFamily: 'Segoe UI',
        alignItems:'center',
        backgroundColor:'white',
        flex:1,
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
        width:'200',
        height:'300',
        marginTop:'50',
        resizeMode : 'stretch'
    },
})

export default Welcome;