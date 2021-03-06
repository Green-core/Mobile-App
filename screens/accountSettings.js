import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {GreenButtonSmall} from './../components/customButtons'; 
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import { withAppContext } from '../services/withAppContext'
import baseURL  from '../config'


//form validator
const validationScheme = yup.object({
  newPassword: yup.string().min(1),
  reTypeNewPassword: yup.string().min(1),
  oldPassword: yup.string().min(1),
});

 class AccountSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      updated_at: new Date(),
      oldPassword: '',
      reNewPassword: '',
      password: '',
    };
    this.updateValues = this.updateValues.bind(this);
  }

  componentDidMount() {
    //get profile details usind _id
    const {id,jwt} = this.props.context.state.user;
    axios
      .get(
        `${baseURL}/users/get/${id}`,
      )
      .then((res) => {
        const userData = res.data;

        this.setState({...userData, enabled: true});
      })
      .catch((error) => console.log(error));
  }

  updateValues(values) {
    const {id,jwt} = this.props.context.state.user;
    Keyboard.dismiss();

    if (values.newPassword != values.reNewPassword) {
      ToastAndroid.show('Re enter new password correctly', ToastAndroid.SHORT);
    } else {
      const checkPassword = {
        id,
        password: values.oldPassword,
      };

      axios
        .post(`${baseURL}/users/check`, checkPassword)
        .then((res) => {
          const result = res.data;
          console.log(result);
          if (!result) {
            ToastAndroid.show(
              'Re enter old password correctly',
              ToastAndroid.SHORT,
            );
          } else {
            axios
              .put(
                `${baseURL}/users/update/`,
                { id,
                  password: values.newPassword},
              )
              .then((res) => {
                ToastAndroid.show('Update succesfull !', ToastAndroid.SHORT);
              }).catch((error) => console.log(error));;
          }
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}> 

          <View style={{height: 590}}> 
            <View style={styles.card}>
              <Formik
                initialValues={{
                  newPassword: '',
                  reNewPassword: '',
                  oldPassword: '',
                }}
                enableReinitialize
                validationSchema={validationScheme}
                onSubmit={(values) => {
                  this.updateValues(values);
                }}>
                {(props) => (
                  <View>
                    <Text style={styles.inputTitles}>New password</Text>
                    <TextInput
                      placeholder={'Enter new password here'}
                      secureTextEntry={true}
                      onChangeText={props.handleChange('newPassword')}
                      value={props.values.newPassword}
                      style={[
                        styles.inputs,
                        ,
                        props.errors.newPassword
                          ? styles.errorText
                          : styles.inputs,
                      ]}
                    />

                    <Text style={styles.inputTitles}>
                      Re enter new password
                    </Text>
                    <TextInput
                      placeholder={'re-enter new password'}
                      secureTextEntry={true}
                      onChangeText={props.handleChange('reNewPassword')}
                      value={props.values.reNewPassword}
                      style={[
                        styles.inputs,
                        props.errors.reNewPassword
                          ? styles.errorText
                          : styles.inputs,
                      ]}
                    />
                    <Text style={styles.inputTitles}>Old password</Text>
                    <TextInput
                      placeholder={'Enter old password here'}
                      secureTextEntry={true}
                      onChangeText={props.handleChange('oldPassword')}
                      value={props.values.oldPassword}
                      style={[
                        styles.inputs,
                        props.errors.oldPassword
                          ? styles.errorText
                          : styles.inputs,
                      ]}
                    />
                    <Text style={styles.infoText}>
                      {' '}
                      Minimum password length is 6 characters
                    </Text>
                    <View style={styles.buttoContainer}>
                      <GreenButtonSmall
                        text={'Save changes'}
                        onPress={props.handleSubmit}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#E4E4E4',
  },

  buttoContainer: {
    position: 'relative',
    marginTop: 20,
    alignItems: 'center',
  },

  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
    top: 72,
  },

  infoText: {
    fontFamily: 'Segoe UI',
    fontSize: 14,
    position: 'relative',
    left: '7%',
    top: '7%',
    marginTop: 1,
  },

  inputTitles: {
    fontFamily: 'Segoe UI',
    fontSize: 18,
    position: 'relative',
    left: '7%',
    top: '8%',
    marginTop: 12,
  },

  cardContent: {
    paddingHorizontal: '10%',
    marginHorizontal: 10,
  },

  inputs: {
    marginTop: 16,
    top: '2%',
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
    width: '70%',
    marginHorizontal: '15%',
    fontFamily: 'Segoe UI',
    fontSize: 16,
    color: '#404040',
    paddingTop: 5,
    paddingBottom: 1,
  },

  errorText: {
    color: 'red',
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 4,
    left: '6.5%',
    top: 120,
    height: 390,
    width: '85%',
    margin: 'auto',
    position: 'relative',
  },
});
export default withAppContext(AccountSettingsScreen);
