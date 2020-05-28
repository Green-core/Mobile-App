import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput, ToastAndroid,Keyboard,
} from 'react-native';
import {GreenButtonSmall} from './../components/customButtons';
import MenuBar from '../components/menuBar';
import axios from 'axios';
import { Formik} from 'formik';

export default class ProfileSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mobile: '',
      updated_at: new Date(),
      enabled: false,
    };
    this.updateValues = this.updateValues.bind(this);
  }

  modules = '';
  componentDidMount() {
    //get profile details usind _id
    axios
      .get(
        ' https://ancient-temple-30883.herokuapp.com/users/get/5ecb578fb2b10b0844de4cff',
      )
      .then((res) => {
        const userData = res.data;
        this.setState({...userData, enabled: true});
      })
      .catch((error) => console.log(error));
  }

  updateValues(values) {
    Keyboard.dismiss();
    const newUser = {
      name:values.name,
      mobile:parseInt(values.mobile , 10),//convert string to int 
      updated_at: new Date()
    };

    console.log(JSON.stringify({...values }, null, 2));
     axios
    .put(
      ' https://ancient-temple-30883.herokuapp.com/users/update/5ec66db7aa16ff3a80870c9a', newUser
    )
    .then((res) => {
      const userData = res.data;
     // console.log(JSON.stringify(userData))   
     ToastAndroid.show('Update succesfull !', ToastAndroid.SHORT);
    })
    .catch((error) => console.log(error)); 

 
  }

  render() {
    console.log(JSON.stringify(this.state.mobile + '+' + this.state.name));
    return (
      <View style={styles.container}>
        <MenuBar />

        <View>
          <Text style={styles.titleText}>Profile settings</Text>

          <View style={styles.card}>
            <Formik
              initialValues={{
                name: this.state.name,
                mobile:  this.state.mobile.toString(),
              }}
              enableReinitialize
              onSubmit={(values) => {
                this.updateValues(values);
              }}>
              {(props) => (
                <View>
                  <Text style={styles.inputTitles}>Name</Text>
                  <TextInput
                    placeholder={'Enter new username here'}
                    onChangeText={props.handleChange('name')}
                    value={props.values.name}
                    style={styles.inputs}
                    editable={this.state.enabled}
                  />

                  <Text style={styles.inputTitles}>Mobile No</Text>
                  <TextInput
                    placeholder={'Enter new Mobile No. here '}
                    onChangeText={props.handleChange('mobile')}
                    value={props.values.mobile}
                    style={styles.inputs}
                    editable={this.state.enabled}
                    keyboardType={'number-pad'}
                  />

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },

  buttoContainer: {
    position: 'relative',
    marginTop: 60,
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
    top: 72,
  },

  inputTitles: {
    fontFamily: 'Segoe UI',
    fontSize: 18,
    position: 'relative',
    left: '7%',
    top: '18%',
    marginTop: 12,
  },

  cardContent: {
    paddingHorizontal: '10%',
    marginHorizontal: 10,
  },

  inputs: {
    marginTop: 16,
    top: '10%',
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

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 4,
    left: '6.5%',
    top: 100,
    height: 380,
    width: '85%',
    margin: 'auto',
    position: 'relative',
    zIndex: -1,
  },
});
