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
    //  check email exist and valid
    //      if succeeefull sent email
    //          then suceess navigate to token page
    //      else
    //          try again alert
    // failure error text- enter valid email/if valid but not exist email is incorrect
    Alert.alert(
      ' Token sent',
      'Please check your email',
      [{text: 'Ok', onPress: () => {}}],
      {cancelable: false},
    );
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
              onPress={()=>this.props.navigation.navigate('VerifyToken')}
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
