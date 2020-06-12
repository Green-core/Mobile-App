import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BoxShadow} from 'react-native-shadow';

export function GreenButtonSmall({text, onPress}) {
  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <BoxShadow setting={shadowOptSmall}></BoxShadow>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}} 
        colors={['#2CBE64','#33C974' ,'#2CBE64']} 
        style={styles.buttonSmall}>
        <Text style={styles.buttonText}> {text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}



export function GreenButtonMedium({text, onPress}) {
  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <BoxShadow setting={shadowOptMedium}></BoxShadow>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}} 
        colors={['#2CBE64','#33C974' ,'#2CBE64']} 
        style={styles.buttonMedium}>
        <Text style={styles.buttonText}> {text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function GreenButtonLarge({text, onPress}) {
  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <BoxShadow setting={shadowOptLarge}></BoxShadow>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#2CBE64','#33CA75' ,  '#2CBE64']}
        style={styles.buttonLarge}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function GreenButtonPlus({onPress}) {
  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <BoxShadow setting={shadowOptPlus}></BoxShadow>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}} 
        colors={['#2CBE64','#33C974' ,'#2CBE64']} 
        style={styles.buttonPlus}>
        <Text style={styles.buttonPlusText}>+</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const shadowOpt = {
  height: 32,
  color: '#C0EBD1', 
  border: 18,
  radius: 10,
  opacity: 0.9, 
};

const shadowOptSmall = {
  ...shadowOpt, 
  x: 20,
  width: 137,
  y: 45, 
};

const shadowOptMedium = {
  ...shadowOpt,
  y: 45,
  width: 163,
  x: 40,
};

const shadowOptLarge = {
  ...shadowOpt,
  y: 48,
  x: 37,
  width: 228,
};

const shadowOptPlus = {
  height: 25,
  color: '#C0EBD1',
  border: 15,
  radius: 12.5,
  opacity: 0.5,
  y: 40,
  x: 12,
  width: 25,
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Segoe UI',
    textAlign: 'center',
    margin: 10,
    marginTop: 14,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  //small
  buttonSmall: {
    borderRadius: 5,
    height: 49,
    width: 188,
  },

  //medium
  buttonMedium: {
    borderRadius: 5,
    height: 49,
    width: 245,
  },

  //large
  buttonLarge: {
    borderRadius: 5,
    height: 53,
    width: 315,
  },

  //plus
  buttonPlus: {
    borderRadius: 23.5,
    height: 47,
    width: 47,
  },

  buttonPlusText: {
    fontSize: 26,
    fontFamily: 'Segoe UI',
    textAlign: 'center',
    margin: 10,
    marginTop: 7,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
