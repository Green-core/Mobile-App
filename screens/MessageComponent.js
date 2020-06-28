import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function (props) {
  const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    cardLeft: {
      padding: 10,
      marginLeft: 10,
      marginRight: 100,
      marginBottom: 5,
      marginTop: 5,
      paddingBottom: 10,
      borderRadius: 10,
      borderWidth: 1,
      maxWidth: 300
    },

    cardRight: {
        padding: 10,
        marginLeft: 100,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 5,
        paddingBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        maxWidth: 300
    }
  });

  let styleSide
  if(props.from==props.user) styleSide = styles.cardRight
  else styleSide = styles.cardLeft

  const currDate = new Date();
  const messageDate = new Date(props.time);
  const difference = currDate - messageDate;

  let time;
  let dateDifference;

  if (difference > 1000 * 3600 * 24) {
    time = " days";
    dateDifference = Math.floor(difference / (1000 * 3600 * 24));
  } else if (difference > 1000 * 3600) {
    time = " hours";
    dateDifference = Math.floor(difference / (1000 * 3600));
  } else if (difference > 1000) {
    time = " minutes";
    dateDifference = Math.floor(difference / 1000);
  } else {
    time = " seconds";
    dateDifference = Math.floor(difference);
  }


  return (
    <View container>
      <View style={styleSide}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{textAlign: 'left'}}>{props.reply}</Text>
        </View>
        <View>
          <Text style={{textAlign: 'right'}}>{dateDifference + time + " ago"}</Text>
          {/* </span> */}
        </View>
      </View>
    </View>
  );
}
