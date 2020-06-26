import React,{Component} from 'react';
import { View,StyleSheet,Text,Button,Image,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const logo = require('../assets/images/Logo.png');

class Welcome extends Component{

    constructor(props) {
        super(props);
        this.state = {
         // timePassed:false,
        };
    }
    // setTimePassed = () =>{
    //     this.setState({timePassed:true})
    //   }

    componentDidMount(){
        setTimeout(() => {
           // this.setTimePassed();
            AsyncStorage.getItem('jwtToken').then((token) => {
                this.props.navigation.navigate(
                    token === null ? 'Auth' : 'App'
                )
                console.log(token)
            })  
        }, 2000);
        console.log('after time out')
    }

    render(){
        return(
            <View style={styles.container}>
                {/* <Text style={styles.titleText}>
                    Welcome to Green Core
                </Text> */}
                <Image style={{ width: 230, height: 250 ,resizeMode : 'contain',top:180}} source={logo}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        fontFamily: 'Segoe UI',
        alignItems:'center',
        //backgroundColor:'white',
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