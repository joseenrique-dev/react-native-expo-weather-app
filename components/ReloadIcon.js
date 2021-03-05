import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../utils/index";

export default function ReloadIcon({ load }) {

    const reloadIcons = Platform.OS == 'ios' ?
                        'ios' : 
                        'md-refresh';

    return (
        <View style={styles.reloadIcon}>
            <Ionicons 
                name={ reloadIcons }
                color={colors.PRIMARY_COLOR} 
                size={24} 
                color="black"
                onPress={load}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon:{
        position:'absolute',
        top:39,
        right:20
    }
});