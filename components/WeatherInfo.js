import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import mockImage from '../assets/icon.png'

export default function WeatherInfo({dataWeatherInfo}) {
    const {
        main: {temp},
        weather: [details],
        name
    } = dataWeatherInfo;

    const { icon, main, description } =  details;

    // const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    const iconUrl = ``;
    
    
    return (
        <View style={style.weatherInfo}>
            <Text>{name}</Text>
            <Image 
                style={style.weatherIcon}
                source={mockImage}
            />
                {/* source={{uri:mockImage}} */}

            <Text>{temp}</Text>
            <Text style={style.weatherDescription}>{description}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    weatherInfo:{
        alignItems:'center',
    },
    weatherIcon:{
        width:100,
        height:100,
    },
    weatherDescription:{
        textTransform:'uppercase'
    }
});