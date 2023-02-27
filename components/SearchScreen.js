import React, {useState, useEffect} from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';
import HeaderImage from './HeaderImage';
import MidRiff from './MidRiff';

const SearchScreen = () => {
  const appId = 'appidhere';

  const [weatherData, setWeatherData] = useState({
    city: 'Tampere',
    description: 'Cloudy',
    temperature: -8,
    windSpeed: 6,
    icon: '01d',
  });

  const [searchTerm, setSearchTerm] = useState('Tampere');

  useEffect(() => {
    fetchWeather(searchTerm);
  }, []);

  const fetchWeather = async cityName => {
    const geoResp = await fetch(
      'http://api.openweathermap.org/geo/1.0/direct?q=' +
        cityName +
        '&limit=5&appid=' +
        appId,
    );

    const geoCodes = await geoResp.json();
    console.debug(geoCodes);
    let longitude = geoCodes[0].lon;
    let latitude = geoCodes[0].lat;
    console.debug('lat: ' + latitude + ' lon: ' + longitude);
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
      <View style={{flex: 4}}>
        <MidRiff
          city={weatherData.city}
          description={weatherData.description}
          temperature={weatherData.temperature}
          windSpeed={weatherData.windSpeed}
          icon={weatherData.icon}
        />
      </View>
      <View style={{flex: 2, backgroundColor: 'aquamarine'}}>
        <TextInput
          style={styles.inputStyle}
          value={searchTerm}
          onChangeText={setSearchTerm}></TextInput>
        <Button
          onPress={() => fetchWeather(searchTerm)}
          title="Search"
          color="blue"
          accessibilityLabel="Search button"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchScreen;
