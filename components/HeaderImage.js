import React from 'react';
import {View, ImageBackground, Text, StyleSheet} from 'react-native';

const HeaderImage = () => {
  const bgimage = {
    uri: 'https://cdn.pixabay.com/photo/2022/11/18/17/17/clouds-7600574_960_720.jpg',
  };
  return (
    <ImageBackground source={bgimage} resizeMode="cover" style={styles.image}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.headerTextStyle}>WeatherThing</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 40,
    fontFamily: 'fantasy',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HeaderImage;
