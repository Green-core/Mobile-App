import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {GreenButtonSmall} from './../../components/customButtons';
import {Loading} from '../../components/Loading';
import axios from 'axios';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      error: '',
      loading: false,
    };
    //this.updateValues = this.updateValues.bind(this);
  }

  // componentDidMount() {

  //     this.initAuthToken();
  // }

  // initAuthToken = async () => {
  //     const authData = await AsyncStorage.getItem('authentication_data');

  //     if (authData !== null) {
  //       const authDataJson = JSON.parse(authData);

  //       // get user data
  //       fetch(consts.API_URL + '/users/populate-settings', {
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           authToken: authData.authToken,
  //           deviceId: authData.deviceId
  //         }),
  //         method: "POST"
  //       })
  //         .then(res => res.json())
  //         .then(data => {

  //           if (data.ack === 'success') {
  //             this.populateUserSettings(data.response);
  //           } else {
  //             this.props.navigation.navigate("SignIn");
  //           }
  //         })
  //         .catch(e => {
  //           this.setState({
  //             error: true
  //           });
  //         });

  //     } else {
  //       this.props.navigation.navigate("SignIn");
  //     }
  //   }
  resetPassword = () => {
    Alert.alert(
      'Success',
      'Password Successfully Reset.',
      [{text: 'Ok', onPress: () => {}}],
      {cancelable: false},
    );
    // axios requset
    //success navigate to login
    // failure prompt alert try again
  };

  render() {
    const {password, confirmPassword, error, loading} = this.state;

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
          <Text style={styles.headerText}>Reset Password</Text>
          <KeyboardAvoidingView enabled>
            <View style={styles.card}>
              <Text style={styles.inputTitles}>Enter your New Password</Text>
              <TextInput
                placeholder={'Password'}
                autoCapitalize="none"
                secureTextEntry={true}
                style={styles.TextInput}
                onChangeText={(password) => {
                  this.setState({password});
                }}
                value={password}
              />
              <Text style={styles.errorText}> {error}</Text>

              <Text style={styles.inputTitles}>Confirm your New Password</Text>
              <TextInput
                placeholder={'Confirm Password'}
                secureTextEntry={true}
                autoCapitalize="none"
                style={styles.TextInput}
                onChangeText={(confirmPassword) => {
                  this.setState({confirmPassword});
                }}
                value={confirmPassword}
              />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.centerButton}>
            <GreenButtonSmall
              text={'Reset Password'}
              onPress={() => this.props.navigation.navigate('Login')}
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
    top: 50,
    height: 220,
    width: '80%',
    marginBottom: 10,
    position: 'relative',
    //zIndex: -1,
  },
  inputTitles: {
    marginLeft: 25,
    fontFamily: 'Segoe UI',
    fontSize: 16,
    marginTop: 15,
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
    top: 40,
    alignContent: 'center',
    alignItems: 'center',
  },
});
