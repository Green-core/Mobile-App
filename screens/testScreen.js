import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {  Formik} from 'formik'; 
import React, { Component } from 'react';

class Demo extends Component {

    render(){
       
  return ( 
      <View style={styles.container}> 
        <Text style={styles.titleText}>Profile settings</Text> 
        <View style={styles.card}>
              <Formik
                initialValues={{
                  name: '',
                  mobile: '',
                }}
                onSubmit={(values) => {
                  console.log(JSON.stringify(values));
                }}>
                {(props) => (
                  <View>
                    <TextInput
                      placeholder={'name'}
                      onChangeText={props.handleChange('name')}
                      value={props.values.name}
                      style={styles.cardTextSmall}
                    />

                    <TextInput
                      placeholder={'email'}
                      onChangeText={props.handleChange('mobile')}
                      value={props.values.mobile}
                      style={styles.cardTextSmall}
                    />

                    <Button 
                    title={'submit'}
                    />
                  </View>
                )}
              </Formik>

              <View style={styles.centerButton}></View>
            </View>
      </View> 
  );
}; 
}

const styles = StyleSheet.create({  
  centerButton: {
    top: '1%',
    alignContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    position: 'relative',
    left: '7%',
    top: 72,
  },

  cardContent: {
    paddingHorizontal: '10%',
    marginHorizontal: 10,
  },

  cardTextLarge: {
    paddingTop: '15%',
    fontSize: 18,
    color: '#A6A6A6',
    fontFamily: 'Segoe UI',
  },

  cardTextSmall: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontFamily: 'Segoe UI',
    fontSize: 18,
    color: '#404040',
  },

  cardTextModule: {
    paddingLeft: '15%',
    paddingTop: '2%',
    fontFamily: 'Segoe UI',
    fontSize: 18,
    width: '100%',
    color: '#404040',
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'red',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 4,
    left: '6.5%',
    top: 20,
    height: '78%',
    width: '85%',
    margin: 'auto',
    position: 'relative',
    zIndex: -1,
  },
});

export default Demo;
