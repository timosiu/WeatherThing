import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Button,
  ToastAndroid,
  Alert,
} from 'react-native';
import MidRiff from './MidRiff';
import HeaderImage from './HeaderImage';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const appId = 'appidhere';

  const [weatherData, setWeatherData] = useState({
    city: 'cityname',
    description: 'description',
    temperature: -8,
    windSpeed: 6,
    icon: '01d',
  });

  const [position, setPosition] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    getCurrentPosition();
    fetchWeather();
  }, []);

  //handlePermission: Checks if geolocation permission has been given
  //If yes, goes to get position, if not, asks for permission
  const handlePermission = async () => {
    if (
      PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION') ===
      true
    ) {
      getCurrentPosition();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'WeatherThing Geolocation Permission',
            message: 'Requesting access to location to fetch local weather',
            buttonNeutral: 'Ask me later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentPosition();
        } else {
          ToastAndroid.show('Access to location denied', ToastAndroid.SHORT);
        }
      } catch (err) {
        Alert.alert(err);
        console.warn(err);
      }
    }
  };

  //getCurrentPosition: Using react-native-community-geolocation api
  //gets current location of device (if permission has been granted)
  const getCurrentPosition = async () => {
    console.debug('In getCurrentPosition');
    Geolocation.getCurrentPosition(
      pos => {
        let newPos = [];
        newPos.push({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        });
        setPosition(newPos[0]);
      },
      error => Alert.alert('GetCurrentPosition error', JSON.stringify(error)),
      {enableHighAccuracy: true, maximumAge: 100},
    );
    console.debug(
      'getCurrPos lat: ' + position.latitude + ' long: ' + position.longitude,
    );
    fetchWeather();
  };

  //Fetchweather: gets weather from OpenWeatherMap
  //And pushes it to weatherData-state
  const fetchWeather = async () => {
    console.debug('In fetchWeather');
    let longitude = position.longitude;
    let latitude = position.latitude;

    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&appid=' +
        appId +
        '&units=metric',
    );

    const currentWeather = await response.json();
    console.debug('currW:');
    console.debug(currentWeather);
    let newWeather = [];

    newWeather.push({
      city: currentWeather.name,
      description: currentWeather.weather[0].description,
      temperature: currentWeather.main.temp,
      windSpeed: currentWeather.wind.speed,
      icon: currentWeather.weather[0].icon,
    });
    setWeatherData(newWeather[0]);
  };

  return (
    <View style={{flex: 2, flexDirection: 'column'}}>
      <HeaderImage />
      <View style={{flex: 5}}>
        <MidRiff
          city={weatherData.city}
          description={weatherData.description}
          temperature={weatherData.temperature}
          windSpeed={weatherData.windSpeed}
          icon={weatherData.icon}
        />
      </View>
      <View style={{flex: 1, backgroundColor: 'aquamarine'}}>
        <Button
          onPress={() => handlePermission()}
          title="Load weather"
          color="blue"
          accessibilityLabel="Load weather button"></Button>
      </View>
    </View>
  );
};

export default HomeScreen;
