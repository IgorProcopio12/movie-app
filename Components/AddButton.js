import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';


export default function AddButton({ focused, size, color }) {
    return (
        <View style={[styles.container, { backgroundColor: focused ? '#CD2F0D' : '#E0300A'} ]}>
            <Entypo name="plus" size={size} color={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
})

