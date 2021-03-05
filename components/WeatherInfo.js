import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import mockImage from '../assets/icon.png'
import { colors } from '../utils/index';

//Defining general app colors
const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function WeatherInfo({dataWeatherInfo}) {
    const {
        main: {temp},
        weather: [details],
        name
    } = dataWeatherInfo;


    //From Api Weather Request.
    const { icon, main, description } =  details;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    const iconUrl = ``;
    
    
    return (
        <View style={style.weatherInfo}>
            <Text>{name}</Text>
            <Image 
                style={style.weatherIcon}
                source={{uri:mockImage}}
                
            />
                {/* source={mockImage} */}

            <Text style={style.textPrimary}>{temp}°</Text>
            <Text style={style.weatherDescription}>{description}</Text>
            <Text style={style.textSecondary}>{main}</Text>
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
    },
    textPrimary:{
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    textSecondary:{
        fontSize:20,
        color:SECONDARY_COLOR,
        fontWeight:'500',
        marginTop: 10
    }
});