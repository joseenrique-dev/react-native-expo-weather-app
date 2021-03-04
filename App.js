// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";


export default function App() {
  const [ errorMessage, setErrorMessage ] = useState(null);

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
      
       alert(`My locations are: Longitud: ${longitude} and latitud: ${latitude}`);


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <Text>My first ReactNative App Yeaa Baby!!!...</Text>
      
    </View>
  );
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
