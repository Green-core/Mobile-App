import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {GreenButtonSmall} from '../components/customButtons';
import {Loading} from '../components/Loading';
import Axios from 'axios';
import baseURL  from '../config'
export default class VerifyToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      error: '',
      loading: false,
    };
  }

  sendToken = () => {
    this.setState({loading: true});
    console.log(this.props.route.params.email);
    const user = {
      email: this.props.route.params.email,
      token: this.state.token,
    };
    Axios.post(`${baseURL}/users/verifyEmail`, user)
      .then((res) => {
        if (res.status === 200) {
          //  console.log(res.data.response);
          Alert.alert(
            'Success',
            'Your email is verified',
            [{text: 'Ok', onPress: () => {}}],
            {cancelable: false},
          );
          this.props.navigation.reset({
            key: 'null',
            index: 0,
            routes: [{name: 'Auth'}],
          });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 422) {
            console.log(err.response.data[0].msg);
            this.setState({error: err.response.data[0].msg});
          } else if (err.response.status === 400) {
            console.log(err.response.data.err);
            this.setState({error: err.response.data.err});
          }
        } else {
          console.log('err.message = ' + err.message);
          Alert.alert(err.message);
        }
        this.setState({loading: false, token: ''});
      });
  };

  render() {
    const {error, token, loading} = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <Loading size={'large'} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.headerText}>Verify Token</Text>
          <KeyboardAvoidingView enabled>
            <View style={styles.card}>
              <Text style={styles.inputTitles}>
                Enter the token sent to your email address
              </Text>
              <TextInput
                placeholder={'Token'}
                autoCapitalize="none"
                style={styles.TextInput}
                onChangeText={(token) => {
                  this.setState({token});
                }}
                value={token}
              />
              <Text style={styles.errorText}> {error}</Text>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.centerButton}>
            <GreenButtonSmall text={'Submit'} onPress={this.sendToken} />
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
    marginLeft: 40,
    top: 70,
    height: 170,
    width: '80%',
    marginBottom: 10,
    position: 'relative',
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
    top: 60,
    alignContent: 'center',
    alignItems: 'center',
  },
});
