import React from 'react';
import axios from 'axios';
import {TextInput, View, Button, Text} from 'react-native';
import {Formik} from 'formik';
import { withAppContext } from '../services/withAppContext'
import baseURL  from '../config'

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
    
    console.log('msgID = ',this.props.data.id)  // access unit id
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

            axios.post(`${baseURL}/chats/reply`, data).then((res) => {
              console.log(res);
            });

          }}>
          {(props) => (
            <View style={{flexDirection: "row", borderWidth: 1}}>
              <TextInput
                style={{ width: "85%" }}
                multiline
                placeholder="Reply"
                onChangeText={props.handleChange('reply')}
                value={props.values.reply}
              />
              <Button 
              title="Submit" onPress={props.handleSubmit} value="Send"/>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}
//export default withAppContext(component name);