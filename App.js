import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
const api = {
  key: "a9748d82dade1958fd30abf90c326c8f",
  base:"https://api.openweathermap.org/data/2.5/weather?"
}


export default function App() {
  const [ errorMessage, setErrorMessage ] = useState(null);
const [ dataCurrentWeather, setdataCurrentWeather ] = useState(null);
  useEffect(() => {
    
    load();
    
  }, [])

  async function load(){
    try {
      //ask for permissions.
      let { status } = await Location.requestPermissionsAsync();
      
      if( status !== 'granted' ){
         
        setErrorMessage('Access to location is nedded to run the App !!!');
        return;
      }
      const locationAsync = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

      const { latitude, longitude } = locationAsync.coords;
      
      const weatherUrl = `${api.base}lat=${latitude}&lon=${longitude}&appid=${api.key}`
      
      console.log('urll', weatherUrl);
      const response = await fetch(weatherUrl);
      const result = await response.json();
      
      if( response.ok ){
        setdataCurrentWeather(result);
        console.log('DATA-->', result);
      }else{
        setErrorMessage(result.message);
      }


    } catch (error) {
      console.log(error)
    }
  }
  if( dataCurrentWeather ){

    const { main: {temp}} = dataCurrentWeather;

    return (
      <View style={styles.container}>
        <WeatherInfo dataWeatherInfo={dataCurrentWeather} />
        <StatusBar style="auto" />
      </View>
    );
  } else{
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:20
  },
});
