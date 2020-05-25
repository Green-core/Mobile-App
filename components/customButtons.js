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
        colors={['#43E97C', '#39F9D4']}
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
        colors={['#43E97C', '#39F9D4']}
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
        colors={['#43E97C', '#39F9D4']}
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
        colors={['#43E97C', '#39F9D4']}
        style={styles.buttonPlus}>
        <Text style={styles.buttonPlusText}>+</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const shadowOpt = {
  height: 32,
  color: '#39F9D4',
  border: 15,
  radius: 16,
  opacity: 0.5,
};

const shadowOptSmall = {
  ...shadowOpt,
  x: 31,
  width: 125,
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
  color: '#39F9D4',
  border: 15,
  radius: 12.5,
  opacity: 0.5,
  y: 40,
  x: 12,
  width: 25,
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontFamily: 'Segoe UI',
    textAlign: 'center',
    margin: 10,
    marginTop: 15,
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
