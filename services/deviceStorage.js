import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

const deviceStorage = {
    //asynstorage functions
    // save items in asyncstorage
    async saveItem(key,value){
        try{
            await AsyncStorage.setItem(key,value);
        }
        catch(err){
            console.log("AsyncStorage error "+ err.message);
        }
    },
    // load jwt token
    async loadJWT() {
        try {
          const value = await AsyncStorage.getItem('jwtToken');
          if (value !== null) {
            this.setState({
              jwt: value,
              loading: false
            });
          } 
          else {
            this.setState({
              loading: false
            });
          }
        } catch (err) {
          console.log('AsyncStorage Error: ' + err.message);
        }
    },
    // delete jwt token
    async deleteJWT() {
        try{
          await AsyncStorage.removeItem('jwtToken')
          .then(() => {
              this.setState({
                jwt: ''
              })
              Alert.alert('Log Out Success!');
            }
          );
        } catch (err) {
          console.log('AsyncStorage Error: ' + err.message);
        }
      }
};

export default deviceStorage