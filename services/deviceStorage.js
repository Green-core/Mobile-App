import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

const deviceStorage = {
    //asynstorage functions
    // save items in asyncstorage
    async saveItem(key,value){
        try{
            await AsyncStorage.setItem(key,value);
            console.log('saved '+key+'- '+value);
        }
        catch(err){
            console.log("AsyncStorage error "+ err.message);
        }
    },
    // load jwt token,id
    async loadItem() {
        try {
          const id = await AsyncStorage.getItem('id');
          const jwt = await AsyncStorage.getItem('jwtToken');
          if (jwt !== null) {
            this.setState({jwt});
            console.log('value of token '+ jwt)
          } 
          if(id!==null){
            this.setState({id});
            console.log('value of id '+id)
          }
          this.setState({loading: false});
        } catch (err) {
          console.log('AsyncStorage Error: ' + err.message);
        }
    },
    // delete jwt token,id
    async deleteItem() {
        try{
          await AsyncStorage.removeItem('jwtToken')
          await AsyncStorage.removeItem('id')
          .then(() => {
              this.setState({jwt: '',id:''})
              Alert.alert('Log Out Success!');
            }
          );
        } 
        catch (err) {
          console.log('AsyncStorage Error: ' + err.message);
        }
      },  
};

export default deviceStorage