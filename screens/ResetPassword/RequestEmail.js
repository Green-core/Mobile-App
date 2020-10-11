import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {GreenButtonSmall} from '../../components/customButtons';
import {Loading} from '../../components/Loading';
import Axios from 'axios';
import baseURL  from './../../config'
export default class RequestEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      loading: false,
    };
  }

  sendEmail = () => {
    this.setState({loading:true})
    Axios
      .post(`${baseURL}/users/forgotPassword`,{email:this.state.email})
      .then(res=>{
        if(res.status === 200){
          console.log(res.data.response);
          this.setState({loading:false})
          Alert.alert(
            ' Verify Code Sent',
            'Please check your emails',
            [{text: 'Ok', onPress: () => {}}],
            {cancelable: false},
          );
          this.props.navigation.navigate('VerifyToken',{email:this.state.email})
        }
        else{
          console.log(res)
        }
      })
      .catch(err=>{
        if(err.response){
          if(err.response.status === 422){
            console.log(err.response.data[0].msg)
            this.setState({error:err.response.data[0].msg})
          }
        }
        else{
          console.log('err.message = '+err.message);
          Alert.alert(err.message);
        }
        this.setState({loading:false,email:''})
      })
  };

  render() {
    const { email,error,loading } = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <Loading size={'large'} />
        </View>
      );
    } 
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.headerText}>Request for password reset</Text>
          {/* <ScrollView keyboardShouldPersistTaps="handled"> */}
          <KeyboardAvoidingView behavior="height">
            <View style={styles.card}>
              <Text style={styles.inputTitles}>
                Please provide your account email address to request a password
                reset code.
              </Text>
              <TextInput
                placeholder={'Email'}
                autoCapitalize="none"
                style={styles.TextInput}
                onChangeText={(email) => {
                  this.setState({email});
                }}
                value={email}
              />

              <Text style={styles.errorText}>{error}</Text>
            </View>
          </KeyboardAvoidingView>
          {/* </ScrollView> */}
          <View style={styles.centerButton}>
            <GreenButtonSmall
              text={'Submit'}
              onPress={this.sendEmail}
             // onPress={()=>this.props.navigation.navigate('VerifyToken')}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Segoe UI',
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Segoe UI',
    fontWeight: '500',
    marginTop: 55,
    marginLeft: 30,
  },
  card: {
    fontFamily: 'Segoe UI',
    borderRadius: 8,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    // marginHorizontal: 4,
    marginLeft: 40,
    top: 70,
    height: 180,
    width: '80%',
    marginBottom: 10,
    position: 'relative',
    //zIndex: -1,
  },
  inputTitles: {
    marginLeft: 25,
    marginRight: 5,
    fontFamily: 'Segoe UI',
    fontSize: 16,
    marginTop: 30,
  },
  TextInput: {
    marginLeft: 25,
    fontFamily: 'Segoe UI',
    fontSize: 15,
    color: '#404040',
    width: '80%',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 25,
  },
  centerButton: {
    top: 80,
    alignContent: 'center',
    alignItems: 'center',
  },
});
