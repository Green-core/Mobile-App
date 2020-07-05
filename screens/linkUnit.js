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
import {Picker} from '@react-native-community/picker';
import {GreenButtonSmall} from '../components/customButtons';
import MenuBar from '../components/menuBar';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import { withAppContext } from '../services/withAppContext'

//form validator
const validationScheme = yup.object({
  unitID: yup.string().min(1) ,
  deviceName: yup.string().min(2),
  location: yup.string().min(2),
  plantType: yup.string().min(2)
});

class LinkUnitsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      plants: [],
    };
    this.updateValues = this.updateValues.bind(this);

    axios
      .get('https://ancient-temple-30883.herokuapp.com/plants/get')
      .then((res) => {
        const plantData = res.data;
        this.setState({...this.state, plants: plantData});
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    //get profile details usind _id
    const {id,jwt} = this.props.context.state.user;
    axios
      .get(
        ` https://ancient-temple-30883.herokuapp.com/users/get/${id}`,
      )
      .then((res) => {
        const userData = res.data;
        this.setState({...this.state, user: userData, enabled: true});
      })
      .catch((error) => console.log(error));

    //get plant details usind _id
    axios
      .get('https://ancient-temple-30883.herokuapp.com/plants/get')
      .then((res) => {
        const plantData = res.data;
        this.setState({...this.state, plants: plantData});
      })
      .catch((error) => console.log(error));
  }

  updateValues(values) {
    Keyboard.dismiss();
    console.log(JSON.stringify(values, null, 2)); 
    console.log(JSON.stringify(values, null, 2));  
    const plantData  =   this.state.plants.filter(plant => (plant.plantName==values.plantType)); 
    const unit = {
      ownerID:this.state.user._id ,  
      deviceName:values.deviceName, 
      unitID:values.unitID, 
      plantType: values.plantType ,
      location: values.location , 
      updatedAt:new Date(),
    }
  
    console.log(JSON.stringify(unit))
     axios
     .put(
       ' https://ancient-temple-30883.herokuapp.com/units/update/'+values.unitID,unit
     )
     .then((res) => {  
      ToastAndroid.show('Update succesfull !', ToastAndroid.SHORT);
     })
     .catch((error) => console.log(error));
     console.log(JSON.stringify(plantData))
     
  }

  render() { 
    console.log(JSON.stringify(this.state, null, 2)); 
    const todoComponents = this.state.plants.forEach((item) => {
      console.log(item.plantName);
      return <Picker.Item label={item.plantName} value={item.plantName} />;
    });

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuBar />

          <View style={{height: 690}} key="a">
            <Text style={styles.titleText}>Link units</Text>

            <View style={styles.card}>
              <Formik
                initialValues={{ 
                  unitID: '',
                  deviceName: '',
                  location: '',
                  plantType:'Mango'
                }}
                enableReinitialize
                validationSchema={validationScheme}
                onSubmit={(values) => {
                  this.updateValues(values);
                }}>
                {(props) => (
                  <View>
                    <Text style={styles.inputTitles}>Unit ID</Text>
                    <TextInput
                      placeholder={'Enter new password here'}
                      onChangeText={props.handleChange('unitID')}
                      selectedValue ={props.values.unitID}
                      style={[
                        styles.inputs,
                        ,
                        props.errors.unitID
                          ? styles.errorText
                          : styles.inputs,
                      ]}
                    />

                    <Text style={styles.inputTitles}>Device name</Text>
                    <TextInput
                      placeholder={'unique name for a device'}
                      onChangeText={props.handleChange('deviceName')}
                      value={props.values.deviceName}
                      style={[
                        styles.inputs,
                        props.errors.deviceName
                          ? styles.errorText
                          : styles.inputs,
                      ]}
                    />
                    <Text style={styles.inputTitles}>Plant type</Text>

                    <Picker  
                       selectedValue={props.values.plantType} 
                       onValueChange={ props.handleChange('plantType') }
                      style={[
                        styles.plantTypePicker,
                        props.errors.plantType
                          ? styles.errorText
                          : styles.inputs,
                      ]} 
                      >
                      <Picker.Item label="Mango" value="Mango" />
                      <Picker.Item label="jambu" value="jambu" />
                      <Picker.Item label="Rambutan" value="Rambutan" /> 
                    </Picker>

                    <Text style={styles.inputTitles}>Location</Text>
                    <TextInput
                      placeholder={'Enter old password here'}
                      onChangeText={props.handleChange('location')}
                      value={props.values.location}
                      style={[
                        styles.inputs,
                        props.errors.location
                          ? styles.errorText
                          : styles.inputs,
                      ]}
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
    marginHorizontal: 100,
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

  plantTypePicker: {
    marginTop: 16,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
    width: '70%',
    marginHorizontal: '15%',
    fontFamily: 'Segoe UI',
    fontSize: 16,
    color: '#404040',
    paddingTop: 5,
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
    height: 510,
    width: '85%',
    margin: 'auto',
    position: 'relative',
  },
});
export default withAppContext(LinkUnitsScreen);
