import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import { weatherMockData } from "./mock/mockWeatherData";
import UnitsPicker from "./components/UnitsPicker";
import { colors } from "./utils/index";
import ReloadIcon from "./components/ReloadIcon";
import WeatherDetails from "./components/WeatherDetails";

const api = {
  key: "a9748d82dade1958fd30abf90c326c8f",
  base:"https://api.openweathermap.org/data/2.5/weather?"
}


export default function App() {
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ dataCurrentWeather, setdataCurrentWeather ] = useState(null);
  const [ unitsSystem, setUnitsSystem] = useState('metric');

  useEffect(() => {
    
    load();
    
  }, [unitsSystem])

  async function load(){
    setdataCurrentWeather(null);
    setErrorMessage(null);
    try {
      //ask for permissions.
      let { status } = await Location.requestPermissionsAsync();
      
      if( status !== 'granted' ){
         
        setErrorMessage('Access to location is nedded to run the App !!!');
        return;
      }
      const locationAsync = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

      const { latitude, longitude } = locationAsync.coords;
      
       const weatherUrl = `${api.base}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${api.key}`
      
      // const response = await fetch(weatherUrl);
      // const result = await response.json();

      const result = weatherMockData;
      
      if( 1==1 ){//response.ok
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

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker 
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load}/>
          <WeatherInfo 
            dataWeatherInfo={dataCurrentWeather} 
          />
        </View>
        <WeatherDetails currentWeather={dataCurrentWeather}/>
      </View>
    );
  } else if( errorMessage ){
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  main:{
    flex: 1,
    justifyContent:'center'
  }
});
