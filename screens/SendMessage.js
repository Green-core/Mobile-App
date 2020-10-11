import React from 'react';
import axios from 'axios';
import {TextInput, View, Button, Text} from 'react-native';
import {Formik} from 'formik';
import NavigationBar from 'react-native-navbar';
import { withAppContext } from '../services/withAppContext'
import baseURL  from '../config'
export default class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '5ecb578fb2b10b0844de4cff',
      userName: 'Kavishka',
      admin: 'Admin',
      adminID: '5ec66db7aa16ff3a80870c9a',
    };
  }
  render() {
     // const {id,jwt} = this.props.context.state.user;  
    return (
      <View>
        <Formik
          initialValues={{
            message: '',
            priority: '',
          }}
          onSubmit={(values) => {
            const data = {
              message: values.message,
              from: this.state.userName,
              fromID: this.state.userID,
              to: this.state.admin,
              toID: this.state.adminID,
              //   priority: values.priority
            };

            axios
              .post(
                `${baseURL}/chats/send-message`,
                data,
              )
              .then((res) => {
                console.log(res);
              });

            // this.handleSubmit(values);
          }}>
          {(props) => (
            <View>
              <NavigationBar
                tintColor="green"
                title={{
                  title: 'Admin',
                  tintColor: 'white',
                }}
              />
              <TextInput
                // style={{}}
                multiline
                placeholder="Message"
                onChangeText={props.handleChange('message')}
                value={props.values.message}
              />
              <Button title="submit" onPress={props.handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}
//export default withAppContext(AuthHome);