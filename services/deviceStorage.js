import { AsyncStorage } from 'react-native';

const deviceStorage = {
    //asynstorage functions
    async saveItem(key,value){
        try{
            await AsyncStorage.setItem(key,value);
        }
        catch(err){
            console.log("AsyncStorage error "+ err.message);
        }
    },

    async loadJWT() {
        try {
          const value = await AsyncStorage.getItem('jwtToken');
          if (value !== null) {
            this.setState({
              jwt: value,
              loading: false
            });
          } else {
            this.setState({
              loading: false
            });
          }
        } catch (err) {
          console.log('AsyncStorage Error: ' + err.message);
        }
    },

    async deleteJWT() {
        try{
          await AsyncStorage.removeItem('jwtToken')
          .then(() => {
              this.setState({
                jwt: ''
              })
            }
          );
        } catch (err) {
          console.log('AsyncStorage Error: ' + err.message);
        }
      }
};

export default deviceStorage