//Midriff.js: Renders weather data

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const MidRiff = ({city, description, temperature, windSpeed, icon}) => {
  const iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, backgroundColor: 'aliceblue'}}>
        <Text style={styles.weatherTextStyle}>{city}</Text>
      </View>
      <View style={{flex: 4, flexDirection: 'row'}}>
        <View style={styles.centeringStyle}>
          <Image style={styles.imageStyle} source={{uri: iconUrl}} />
          <Text style={styles.weatherTextStyle}>{description}</Text>
        </View>
        <View style={styles.centeringStyle}>
          <Text style={styles.weatherTextStyle}>{temperature}C</Text>
          <Text style={styles.weatherTextStyle}>{windSpeed}m/s</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherTextStyle: {
    flex: 1,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  centeringStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'azure',
  },
});

export default MidRiff;
