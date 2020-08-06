import React from 'react';
import axios from 'axios';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {withAppContext} from '../services/withAppContext';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ReplyMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '5ecb578fb2b10b0844de4cff',
      userName: 'Kavishka',
    };
  }
  render(props) {
    // const {id,jwt} = this.props.context.state.user;

    console.log('msgID = ', this.props.data.id); // access unit id
    return (
      <View>
        <Formik
          initialValues={{
            reply: '',
          }}
          onSubmit={(values) => {
            const data = {
              id: this.props.data.id,
              reply: values.reply,
              from: this.state.userName,
              fromID: this.state.userID,
            };

            axios
              .post(
                'https://ancient-temple-30883.herokuapp.com/chats/reply',
                data,
              )
              .then((res) => {
                console.log(res);
              });
          }}>
          {(props) => (
            <View style={styles.buttonBar}>
              <TextInput
                style={{width: '78%', backgroundColor: 'white'}}
                multiline
                placeholder="Reply"
                onChangeText={props.handleChange('reply')}
                value={props.values.reply}
              />

              <View style={styles.buttonContainer}>
                <Button
                  
                  title="Send "
                  iconRight="true"
                  icon={<Icon name="paper-plane" size={15} color="white" />}
                  onPress={props.handleSubmit}
                  value="Send" 
                  backgroundColor= {  'red' }
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonContainer: {
    margin: 4,
  },
  buttonBar:{
    flexDirection: 'row', 
    marginVertical: 4 , 
    backgroundColor:'white'
  }
});
